/**
 * SRDS FC — Dados da Temporada 2026
 * Para atualizar os dados, edite os arrays abaixo.
 *
 * NOVO EM v1.1:
 *  matches agora suporta dados completos de cada rodada:
 *    round      → número da rodada
 *    date       → data (DD/MM/AAAA)
 *    time       → horário (HH:MM) — null se não definido
 *    location   → local da partida — null se não definido
 *    result     → { azul: N, vermelho: N } — null se não realizada
 *    teamAzul   → array de IDs de jogadores do Time Azul
 *                 Para atletas avulsos: { guest: true, name: "Nome do Atleta" }
 *    teamVermelho → array de IDs de jogadores do Time Vermelho (mesmo formato)
 *    scorers    → array de { playerId, team: "azul"|"vermelho" }
 *                 Para gols de atleta avulso: { guestName: "Nome", team: "azul"|"vermelho" }
 *    assists    → array de { playerId, team: "azul"|"vermelho" }
 *                 Para assistências de atleta avulso: { guestName: "Nome", team: "azul"|"vermelho" }
 */

const SRDS = {
  club: {
    name: "SRDS FC",
    instagram: "srds.fc",
    city: "Porto Alegre",
    state: "RS",
    country: "Brasil",
    founded: "2024",
    season: "2026",
    about: `O SRDS FC nasceu em 2024 como um grupo de amigos unidos pela paixão pelo futebol. O que começou de forma despretensiosa foi crescendo junto com a dedicação de cada jogador — e com o tempo, o grupo foi se profissionalizando: uniformes personalizados, filmagens dos jogos, equipamentos próprios e perfis oficiais nas redes sociais.\n\nHoje, com cerca de duas temporadas completas e a terceira em andamento, o SRDS FC é mais do que uma pelada entre amigos. É uma comunidade, uma tradição, um compromisso. As partidas acontecem em quadras de Porto Alegre, com frequência de 2 a 3 vezes por mês durante a temporada 2026.`,
    seasons: ["2024 (parcial)", "2025", "2026 (em andamento)"]
  },

  /**
   * =============================================
   *  PARTIDAS — TEMPORADA 2026
   *  Preencha time, local, escalação e gols após cada rodada.
   * =============================================
   */
  matches: [
    {
      round: 1,
      date: "07/02/2026",
      time: "11:00",
      location: "Soccer City",
      result: { azul: 5, vermelho: 6 },
      mvp: "vinicius",
      teamAzul: ["miliquinha", "germano", "alemao", "iago", "adler", "vander", "krigor", {guest: true, name: "Daniel"}, "everson", "rodrigo-p"],
      teamVermelho: ["vinicius", "cabelo", "biro", {guest: true, name: "Rafael Nascimento"}, {guest: true, name: "Diego"}, "gabriel", "rafael-isco", "marcelo", "augusto"],
      scorers: [
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "augusto", team: "vermelho" },
        { playerId: "augusto", team: "vermelho" },
        { playerId: "alexandre", team: "vermelho" },
        { guestName: "Diego", team: "vermelho" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "filipe", team: "azul" },
        { playerId: "iago", team: "azul" },
      ],
      assists: [
        { playerId: "gabriel", team: "vermelho" },
        { playerId: "rafael-isco", team: "vermelho" },
        { playerId: "krigor", team: "azul" },
      ]
    },
    {
      round: 2,
      date: "21/02/2026",
      time: "09:30",
      location: "HD Sports",
      result: { azul: 4, vermelho: 5 },
      mvp: "gabriel",
      teamAzul: ["vinicius", "milica","chico", "alexandre", "adler", "wesley", "gustavo", "filipe", "alef", "augusto"],
      teamVermelho: ["edu", "thiago", "germano", "biro", "gabriel", "diego", "baracy", "rodrigo-costa", "weslley", "marcelo"],
      scorers: [
        { playerId: "gabriel", team: "vermelho" },
        { playerId: "gabriel", team: "vermelho" },
        { playerId: "germano", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "diego", team: "vermelho" },
        { playerId: "wesley", team: "azul" },
        { playerId: "augusto", team: "azul" },
        { playerId: "filipe", team: "azul" },
        { playerId: "alef", team: "azul" },
      ],
      assists: [
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "weslley", team: "vermelho" },
        { playerId: "wesley", team: "azul" },
        { playerId: "gustavo", team: "azul" }
      ]
    },
    {
      round: 3,
      date: "07/03/2026",
      time: "10:00",
      location: "MCM Porto Seco",
      result: { azul: 14, vermelho: 3 },
      mvp: "giovane",
      teamAzul: ["edu", "milica","gabriel", "alexandre", "jean", "giovane", "vander", "rodrigo-costa", "rodrigo-p"],
      teamVermelho: [{guest: true, name: "Rafael"}, "biro", "erig", "adler", "everson", "wesley", "krigor", "valdir", "augusto", "marcelo"],
      scorers: [
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "everson", team: "vermelho" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "giovane", team: "azul" },
        { playerId: "giovane", team: "azul" },
        { playerId: "giovane", team: "azul" },
        { playerId: "giovane", team: "azul" },
        { playerId: "rodrigo-costa", team: "azul" },
        { playerId: "milica", team: "azul" },
        { playerId: "milica", team: "azul" },
        { playerId: "vander", team: "azul" },
        { playerId: "vander", team: "azul" },
        { playerId: "jean", team: "azul" },
        { playerId: "jean", team: "azul" }
      ],
      assists: [
        { playerId: "adler", team: "vermelho" },
        { playerId: "wesley", team: "vermelho" },
        { playerId: "gabriel", team: "azul" },        
        { playerId: "gabriel", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "giovane", team: "azul" }
      ]
    },
    {
      round: 4,
      date: "14/03/2026",
      time: "10:00",
      location: "MCM Porto Seco",
      result: { azul: 12, vermelho: 6 },
      mvp: "rodrigo-p",
      teamAzul: ["vinicius", "germano","alexandre", "iago","cabelo", "rafael-isco", "ausguto", "valdir", "weslley", "rodrigo-p"],
      teamVermelho: ["miliquinha", "alemao", "milica", "gustavo", "vander", "adler", {guest: true, name: "Leo"}, "gabriel", "alef", "marcelo"],
      scorers: [
        { playerId: "iago", team: "azul" },
        { playerId: "iago", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "valdir", team: "azul" },
        { playerId: "valdir", team: "azul" },
        { playerId: "weslley", team: "azul" },
        { playerId: "weslley", team: "azul" },
        { playerId: "weslley", team: "azul" },
        { playerId: "weslley", team: "azul" },
        { playerId: "gabriel", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "alemao", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { guestName: "Leo", team: "vermelho" }
      ],
      assists: [
        { playerId: "alef", team: "vermelho" },
        { playerId: "alef", team: "vermelho" },
        { playerId: "gabriel", team: "vermelho" },
        { playerId: "gabriel", team: "vermelho" },
        { playerId: "valdir", team: "azul" },
        { playerId: "weslley", team: "azul" },
        { playerId: "weslley", team: "azul" },        
        { playerId: "iago", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },        
        { playerId: "rafael-isco", team: "azul" },
        { playerId: "alexandre", team: "azul" }
      ]
    },
    {
      round: 5,
      date: "21/03/2026",
      time: "10:00",
      location: "Complexo 4º Distrito",
      result: { azul: 7, vermelho: 3 },
      mvp: "marcelo",
      teamAzul: ["edu", "germano","erig", "biro","adler", "gabriel", "Wesley", "alef", "marcelo", {guest: true, name: "Nine"}],
      teamVermelho: ["vinicius", "milica", "thiago","cabelo", "alexandre", "jean", "valdir", "everson", "rodrigo-p",  {guest: true, name: "Adriel"}],
      scorers: [
        { playerId: "alef", team: "azul" },
        { playerId: "gabriel", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "everson", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
      ],
      assists: [
        { playerId: "alef", team: "azul" },
        { playerId: "gabriel", team: "azul" },
        { playerId: "germano", team: "azul" },
        { playerId: "germano", team: "azul" },
        { guestName: "Nine", team: "azul" },
        { guestName: "Nine", team: "azul" },
        { guestName: "Adriel", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" }
      ]
    }
  ],

  /**
   * =============================================
   *  LISTA DE JOGADORES — TEMPORADA 2026
   * =============================================
   */
  players: [
    {
      id: "gabriel",
      name: "Gabriel 'Teles'",
      fullName: "Gabriel Teles Dos Santos",
      nickname: "Teles",
      number: { uni1: 97, uni2: 97 },
      position: "Ala",
      foot: "Direito",
      age: 28,
      photo: {
        uni1: "img/players/gabriel-azul.png", 
        uni2: "img/players/gabriel-vermelho.png"
      },
      stats: { matches: 5, goals: 4, assists: 6, points: 12 },
      awards: [
        { year: 2025, title: "Melhor Meia", icon: "🥇" }
      ]
    },
    {
      id: "marcelo",
      name: "Marcelo Gerhard",
      fullName: "Marcelo Gerhard",
      nickname: null,
      number: { uni1: 9, uni2: 9 },
      position: "Centroavante",
      foot: "Direito",
      age: 35,
      photo: {
        uni1: "img/players/marcelo-azul.png", 
        uni2: "img/players/marcelo-vermelho.png"
      },
      stats: { matches: 5, goals: 11, assists: 2, points: 9 },
      awards: [
        { year: 2025, title: "Artilheiro", icon: "⚽" },
        { year: 2025, title: "MVP da Temporada", icon: "🏆" }
      ]
    },
    {
      id: "alexandre",
      name: "'Tio' Alexandre",
      fullName: "Alexandre",
      nickname: "Dinho",
      number: { uni1: 2, uni2: 13 },
      position: "Ala",
      foot: "Direito",
      age: 58,
      photo: { uni1: null, uni2: null },
      stats: { matches: 5, goals: 1, assists: 1, points: 9 },
      awards: []
    },
    {
      id: "biro",
      name: "Vinicius 'Biro' Félix",
      fullName: "Vinicius Da Silva Félix",
      nickname: "Biro",
      number: { uni1: 6, uni2: 6 },
      position: "Ala",
      foot: "Direito",
      age: 34,
      photo: {
        uni1: "img/players/biro-azul.png", 
        uni2: "img/players/biro-vermelho.png"
      },
      stats: { matches: 4, goals: 0, assists: 0, points: 9 },
      awards: []
    },
    {
      id: "germano",
      name: "Germano",
      fullName: "Germano Luiz Brites de Araujo",
      nickname: null,
      number: { uni1: 4, uni2: 4 },
      position: "Fixo",
      foot: "Direito",
      age: 50,
      photo: {
        uni1: "img/players/germano-azul.png", 
        uni2: "img/players/germano-vermelho.png"
      },
      stats: { matches: 4, goals: 1, assists: 2, points: 9 },
      awards: [
        { year: 2025, title: "Melhor Zagueiro", icon: "🥇" }
      ]
    },
    {
      id: "edu",
      name: "Eduardo 'Edu' Mayer",
      fullName: "Eduardo Mayer",
      nickname: "Edu",
      number: { uni1: 1, uni2: 1 },
      position: "Goleiro",
      foot: null,
      age: null,
      photo: {
        uni1: "img/players/edu-azul.png", 
        uni2: "img/players/edu-amarelo.png"
      },
      stats: { matches: 3, goals: 0, assists: 0, points: 9 },
      awards: []
    },
    {
      id: "rodrigo-costa",
      name: "Rodrigo Costa",
      fullName: "Rodrigo Costa",
      nickname: "Rodrigo C.",
      number: { uni1: 8, uni2: 8 },
      position: "Ponta",
      foot: null,
      age: null,
      photo: {
        uni1: "img/players/rodrigoc-azul.png", 
        uni2: "img/players/rodrigoc-vermelho.png"
      },
      stats: { matches: 2, goals: 1, assists: 0, points: 6 },
      awards: []
    },
    {
      id: "cabelo",
      name: "Wellerson 'Cabelo' Souza",
      fullName: "Wellerson Souza",
      nickname: "Cabelo",
      number: { uni1: 2, uni2: 2 },
      position: "Fixo",
      foot: null,
      age: null,
      photo: { uni1: null, uni2: null },
      stats: { matches: 3, goals: 0, assists: 0, points: 6 },
      awards: []
    },
    {
      id: "rafael-isco",
      name: "Rafael 'Isco' Souza",
      fullName: "Rafael Souza de Araujo",
      nickname: "Isco",
      number: { uni1: 8, uni2: 8 },
      position: "Meia",
      foot: "Direito",
      age: 23,
      photo: { uni1: null, uni2: null },
      stats: { matches: 2, goals: 0, assists: 2, points: 6 },
      awards: []
    },
    {
      id: "vinicius",
      name: "Vinicius Teles",
      fullName: "Vinicius Teles de Jesus",
      nickname: null,
      number: { uni1: 12, uni2: 12 },
      position: "Goleiro",
      foot: null,
      age: null,
      photo: {
        uni1: "img/players/vinicius-azul.png", 
        uni2: "img/players/vinicius-amarelo.png"
      },
      stats: { matches: 4, goals: 0, assists: 0, points: 6 },
      awards: [
        { year: 2025, title: "Melhor Goleiro", icon: "🧤" }
      ]
    },
    {
      id: "weslley",
      name: "Weslley 'Wess' Souza",
      fullName: "Weslley de Oliveira Souza",
      nickname: "Wess",
      number: { uni1: 12, uni2: 12},
      position: "Ponta",
      foot: null,
      age: null,
      photo: { uni1: null, uni2: null },
      stats: { matches: 2, goals: 3, assists: 4, points: 6 },
      awards: [
        { year: 2025, title: "Melhor Ponta", icon: "🥇" }
      ]
    },
    {
      id: "rodrigo-p",
      name: "Rodrigo Padrocimo",
      fullName: "Rodrigo Padrocimo",
      nickname: null,
      number: { uni1: 11, uni2: 11 },
      position: "Centroavante",
      foot: "Esquerdo",
      age: 39,
      photo: {
        uni1: "img/players/rodrigop-azul.png", 
        uni2: "img/players/rodrigop-vermelho.png"
      },
      stats: { matches: 4, goals: 10, assists: 6, points: 6 },
      awards: [
        { year: 2025, title: "Melhor Atacante", icon: "🥇" }
      ]
    },
    {
      id: "augusto",
      name: "Augusto",
      fullName: "Luis Augusto Souza de Araujo",
      nickname: null,
      number: { uni1: 21, uni2: 21 },
      position: "Centroavante",
      foot: "Direito",
      age: 31,
      photo: { uni1: null, uni2: null },
      stats: { matches: 3, goals: 3, assists: 0, points: 3 },
      awards: []
    },
    {
      id: "baracy",
      name: "Lucas 'Baracy'",
      fullName: "Lucas Baracy",
      nickname: "Baracy",
      number: { uni1: 28, uni2: 28 },
      position: "Meia",
      foot: "Direito",
      age: 33,
      photo: {
        uni1: "img/players/baracy-azul.png", 
        uni2: "img/players/baracy-vermelho.png"
      },
      stats: { matches: 1, goals: 0, assists: 0, points: 3 },
      awards: []
    },
    {
      id: "diego",
      name: "Diego Menezes",
      fullName: "Diego Menezes Peixoto",
      nickname: null,
      number: { uni1: 21, uni2: 7 },
      position: "Meia",
      foot: null,
      age: null,
      photo: { uni1: null, uni2: null },
      stats: { matches: 1, goals: 1, assists: 1, points: 3 },
      awards: []
    },
    {
      id: "giovane",
      name: "Giovane 'Maninho'",
      fullName: "Giovane Maleski Franco",
      nickname: "Maninho",
      number: { uni1: 77, uni2: 77 },
      position: "Meia",
      foot: "Direto",
      age: 31,
      photo: { uni1: null, uni2: null },
      stats: { matches: 1, goals: 4, assists: 1, points: 3 },
      awards: []
    },
    {
      id: "jean",
      name: "Jean Patrick",
      fullName: "Jean Patrick de Souza Pizzinatto",
      nickname: null,
      number: { uni1: 8, uni2: 8 },
      position: "Meia",
      foot: "Direito",
      age: null,
      photo: {
        uni1: "img/players/jean-azul.png", 
        uni2: "img/players/jean-vermelho.png"
      },
      stats: { matches: 2, goals: 2, assists: 0, points: 3 },
      awards: []
    },
    {
      id: "milica",
      name: "Jean 'Milica'",
      fullName: "Jean Lucas De Oliveira Gama",
      nickname: "Milica",
      number: { uni1: 8, uni2: 8 },
      position: "Fixo",
      foot: "Direito",
      age: 30,
      photo: {
        uni1: "img/players/milica-azul.png", 
        uni2: "img/players/milica-vermelho.png"
      },
      stats: { matches: 4, goals: 6, assists: 0, points: 3 },
      awards: []
    },
    {
      id: "vander",
      name: "Vander Souza",
      fullName: "Vanderson Souza da Silva",
      nickname: "Vander",
      number: { uni1: 90, uni2: 90 },
      position: "Meia",
      foot: "Direito",
      age: 35,
      photo: {
        uni1: "img/players/vander-azul.png", 
        uni2: "img/players/vander-vermelho.png"
      },
      stats: { matches: 4, goals: 2, assists: 0, points: 3 },
      awards: []
    },
    {
      id: "iago",
      name: "Iago",
      fullName: "Iago Matheus Pinto Vieira",
      nickname: null,
      number: { uni1: 8, uni2: 10 },
      position: "Ala",
      foot: "Direito",
      age: 31,
      photo: {
        uni1: "img/players/iago-azul.png", 
        uni2: "img/players/iago-vermelho.png"
      },
      stats: { matches: 2, goals: 3, assists: 1, points: 3 },
      awards: []
    },
    {
      id: "valdir",
      name: "Valdir Jr.",
      fullName: "Valdir Rodrigues Junior.",
      nickname: null,
      number: { uni1: 11, uni2: 11 },
      position: "Meia",
      foot: null,
      age: null,
      photo: {
        uni1: "img/players/valdir-azul.png", 
        uni2: "img/players/valdir-vermelho.png"
      },
      stats: { matches: 3, goals: 2, assists: 1, points: 3 },
      awards: []
    },
    {
      id: "adler",
      name: "Adler",
      fullName: "Adler Schlintwein Barreto",
      nickname: null,
      number: { uni1: 7, uni2: 30 },
      position: "Ala",
      foot: "Direito",
      age: 28,
      photo: { 
        uni1: "img/players/adler-azul.png",
        uni2: "img/players/adler-vermelho.png" },
      stats: { matches: 5, goals: 0, assists: 1, points: 3 },
      awards: []
    },
    {
      id: "alef",
      name: "Alef Alberto",
      fullName: "Àlef Alberto Teixeira",
      nickname: null,
      number: { uni1: 9, uni2: 10 },
      position: "Ponta",
      foot: "Direito",
      age: 32,
      photo: { 
        uni1: "img/players/alef-azul.png", 
        uni2: "img/players/alef-vermelho.png" },
      stats: { matches: 3, goals: 1, assists: 3, points: 3 },
      awards: []
    },
    {
      id: "erig",
      name: "Erig 'Pezzi'",
      fullName: "Erig Pezzi",
      nickname: "Pezzi",
      number: { uni1: 4, uni2: 4 },
      position: "Fixo",
      foot: "Direito",
      age: 25,
      photo: {
        uni1: "img/players/erig-azul.png", 
        uni2: "img/players/erig-vermelho.png"
      },
      stats: { matches: 2, goals: 0, assists: 0, points: 3 },
      awards: []
    },
    {
      id: "wesley",
      name: "Wesley 'Kroos' Santos",
      fullName: "Wesley Santos Do Carmo",
      nickname: "Kroos",
      number: { uni1: 6, uni2: 6 },
      position: "Meia",
      foot: "Direito",
      age: 28,
      photo: {
        uni1: "img/players/wesley-azul.png", 
        uni2: "img/players/wesley-vermelho.png"
      },
      stats: { matches: 3, goals: 1, assists: 1, points: 3 },
      awards: [
        { year: 2025, title: "Melhor Meia", icon: "🥇" }
      ]
    },
    {
      id: "alemao",
      name: "Edson 'Alemão' Muzikant",
      fullName: "Edson Muzikant",
      nickname: "Alemão",
      number: { uni1: 7, uni2: 7 },
      position: "Fixo",
      foot: "Direito",
      age: 42,
      photo: {
        uni1: "img/players/edson-azul.png", 
        uni2: "img/players/edson-vermelho.png"
      },
      stats: { matches: 2, goals: 1, assists: 0, points: 0 },
      awards: []
    },
    {
      id: "allan",
      name: "Allan",
      fullName: "Allan",
      nickname: null,
      number: { uni1: null, uni2: null },
      position: "Campo",
      foot: null,
      age: null,
      photo: { uni1: null, uni2: null },
      stats: { matches: 0, goals: 0, assists: 0, points: 0 },
      awards: []
    },
    {
      id: "chico",
      name: "Diego 'Chico'",
      fullName: "Diego Mezetti Terra",
      nickname: "Chico",
      number: { uni1: 8, uni2: 8 },
      position: "Fixo",
      foot: "Direito",
      age: 45,
      photo: { uni1: null, uni2: null },
      stats: { matches: 1, goals: 0, assists: 0, points: 0 },
      awards: []
    },
    {
      id: "everson",
      name: "Everson",
      fullName: "Everson Pereira",
      nickname: null,
      number: { uni1: 5, uni2: 5 },
      position: "Ala",
      foot: null,
      age: null,
      photo: { uni1: null, uni2: null },
      stats: { matches: 3, goals: 2, assists: 0, points: 0 },
      awards: []
    },
    {
      id: "filipe",
      name: "Filipe Alves",
      fullName: "Filipe Alves Pizzinato",
      nickname: "Lipe",
      number: { uni1: 11, uni2: 11 },
      position: "Ponta",
      foot: "Direito",
      age: 30,
      photo: {
        uni1: "img/players/filipe-azul.png", 
        uni2: "img/players/filipe-vermelho.png"
      },
      stats: { matches: 2, goals: 2, assists: 0, points: 0 },
      awards: []
    },
    {
      id: "gustavo",
      name: "Gustavo 'Mauri'",
      fullName: "Gustavo Mauri",
      nickname: "Mauri",
      number: { uni1: 14, uni2: 17 },
      position: "Meia",
      foot: "Ambos",
      age: 22,
      photo: {
        uni1: "img/players/gustavo-azul.png", 
        uni2: "img/players/gustavo-vermelho.png"
      },
      stats: { matches: 2, goals: 0, assists: 1, points: 0 },
      awards: []
    },
    {
      id: "ivan",
      name: "Ivan Jr",
      fullName: "Ivan Jr.",
      nickname: null,
      number: { uni1: 69, uni2: 69 },
      position: "Fixo",
      foot: "Direito",
      age: null,
      photo: {
        uni1: "img/players/ivan-azul.png", 
        uni2: "img/players/ivan-vermelho.png"
      },
      stats: { matches: 0, goals: 0, assists: 0, points: 0 },
      awards: []
    },
    {
      id: "keke",
      name: "Alisson 'Keke'",
      fullName: "Alisson",
      nickname: "Tio Keke",
      number: { uni1: 5, uni2: 5 },
      position: "Ala",
      foot: null,
      age: null,
      photo: {
        uni1: "img/players/keke-azul.png", 
        uni2: "img/players/keke-vermelho.png"
      },
      stats: { matches: 0, goals: 0, assists: 0, points: 0 },
      awards: []
    },
    {
      id: "krigor",
      name: "Krigor Felipe",
      fullName: "Krigor Felipe",
      nickname: null,
      number: { uni1: 10, uni2: 10 },
      position: "Meia",
      foot: "Esquerdo",
      age: 25,
      photo: {
        uni1: "img/players/krigor-azul.png", 
        uni2: "img/players/krigor-vermelho.png"
      },
      stats: { matches: 2, goals: 0, assists: 2, points: 0 },
      awards: []
    },
    {
      id: "thiago",
      name: "Thiago Leite",
      fullName: "Thiago Leite",
      nickname: null,
      number: { uni1: 90, uni2: 90 },
      position: "Fixo",
      foot: "Direito",
      age: 35,
      photo: { uni1: null, uni2: null },
      stats: { matches: 2, goals: 0, assists: 0, points: 0 },
      awards: []
    },
    {
      id: "miliquinha",
      name: "Gabriel 'Miliquinha'",
      fullName: "Gabriel De Oliveira Teixeira",
      nickname: "Miliquinha",
      number: { uni1: null, uni2: null },
      position: "Goleiro",
      foot: "Direito",
      age: 15,
      photo: { uni1: null, uni2: null },
      stats: { matches: 2, goals: 0, assists: 0, points: 0 },
      awards: []
    }
  ],

  /**
   * Patrocinadores — adicione logo (PNG), nome, descrição e link de rede social
   */
  sponsors: [
    {
      id: "monello",
      name: "Monello",
      description: "O que define família é o amor. #Monellovers",
      logo: "img/sponsors/monello.png",
      link: "https://www.instagram.com/monello_oficial/"
    },
    {
      id: "wc-store",
      name: "WC Store",
      description: null,
      logo: "img/sponsors/wc-store.png",
      link: "https://www.instagram.com/wc_store10/"
    },
    {
      id: "dana",
      name: "Dana Containers",
      description: "Transformando espaços em experiências únicas, um container de cada vez. 🚀 #ArquiteturaContêiner",
      logo: "img/sponsors/dana1.PNG",
      link: "https://www.instagram.com/containers_dana/"
    },
    {
      id: "wess-tattoo",
      name: "Wess Tattoo",
      description: null,
      logo: "img/sponsors/wess-tattoo.png",
      link: "https://www.instagram.com/wess_tattoo/"
    },
    {
      id: "sulutta",
      name: "Sulutta Doces & Delicias",
      description: "Alegrando os momentos doces da vida!",
      logo: "img/sponsors/sulutta.png",
      link: "https://www.facebook.com/sulutadelicias/"
    },
    {
      id: "alinox",
      name: "Alinox",
      description: null,
      logo: "img/sponsors/alinox.png",
      link: null
    }
  ]
};

/* ============================================================
   FUNÇÕES UTILITÁRIAS — não altere abaixo desta linha
   ============================================================ */

function getStandings() {
  return [...SRDS.players].sort((a, b) => {
    if (b.stats.points !== a.stats.points) return b.stats.points - a.stats.points;
    const gaA = a.stats.goals + a.stats.assists;
    const gaB = b.stats.goals + b.stats.assists;
    if (gaB !== gaA) return gaB - gaA;
    if (b.stats.goals !== a.stats.goals) return b.stats.goals - a.stats.goals;
    return a.name.localeCompare(b.name);
  });
}

function getGoalsRanking() {
  return [...SRDS.players].sort((a, b) => {
    if (b.stats.goals !== a.stats.goals) return b.stats.goals - a.stats.goals;
    return a.name.localeCompare(b.name);
  });
}

function getAssistsRanking() {
  return [...SRDS.players].sort((a, b) => {
    if (b.stats.assists !== a.stats.assists) return b.stats.assists - a.stats.assists;
    return a.name.localeCompare(b.name);
  });
}

function getAlphabetical() {
  return [...SRDS.players].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

function getPlayerById(id) {
  return SRDS.players.find(p => p.id === id) || null;
}

function getPlayerRanks(player) {
  const standings = getStandings();
  const goals = getGoalsRanking();
  const assists = getAssistsRanking();
  const findRank = (arr, p) => arr.findIndex(x => x.id === p.id) + 1;
  return {
    points: findRank(standings, player),
    goals: findRank(goals, player),
    assists: findRank(assists, player)
  };
}

function getPlayerAverages(player) {
  const m = player.stats.matches;
  if (m === 0) return { goals: 0, assists: 0, participation: 0 };
  return {
    goals: (player.stats.goals / m).toFixed(2),
    assists: (player.stats.assists / m).toFixed(2),
    participation: ((player.stats.goals + player.stats.assists) / m).toFixed(2)
  };
}

/** Resolve um item de escalação (ID ou objeto guest) para { name, photo, number, position, isGuest } */
function resolveLineupEntry(entry, team) {
  if (typeof entry === 'string') {
    const p = getPlayerById(entry);
    if (!p) return null;
    const photo  = team === 'azul' ? p.photo?.uni1 : p.photo?.uni2;
    const number = team === 'azul' ? p.number?.uni1 : p.number?.uni2;
    return { id: p.id, name: p.name, photo: photo || null, number: number ?? null, position: p.position, isGuest: false };
  }
  if (entry && entry.guest) {
    return { id: null, name: entry.name, photo: null, number: null, position: null, isGuest: true };
  }
  return null;
}

/** Resolve um scorer/assist para nome de exibição */
function resolveEventName(event) {
  if (event.guestName) return event.guestName;
  const p = getPlayerById(event.playerId);
  return p ? p.name : '?';
}
