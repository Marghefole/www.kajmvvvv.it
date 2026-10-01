# Kajmvvv — Resina artigianale

Sito vetrina statico (HTML, CSS, JavaScript) per Kajmvvv: portachiavi in resina fatti a mano, con configuratore e anteprima dal vivo.

## Struttura

- `index.html`: la pagina
- `css/styles.css`: gli stili
- `js/data.js`: i contenuti (prodotti, colori, decori, cordini, prezzi, mercatini)
- `js/site.js`: crea le sezioni partendo da `data.js`, più scroll e menu
- `js/configurator.js`: il configuratore (anteprima SVG, prezzo, invio via email o Instagram)
- `images/`: le immagini

Per modificare prodotti, prezzi o mercatini basta cambiare `js/data.js`.

## Pubblicazione su GitHub Pages

1. Fai il push del repository su GitHub.
2. Vai in **Settings → Pages**, alla voce *Source* scegli **Deploy from a branch**, poi `main` e la cartella `/ (root)`.
3. Il sito sarà disponibile su `https://<utente>.github.io/<repo>/`.
