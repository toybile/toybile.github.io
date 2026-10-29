# toybile's creations

[Visit the website / Visitar o site](https://toybile.github.io/)

A central menu for browser projects and downloadable software. / Um menu central para projetos no navegador e programas para download.

<details>
<summary><strong>English</strong></summary>

## Browser projects

**Logic Editor** is a workspace for writing and evaluating classical propositional arguments. Its features include:

- Editable proposition/connective blocks, premise/conclusion roles, blank rows and uppercase typing with a visibly active Caps Lock icon.
- Immediate row dragging, 0.2-second hold to enter/exit group selection, group dragging/deletion, undo/redo and keyboard navigation.
- Multiple arguments with rename, delete, tab reordering, and blank/example creation. An offline Help page explains the current examples and returns to the list with an upper-left arrow.
- A searchable symbol library, collapsible categories and alternative notations.
- Independently collapsible editor/preview panels, movable panels and horizontal resizing.
- Proportional horizontal positioning when the sidebar or viewport changes; separated panels move down/up as the upper panel grows/shrinks, preserving intentional overlaps.
- Live formatted Argument preview, optional numbering, clipboard copy, `.txt` and `.pdf` export.
- Automatic browser saving with a status indicator, individual/all-argument `.lp.json` backups and selective import previews.
- Per-argument proposition descriptions: annotations of symbol meanings, separate from logical validation.
- Experimental classical validation, individual conclusion results, explained counterexamples, filtered/paginated truth tables, redundant-premise analysis and formula equivalence comparison.
- English/Brazilian Portuguese, light/dark themes, independent size controls and a confirmed default reset.

**[Read the complete editor guide](https://github.com/toybile/Propositional-Logic-Editor#readme)** for gestures, shortcuts, examples, formula syntax, limits and persistence behavior. In particular, drag rows directly; use Ctrl+Z for recorded row/panel position changes; proposition descriptions do not participate in validation. The beta validator evaluates propositional formulas, not every symbol in the library or natural-language meanings.

## Downloadable software

- [Logisim-evolution](https://github.com/toybile/logisim-evolution): a version with interface modifications.
- [Roblox Favourites Cleaner](https://github.com/toybile/Roblox-Favourites-Cleaner): a Python script for listing and removing favourite experiences.

The menu links to these repositories. Consult each project's documentation for its own installation and usage.

## Run and publish

Open the portfolio's `index.html` in a modern browser. No dependencies need to be installed. The static distribution uses:

| File | Purpose |
| --- | --- |
| `index.html` | Main project menu |
| `404.html` | Missing-page fallback and legacy editor redirects |
| `.nojekyll` | Static GitHub Pages publishing |

GitHub Pages serves the configured publishing source; in the current main-branch/root setup, pushing the updated distribution updates the website.

The LP editor stores its arguments and preferences locally in the browser. The portfolio embeds the standalone editor, so both use the same editor storage when the browser permits it. Storage is separated by browser and origin (protocol, domain and port), not by URL path. Transfer arguments between separate environments using `.lp.json` export/import. Clearing browser site data can remove stored work.

</details>

<details>
<summary><strong>Português (Brasil)</strong></summary>

## Projetos no navegador

O **Logic Editor** permite escrever e avaliar argumentos proposicionais clássicos. Suas funções incluem:

- Blocos editáveis de proposições/conectivos, funções de premissa/conclusão, linhas em branco e digitação em maiúsculas com ícone de Caps Lock destacado quando ativo.
- Arrasto imediato de linhas, pressão de 0,2 segundo para entrar/sair da seleção múltipla, arrasto/exclusão em grupo, desfazer/refazer e navegação pelo teclado.
- Vários argumentos com renomeação, exclusão, reordenação de abas e criação em branco ou por exemplo. Uma página de Ajuda offline explica os exemplos atuais e volta à lista por uma seta no canto superior esquerdo.
- Biblioteca de símbolos com busca, categorias recolhíveis e notações alternativas.
- Edição e prévia recolhíveis independentemente, painéis movíveis e alteração horizontal de tamanho.
- Posição horizontal proporcional ao abrir/fechar o menu lateral ou alterar a tela; painéis separados descem/sobem conforme o superior cresce/diminui, preservando sobreposições escolhidas.
- Prévia formatada do Argumento, numeração opcional, cópia e exportação `.txt`/`.pdf`.
- Salvamento automático no navegador com indicador, cópias `.lp.json` individuais/de todos os argumentos e importação seletiva com prévia.
- Descrições de proposições por argumento: anotações de significados dos símbolos, separadas da validação lógica.
- Validação clássica experimental, resultados por conclusão, contraexemplos explicados, tabela-verdade com filtros/páginas, análise de redundância e comparação de equivalência entre fórmulas.
- Inglês/português brasileiro, temas claro/escuro, tamanhos independentes e restauração de padrões com confirmação.

**[Leia o manual completo do editor](https://github.com/toybile/Propositional-Logic-Editor#readme)** para gestos, atalhos, exemplos, sintaxe, limites e armazenamento. Em especial: arraste as linhas diretamente; use Ctrl+Z para mudanças registradas de posição das linhas/painéis; descrições de proposições não participam da validação. O validador beta avalia fórmulas proposicionais, não todos os símbolos da biblioteca ou significados em linguagem natural.

## Programas para download

- [Logisim-evolution](https://github.com/toybile/logisim-evolution): uma versão com modificações na interface.
- [Roblox Favourites Cleaner](https://github.com/toybile/Roblox-Favourites-Cleaner): um programa Python para listar e remover experiências favoritas.

O menu aponta para esses repositórios. Consulte a documentação de cada projeto para instalação e uso próprios.

## Executar e publicar

Abra o `index.html` do portfólio em um navegador moderno. Não há dependências para instalar. A distribuição estática usa:

| Arquivo | Finalidade |
| --- | --- |
| `index.html` | Menu principal de projetos |
| `404.html` | Página não encontrada e redirecionamentos antigos do editor |
| `.nojekyll` | Publicação estática no GitHub Pages |

O GitHub Pages usa a origem configurada para publicação; na configuração atual de raiz da branch main, enviar a distribuição atualizada atualiza o site.

O editor LP armazena argumentos e preferências localmente no navegador. O portfólio incorpora o editor independente; ambos usam o mesmo armazenamento do editor quando o navegador permite. Os dados são separados por navegador e origem (protocolo, domínio e porta), não pelo caminho da URL. Transfira argumentos entre ambientes separados pela exportação/importação `.lp.json`. Limpar os dados do site pode remover o trabalho salvo.

</details>

The editor opens directly at /Logic-Editor/ and its Home button returns to this portfolio. /lp/index.html and /Propositional-Logic-Editor/ redirect to the editor without an iframe. Modal notation is supported for writing; automatic validation remains classical propositional logic.

O editor abre diretamente em /Logic-Editor/ e o botão Home volta ao portfólio. /lp/index.html e /Propositional-Logic-Editor/ redirecionam ao editor sem iframe. Símbolos modais estão disponíveis na escrita; a validação automática permanece proposicional clássica.
