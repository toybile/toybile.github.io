# Criações de toybile

[English](README.md) · **Português (Brasil)**

[Abrir o site](https://toybile.github.io/)

Menu central dos meus projetos, com acesso ao editor de Lógica Proposicional e aos softwares disponíveis no GitHub.

## Sites

- **Lógica Proposicional:** editor de premissas e conclusões, biblioteca de símbolos, múltiplos argumentos, numeração opcional, cópia e exportação de texto.

## Downloadable Softwares (GitHub)

- [Logisim-evolution](https://github.com/toybile/logisim-evolution): versão com alterações na interface.
- [Roblox Favourites Cleaner](https://github.com/toybile/Roblox-Favourites-Cleaner): script Python para listar e remover experiências favoritas.

## Publicação

Site estático, sem instalação de dependências. O GitHub Pages publica a raiz da branch `main`.

```text
index.html       Menu principal
lp/index.html    Editor completo de Lógica Proposicional
.nojekyll        Publicação dos arquivos estáticos
```

Os argumentos e as preferências da LP são armazenados no navegador da pessoa, usando `localStorage`. Não há sincronização entre dispositivos ou endereços diferentes.

Para executar localmente, abra `index.html` no navegador. Para publicar uma atualização, envie os arquivos modificados para a branch `main`.
