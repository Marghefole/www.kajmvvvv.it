/* Contenuti del sito (ex DefaultController.php) */
window.KAJ = {
  email: 'rizzoalice.ar@gmail.com',
  instagram: 'kajmvvv',
  basePrice: 8,

  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),

  colors: [
    { id: 'latte',  label: 'Latte',       hex: '#F5EFE6' },
    { id: 'sabbia', label: 'Sabbia',      hex: '#E8DCC8' },
    { id: 'rosa',   label: 'Rosa antico', hex: '#E8B4A0' },
    { id: 'terra',  label: 'Terracotta',  hex: '#C26B4A' },
    { id: 'oro',    label: 'Oro caldo',   hex: '#D4A574' },
    { id: 'bosco',  label: 'Bosco',       hex: '#6B7F5A' },
    { id: 'notte',  label: 'Notte',       hex: '#2C1F17' }
  ],

  decos: [
    { id: 'none',    name: 'Nessuna',       icon: 'fa-circle',     extra: '+ €0', cost: 0 },
    { id: 'fiori',   name: 'Fiori secchi',  icon: 'fa-seedling',   extra: '+ €2', cost: 2 },
    { id: 'glitter', name: 'Glitter',       icon: 'fa-sparkles',   extra: '+ €1', cost: 1 },
    { id: 'oro',     name: 'Foglia oro',    icon: 'fa-star',       extra: '+ €3', cost: 3 },
    { id: 'perle',   name: 'Microperle',    icon: 'fa-circle-dot', extra: '+ €2', cost: 2 },
    { id: 'luna',    name: 'Stelle e luna', icon: 'fa-moon',       extra: '+ €2', cost: 2 }
  ],

  cords: [
    { id: 'silver',  name: 'Moschettone argento', desc: 'Acciaio inox, finitura lucida.',       icon: 'fa-link',       extra: 'incluso', cost: 0 },
    { id: 'gold',    name: 'Moschettone oro',     desc: 'Ottone bagnato in oro.',               icon: 'fa-link',       extra: '+ €1',    cost: 1 },
    { id: 'leather', name: 'Cordino in pelle',    desc: 'Pelle naturale conciata al vegetale.', icon: 'fa-grip-lines', extra: '+ €2',    cost: 2 },
    { id: 'chain',   name: 'Catenella sottile',   desc: 'Maglia minimal in acciaio dorato.',    icon: 'fa-grip',       extra: '+ €2',    cost: 2 }
  ],

  products: [
    { image: 'portachiavi-a.jpg',          letter: 'A',       badge: 'Bestseller', price: '€10', desc: 'Lettera A in resina trasparente con fiori secchi locali raccolti a mano.' },
    { image: 'portachiavi-l.jpg',          letter: 'L',       badge: 'Mini',       price: '€5',  desc: 'Formato mini, perfetto per zaini e astucci. Resina sabbia, moschettone argento.' },
    { image: 'portachiavi-copia-c-m.jpg',  letter: 'C+M',     badge: 'Coppia',     price: '€20', desc: 'Set due portachiavi coordinati con glitter interno. Idea regalo per coppie e amiche.' },
    { image: 'portachiavi-f.jpg',          letter: 'F',       badge: 'Novità',     price: '€8',  desc: 'Lettera F in resina oro caldo con sfumatura terra. Cordino in pelle naturale incluso.' },
    { image: 'portachiavi-p.jpg',          letter: 'P',       badge: 'Esclusivo',  price: '€10', desc: 'Lettera P in resina viola con glitter iridescente e foglia oro. Catenella dorata.' },
    { image: 'portachiavi-r.jpg',          letter: 'R',       badge: 'Glamour',    price: '€10', desc: 'Lettera R bordeaux con glitter rosso e foglia oro reale. Catenella dorata inclusa.' },
    { image: 'portachiavi-a-oro.jpg',      letter: 'A',       badge: 'Foglia oro', price: '€12', desc: 'Lettera A trasparente con foglia oro reale all\'interno. Catenella oro, pezzo ricercato.' },
    { image: 'portachiavi-a-glitter.jpg',  letter: 'A',       badge: 'Glitter',    price: '€10', desc: 'Lettera A rosa con glitter rosa e nappa in pelle. Delicata e femminile.' },
    { image: 'portachiavi-orsetto.jpg',    letter: 'Orsetto', badge: 'Speciale',   price: '€12', desc: 'Orsetto in resina verde bosco, pezzo unico non in serie. Con catenella argento.' }
  ],

  events: [
    {
      title: 'Festa del Castello',
      desc: 'Domenica al Castello Visconti di Somma Lombardo. Vieni a trovarmi, personalizzazioni dal vivo!',
      place: 'Castello Visconti, Somma Lombardo (VA)',
      date: '2026-03-26',
      time: '10:00 — 18:30',
      image: 'images/mercatini.png'
    }
  ]
};
