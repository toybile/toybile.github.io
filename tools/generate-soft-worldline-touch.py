"""Generate only the quiet, filtered wind cue used by the first two portal taps."""
import hashlib, json, math, random, struct, wave
from pathlib import Path
root = Path(__file__).resolve().parents[1]
audio = root / 'assets/audio'
sr, duration = 24000, .46
rng = random.Random(735120)
low1 = low2 = rumble = 0.0
frames = []
for i in range(round(sr * duration)):
    t = i / sr
    # Two low-pass stages remove the old sharp hiss; no pitched oscillator.
    cutoff = 520 + 180 * math.sin(math.pi * t / duration)
    alpha = 1 - math.exp(-2 * math.pi * cutoff / sr)
    low1 += alpha * (rng.uniform(-1, 1) - low1)
    low2 += alpha * (low1 - low2)
    rumble += (1 - math.exp(-2 * math.pi * 100 / sr)) * (low2 - rumble)
    envelope = math.sin(math.pi * i / (round(sr * duration) - 1)) ** 2
    frames.append((low2 - rumble) * envelope)
scale = .16 / max(map(abs, frames))
frames = [x * scale for x in frames]
with wave.open(str(audio / 'worldline-touch-soft.wav'), 'wb') as out:
    out.setnchannels(1)
    out.setsampwidth(2)
    out.setframerate(sr)
    out.writeframes(b''.join(struct.pack('<h', round(x * 32767)) for x in frames))
manifest_path = audio / 'sound-manifest.json'
manifest = json.loads(manifest_path.read_text())
manifest['tracks'] = [x for x in manifest['tracks'] if x['name'] != 'worldline-touch']
track = {'name': 'worldline-touch-soft', 'duration': duration, 'peak': .16,
         'rms': round(math.sqrt(sum(x*x for x in frames)/len(frames)), 4),
         'playbackVolume': .25, 'design': 'Unpitched, band-limited wind with smooth attack and release'}
manifest['tracks'].append(track)
expected = manifest['preservedRecording']['sha256']
assert hashlib.sha256((audio/'worldline-original.mp3').read_bytes()).hexdigest() == expected
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps(track))
print('Original animation recording: unchanged')
