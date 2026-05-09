/**
 * SRDS FC — Dados da Temporada 2026
 * ============================================================
 * ESTRUTURA DE UMA PARTIDA (matches[]):
 *
 *   round      → número da rodada (ex: 1, 2, 3...)
 *   date       → data no formato DD/MM/AAAA (ex: "07/02/2026")
 *   time       → horário HH:MM (ex: "10:00") — null se não definido
 *
 *   location   → local da partida. Pode ser:
 *                  null              → sem local definido
 *                  "Nome do Local"   → apenas o nome (string simples)
 *                  {                 → objeto com nome + endereço:
 *                    venue: "Soccer City",
 *                    address: "Av. Ipiranga, 5311 - Porto Alegre, RS"
 *                  }
 *                O address aparece clicável e abre no Google Maps.
 *
 *   result     → { azul: N, vermelho: N } — null se não realizada
 *   mvp        → ID do jogador MVP (ex: "marcelo") — null se não definido
 *
 *   teamAzul / teamVermelho → array com IDs dos jogadores:
 *     - Jogador do elenco: "gabriel"  (usa o id do jogador)
 *     - Atleta avulso:    { guest: true, name: "Nome", position: "Ala", number: 0 }
 *
 *       Exemplos de avulso completo:
 *         { guest: true, name: "Anderson", position: "Fixo", number: 333 }
 *         { guest: true, name: "Carlos",   position: "Ala",  number: 20  }
 *         { guest: true, name: "Rafael",   position: "Ala",  number: 0   }
 *
 *       Números disponíveis para avulsos: 0, 20 ou 333
 *                          position e number são opcionais para avulsos.
 *                          Números disponíveis para avulsos: 0, 20, 333
 *                          Posições válidas: Goleiro, Fixo, Ala, Meia, Ponta, Centroavante
 *                          Avulsos entram na ordem de posição da escalação igual aos demais.
 *                          Foto padrão: img/players/jogador-avulso.png (mesma para todos)
 *
 *   scorers → gols da partida:
 *     - Jogador do elenco: { playerId: "marcelo", team: "azul" }
 *     - Atleta avulso:     { guestName: "Carlos", team: "vermelho" }
 *     Se o jogador marcou 3 gols, adicione 3 entradas com o mesmo ID.
 *
 *   assists → assistências da partida (mesmo formato de scorers)
 *
 * ⚡ STATS AUTOMÁTICOS (v1.9) — campo stats{} REMOVIDO dos jogadores:
 *   As funções getComputedStats(playerId) e getStandings() calculam
 *   partidas, gols, assistências e pontos diretamente das partidas —
 *   não é mais necessário editar os campos stats{} nos jogadores.
 *   O campo stats{} foi removido dos jogadores para evitar confusão.
 *   Não é necessário preencher gols/partidas/assistências por jogador —
 *   tudo é calculado automaticamente das partidas registradas acima.
 *
 * CAMPO DE DATA DE NASCIMENTO (v1.11):
 *   birthDate: null               → não informada (exibe nada no perfil)
 *   birthDate: "15/03/1998"       → data real (calcula idade automaticamente)
 *   - Formato obrigatório: DD/MM/AAAA
 *   - A idade é calculada pelo site — não precisa mais atualizar manualmente.
 *   - No dia do aniversário, o perfil recebe destaque especial dourado.
 *
 * CAMPO DE LESÃO nos jogadores:
 *   injury: null                                     → sem lesão
 *   injury: { name: "Entorse", returnDate: "15/05/2026" } → lesionado
 *   Aparece com 🚑 no ranking e com banner no perfil.
 *
 * CAMPO injuredRounds (opcional) nos jogadores:
 *   injuredRounds: [3, 4, 5]  → rodadas em que o atleta ficou ausente por lesão
 *   injuredRounds: null       → nenhuma rodada perdida por lesão (ou não informado)
 *   Essas rodadas aparecem no gráfico de evolução com uma cruz vermelha (✕)
 *   em vez do círculo vermelho de ausência normal, preservando o histórico
 *   mesmo após o término da lesão (quando injury for removido/zerado).
 *   As estatísticas (frequência, aproveitamento) NÃO são afetadas — a ausência
 *   por lesão continua contando normalmente como ausência.
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

  /*
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
      location: { venue: "Soccer City", address: "R. Lauro Müller, 700 - Navegantes, Porto Alegre - RS" },
      result: { azul: 5, vermelho: 6 },
      mvp: "vinicius",
      teamAzul: ["miliquinha", "germano", "alemao", "filipe", "iago", "adler", "vander", "krigor", {guest: true, name: "Daniel", position: "Meia", number: 0}, "everson", "rodrigo-p"],
      teamVermelho: ["vinicius", "cabelo", "alexandre", "biro", {guest: true, name: "Rafael Nascimento", position: "Ala", number: 20}, {guest: true, name: "Diego", position: "Meia", number: 333}, "gabriel", "rafael-isco", "marcelo", "augusto"],
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
        { playerId: "krigor", team: "azul" },
      ]
    },
    {
      round: 2,
      date: "21/02/2026",
      time: "09:30",
      location: { venue: "HD Sports Complex", address: "R. Lauro Müller, 850 - Navegantes, Porto Alegre - RS" },
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
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 14, vermelho: 3 },
      mvp: "giovane",
      teamAzul: ["edu", "milica","gabriel", "alexandre", "jean", "giovane", "vander", "rodrigo-costa", "rodrigo-p"],
      teamVermelho: [{guest: true, name: "Rafael", position: "Goleiro", number: 20}, "biro", "erig", "adler", "everson", "wesley", "krigor", "valdir", "augusto", "marcelo"],
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
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 12, vermelho: 6 },
      mvp: "rodrigo-p",
      teamAzul: ["vinicius", "germano","alexandre", "iago","cabelo", "rafael-isco", "augusto", "valdir", "weslley", "rodrigo-p"],
      teamVermelho: ["miliquinha", "alemao", "milica", "gustavo", "vander", "adler", {guest: true, name: "Leo", position: "Meia", number: 20}, "gabriel", "alef", "marcelo"],
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
      location: { venue: "Complexo 4º Distrito", address: "R. Conde de Porto Alegre, 61 - Floresta, Porto Alegre - RS" },
      result: { azul: 7, vermelho: 3 },
      mvp: "marcelo",
      teamAzul: ["edu", "germano","erig", "biro","adler", "gabriel", "wesley", "alef", "marcelo", {guest: true, name: "Nine", position: "Ponta", number: 20}],
      teamVermelho: ["vinicius", "milica", "thiago","cabelo", "alexandre", "jean", "valdir", "everson", "rodrigo-p",  { guest: true, name: "Adriel", position: "Meia", number: 0 }],
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
    },
    {
      round: 6,
      date: "11/04/2026",
      time: "10:00",
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 7, vermelho: 11 },
      mvp: "alef",
      teamAzul: ["vinicius", "germano","alemao", "erig","alexandre", "iago", "rafael-isco", "rodrigo-costa", "marcelo", "augusto"],
      teamVermelho: ["edu", "milica", "thiago","ivan", "adler", "biro", "vander", "wesley", "alef", "rodrigo-p"],
      scorers: [
        { playerId: "alef", team: "vermelho" },
        { playerId: "alef", team: "vermelho" },
        { playerId: "alef", team: "vermelho" },
        { playerId: "alef", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "wesley", team: "vermelho" },
        { playerId: "biro", team: "vermelho" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "rodrigo-costa", team: "azul" },
        { playerId: "iago", team: "azul" },
        { playerId: "iago", team: "azul" },

      ],
      assists: [
        { playerId: "alef", team: "vermelho" },
        { playerId: "alef", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "biro", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "thiago", team: "vermelho" },
        { playerId: "wesley", team: "vermelho" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "erig", team: "azul" },
        { playerId: "erig", team: "azul" },
        { playerId: "iago", team: "azul" },
        { playerId: "germano", team: "azul" },        
        { playerId: "vinicius", team: "azul" },
      ]
    },
    {
      round: 7,
      date: "18/04/2026",
      time: "10:00",
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 2, vermelho: 4 },
      mvp: "weslley",
      teamAzul: ["vinicius", "biro", "thiago","alexandre", "iago",  "krigor", "adler", "rodrigo-p", "marcelo"],
      teamVermelho: ["silvio", "milica","chico", "wesley", "erig", "vander", "jean", "weslley", { guest: true, name: "Anderson", position: "Centroavante", number: 333 }],
      scorers: [
        { playerId: "weslley", team: "vermelho" },
        { playerId: "weslley", team: "vermelho" },
        { playerId: "weslley", team: "vermelho" },
        { playerId: "erig", team: "vermelho" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "adler", team: "azul" },
      ],
      assists: [
        { playerId: "wesley", team: "vermelho" },
        { playerId: "jean", team: "vermelho" },
        { playerId: "chico", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "rodrigo-p", team: "azul" }
      ]
    },
    {
      round: 8,
      date: "09/05/2026",
      time: "10:00",
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 5, vermelho: 10 },
      mvp: "rodrigo-p",
      teamAzul: [{guest: true, name: "Rafael", position: "Goleiro", number: 1}, "ivan", "thiago","alemao", "milica", "wesley", "alef", "gabriel", "augusto", "filipe", "vander"],
      teamVermelho: ["vinicius", "biro","germano", "everson", "erig", "cabelo", "alexandre", "krigor", "rodrigo-p", "marcelo"],
      scorers: [
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "alexandre", team: "vermelho" },
        { playerId: "krigor", team: "vermelho" },
        { playerId: "krigor", team: "vermelho" },
        { playerId: "gabriel", team: "azul" },
        { playerId: "augusto", team: "azul" },
        { playerId: "alef", team: "azul" },
        { playerId: "alemao", team: "azul" },
        { playerId: "wesley", team: "azul" },
      ],
      assists: [
        { playerId: "krigor", team: "vermelho" },
        { playerId: "krigor", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "augusto", team: "azul" },
        { playerId: "milica", team: "azul" },
        { playerId: "milica", team: "azul" },
        { playerId: "alef", team: "azul" }
      ]
    },
  ],

  /**
   * =============================================
   *  PRÓXIMA PARTIDA — preencha após definir a data
   *  nextMatch: null  →  nenhuma próxima partida agendada
   *  nextMatch: { round, date, time, location }
   * =============================================
   */

  nextMatch: null,
  /*nextMatch: {
    round: 7,
    date: "02/05/2026",
    time: "10:00",
    location: { venue: "MCM Porto Seco", address: "Av. Sertório, 7777 - Porto Alegre, RS" }
  },*/

  /**
   * =============================================
   *  LISTA DE JOGADORES — TEMPORADA 2026
   * =============================================
   */

  
      // injury: null  →  sem lesão
      // injury: { name: "Entorse no tornozelo", returnDate: "15/05/2026" }  →  lesionado

  players: [
    {
      id: "gabriel",
      name: "Gabriel 'Teles'",
      fullName: "Gabriel Teles Dos Santos",
      nickname: "Teles",
      number: { uni1: 97, uni2: 97 },
      position: "Ala",
      foot: "Direito",
      birthDate: "28/05/1997",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1998, idade atual: 28 anos)
      photo: {
        uni1: "img/players/gabriel-azul.png", 
        uni2: "img/players/gabriel-vermelho.png"
      },
      //injury: { name: "Septoplastia", returnDate: "10/05/2026" },
      injuredRounds: [6,7],
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
      birthDate: "15/05/1990",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1991, idade atual: 35 anos)
      photo: {
        uni1: "img/players/marcelo-azul.png", 
        uni2: "img/players/marcelo-vermelho.png"
      },
      injury: null,
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
      birthDate: "10/05/1967",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1968, idade atual: 58 anos)
      photo: {
        uni1: "img/players/alexandre-azul.png", 
        uni2: "img/players/alexandre-vermelho.png"
      },
      injury: null,
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
      birthDate: "24/07/1991",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1992, idade atual: 34 anos)
      photo: {
        uni1: "img/players/biro-azul.png", 
        uni2: "img/players/biro-vermelho.png"
      },
      injury: null,
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
      birthDate: null,        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1976, idade atual: 50 anos)
      photo: {
        uni1: "img/players/germano-azul.png", 
        uni2: "img/players/germano-vermelho.png"
      },
      injury: null,
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
      foot: "Ambos",
      birthDate: "05/03/1991",        // DD/MM/AAAA — data de nascimento (não informada)
      photo: {
        uni1: "img/players/edu-azul.png", 
        uni2: "img/players/edu-amarelo.png"
      },
      injury: null,
      awards: []
    },
    {
      id: "rodrigo-costa",
      name: "Rodrigo Costa",
      fullName: "Rodrigo Costa",
      nickname: "Rodrigo C.",
      number: { uni1: 8, uni2: 8 },
      position: "Ponta",
      foot: "Direito",
      birthDate: "24/09/1996",        // DD/MM/AAAA — data de nascimento (não informada)
      photo: {
        uni1: "img/players/rodrigoc-azul.png", 
        uni2: "img/players/rodrigoc-vermelho.png"
      },
      injury: null,
      awards: []
    },
    {
      id: "cabelo",
      name: "Wellerson 'Cabelo' Souza",
      fullName: "Wellerson Souza",
      nickname: "Cabelo",
      number: { uni1: 2, uni2: 2 },
      position: "Fixo",
      foot: "Direito",
      birthDate: null,        // DD/MM/AAAA — data de nascimento (não informada)
      photo: {
        uni1: "img/players/cabelo-azul.png", 
        uni2: "img/players/cabelo-vermelho.png"
      },
      injury: null,
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
      birthDate: "23/08/2002",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 2003, idade atual: 23 anos)
      photo: {
        uni1: "img/players/rafael-isco-azul.png", 
        uni2: "img/players/rafael-isco-vermelho.png"
      },
      injury: null,
      awards: []
    },
    {
      id: "vinicius",
      name: "Vinicius Teles",
      fullName: "Vinicius Teles Jesus",
      nickname: null,
      number: { uni1: 12, uni2: 12 },
      position: "Goleiro",
      foot: "Direito",
      birthDate: "24/04/1995",        // DD/MM/AAAA — data de nascimento (não informada)
      photo: {
        uni1: "img/players/vinicius-azul.png", 
        uni2: "img/players/vinicius-amarelo.png"
      },
      injury: null,
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
      foot: "Direito",
      birthDate: "21/09/1999",        // DD/MM/AAAA — data de nascimento (não informada)
      photo: {
        uni1: "img/players/wess-azul.png", 
        uni2: "img/players/wess-vermelho.png"
      },
      injury: null,
      awards: [
        { year: 2025, title: "Melhor Ponta", icon: "🥇" }
      ]
    },
    {
      id: "rodrigo-p",
      name: "Rodrigo Prodocimo",
      fullName: "Rodrigo Prodocimo",
      nickname: null,
      number: { uni1: 11, uni2: 11 },
      position: "Centroavante",
      foot: "Esquerdo",
      birthDate: "18/08/1986",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1987, idade atual: 39 anos)
      photo: {
        uni1: "img/players/rodrigop-azul.png", 
        uni2: "img/players/rodrigop-vermelho.png"
      },
      injury: null,
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
      birthDate: "04/12/1994",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1995, idade atual: 31 anos)
      photo: {
        uni1: "img/players/augusto-azul.png", 
        uni2: "img/players/augusto-vermelho.png"
      },
      injury: null,
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
      birthDate: "28/06/1993",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1993, idade atual: 33 anos)
      photo: {
        uni1: "img/players/baracy-azul.png", 
        uni2: "img/players/baracy-vermelho.png"
      },
      injury: null,
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
      birthDate: null,        // DD/MM/AAAA — data de nascimento (não informada)
      photo: { uni1: null, uni2: null },
      injury: null,
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
      birthDate: "25/02/1995",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1995, idade atual: 31 anos)
      photo: {
        uni1: "img/players/giovane-azul.png", 
        uni2: "img/players/giovane-vermelho.png"
      },
      injury: null,
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
      birthDate: "02/12/1992",        // DD/MM/AAAA — data de nascimento (não informada)
      photo: {
        uni1: "img/players/jean-azul.png", 
        uni2: "img/players/jean-vermelho.png"
      },
      injury: null,
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
      birthDate: "08/07/1995",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1996, idade atual: 30 anos)
      photo: {
        uni1: "img/players/milica-azul.png", 
        uni2: "img/players/milica-vermelho.png"
      },
      injury: null,
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
      birthDate: null,        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1991, idade atual: 35 anos)
      photo: {
        uni1: "img/players/vander-azul.png", 
        uni2: "img/players/vander-vermelho.png"
      },
      injury: null,
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
      birthDate: "21/03/1995",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1995, idade atual: 31 anos)
      photo: {
        uni1: "img/players/iago-azul.png", 
        uni2: "img/players/iago-vermelho.png"
      },
      injury: null,
      awards: []
    },
    {
      id: "valdir",
      name: "Valdir Jr.",
      fullName: "Valdir Rodrigues Junior.",
      nickname: null,
      number: { uni1: 11, uni2: 11 },
      position: "Meia",
      foot: "Direito",
      birthDate: "11/02/1987",        // DD/MM/AAAA — data de nascimento (não informada)
      photo: {
        uni1: "img/players/valdir-azul.png", 
        uni2: "img/players/valdir-vermelho.png"
      },
      injury: null,
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
      birthDate: "30/10/1998",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1998, idade atual: 28 anos)
      photo: { 
        uni1: "img/players/adler-azul.png",
        uni2: "img/players/adler-vermelho.png" },
      injury: null,
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
      birthDate: "24/12/1993",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1994, idade atual: 32 anos)
      photo: { 
        uni1: "img/players/alef-azul.png", 
        uni2: "img/players/alef-vermelho.png" },
      injury: null,
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
      birthDate: "14/03/2001",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 2001, idade atual: 25 anos)
      photo: {
        uni1: "img/players/erig-azul.png", 
        uni2: "img/players/erig-vermelho.png"
      },
      injury: null,
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
      birthDate: "22/05/1997",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1998, idade atual: 28 anos)
      photo: {
        uni1: "img/players/wesley-azul.png", 
        uni2: "img/players/wesley-vermelho.png"
      },
      injury: null,
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
      birthDate: "27/02/1984",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1984, idade atual: 42 anos)
      photo: {
        uni1: "img/players/edson-azul.png", 
        uni2: "img/players/edson-vermelho.png"
      },
      injury: null,
      awards: []
    },
    {
      id: "juliano",
      name: "Juliano",
      fullName: "Juliano Dias Teles",
      nickname: null,
      number: { uni1: 3, uni2: 3 },
      position: "Meia",
      foot: "Direito",
      birthDate: "29/12/1990",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1991, idade atual: 35 anos)
      photo: {
        uni1: "img/players/juliano-azul.png", 
        uni2: "img/players/juliano-vermelho.png"
      },
      injury: { name: "Ligamento Cruzado Anterior", returnDate: "Sem previsão" },
      injuredRounds: [1,2,3, 4, 5,6,7],
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
      birthDate: null,        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1981, idade atual: 45 anos)
      photo: {
        uni1: "img/players/chico-azul.png", 
        uni2: "img/players/chico-vermelho.png"
      },
      injury: null,
      awards: []
    },
    {
      id: "everson",
      name: "Everson",
      fullName: "Everson Pereira",
      nickname: null,
      number: { uni1: 5, uni2: 5 },
      position: "Ala",
      foot: "Direito",
      birthDate: "14/02/1998",        // DD/MM/AAAA — data de nascimento (não informada)
      photo: {
        uni1: "img/players/everson-azul.png", 
        uni2: "img/players/everson-vermelho.png"
      },
      injury: null,
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
      birthDate: "18/11/1995",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1996, idade atual: 30 anos)
      photo: {
        uni1: "img/players/filipe-azul.png", 
        uni2: "img/players/filipe-vermelho.png"
      },
      injury: null,
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
      birthDate: "06/12/2003",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 2004, idade atual: 22 anos)
      photo: {
        uni1: "img/players/gustavo-azul.png", 
        uni2: "img/players/gustavo-vermelho.png"
      },
      injury: null,
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
      birthDate: "21/09/1993",        // DD/MM/AAAA — data de nascimento (não informada)
      photo: {
        uni1: "img/players/ivan-azul.png", 
        uni2: "img/players/ivan-vermelho.png"
      },
      injury: null,
      awards: []
    },
    {
      id: "keke",
      name: "Alisson 'Keke'",
      fullName: "Alisson",
      nickname: "Tio Keke",
      number: { uni1: 5, uni2: 5 },
      position: "Ala",
      foot: "Direito",
      birthDate: null,        // DD/MM/AAAA — data de nascimento (não informada)
      photo: {
        uni1: "img/players/keke-azul.png", 
        uni2: "img/players/keke-vermelho.png"
      },
      injury: null,
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
      birthDate: "17/11/2000",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 2001, idade atual: 25 anos)
      photo: {
        uni1: "img/players/krigor-azul.png", 
        uni2: "img/players/krigor-vermelho.png"
      },
      injury: null,
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
      birthDate: "01/06/90",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1991, idade atual: 35 anos)
      photo: {
        uni1: "img/players/thiago-azul.png", 
        uni2: "img/players/thiago-vermelho.png"
      },
      injury: null,
      awards: []
    },
    {
      id: "miliquinha",
      name: "Gabriel 'Miliquinha'",
      fullName: "Gabriel De Oliveira Teixeira",
      nickname: "Miliquinha",
      number: { uni1: 1, uni2: 1 },
      position: "Goleiro",
      foot: "Direito",
      birthDate: "17/05/2010",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 2011, idade atual: 15 anos)
      photo: {
        uni1: "img/players/miliquinha-azul.png", 
        uni2: "img/players/miliquinha-vermelho.png"
      },
      injury: null,
      awards: []
    },
    {
      id: "silvio",
      name: "Silvio",
      fullName: "Silvio Gerhard",
      nickname: null,
      number: { uni1: 13, uni2: 13 },
      position: "Goleiro",
      foot: "Direito",
      birthDate: "24/11/1984",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1985, idade atual: 41 anos)
      photo: {
        uni1: "img/players/silvio-azul.png", 
        uni2: "img/players/silvio-vermelho.png"
      },
      injury: null,
      awards: []
    }
  ],

  /**
   * Patrocinadores — adicione logo (PNG), nome, descrição e link de rede social
   */
  /*
   * =============================================
   *  PATROCINADORES
   *  tier: "master" | "ouro" | "prata"
   *  link: URL principal (Instagram, site, etc.)
   *  instagram: URL do perfil Instagram (ícone no card master)
   *  facebook: URL do perfil Facebook (ícone no card master, deixar null se não houver)
   *  whatsapp: número para WhatsApp no formato "5551999999999" (ícone no card master, deixar null se não houver)
   *  bannerImg: imagem banner do patrocinador master (800x180px) — null para os demais
   *  description: texto curto exibido no card
   *  descriptionLong: texto completo para o modal (futuro)
   *  photos: array de imagens para o modal (futuro)
   * =============================================
   */
  sponsors: [
    {
      id: "monello",
      name: "Monello",
      tier: "master",
      description: "O que define família é o amor. #Monellovers",
      descriptionLong: null,
      logo: "img/sponsors/monello.png",
      bannerImg: "img/sponsors/monello-banner.png",  // imagem 800x180px para o card master
      link: "https://www.instagram.com/monello_oficial/",
      instagram: "https://www.instagram.com/monello_oficial/",
      facebook: "https://www.facebook.com/MonelloOficial/",             // preencha com a URL do Facebook se houver
      // whatsapp: "5551999999999",  // descomente e preencha para exibir ícone do WhatsApp
      photos: []
    },
    {
      id: "wc-store",
      name: "WC Store",
      tier: "ouro",
      description: null,
      descriptionLong: null,
      logo: "img/sponsors/wc-store.png",
      link: "https://www.instagram.com/wc_store10/",
      photos: []
    },
    {
      id: "wess-tattoo",
      name: "Wess Tattoo",
      tier: "ouro",
      description: null,
      descriptionLong: null,
      logo: "img/sponsors/wess-tattoo.png",
      link: "https://www.instagram.com/wess_tattoo/",
      photos: []
    },
    {
      id: "sulutta",
      name: "Sulutta Doces & Delicias",
      tier: "prata",
      description: "Alegrando os momentos doces da vida!",
      descriptionLong: null,
      logo: "img/sponsors/sulutta.png",
      link: "https://www.facebook.com/sulutadelicias/",
      photos: []
    },
    {
      id: "dana",
      name: "Dana Containers",
      tier: "prata",
      description: "Transformando espaços em experiências únicas, um container de cada vez.",
      descriptionLong: null,
      logo: "img/sponsors/dana1.PNG",
      link: "https://www.instagram.com/containers_dana/",
      photos: []
    },
    {
      id: "alinox",
      name: "Alinox",
      tier: "prata",
      description: null,
      descriptionLong: null,
      logo: "img/sponsors/alinox.png",
      link: null,
      photos: []
    }
  ]
};

/* ============================================================
   FUNÇÕES DE DATA E ANIVERSÁRIO (v1.11)
   ============================================================ */

/**
 * Calcula a idade a partir de uma data de nascimento no formato "DD/MM/AAAA".
 * Retorna null se a data não estiver preenchida.
 */
function calcularIdade(birthDate) {
  if (!birthDate) return null;
  var parts = birthDate.split('/');
  if (parts.length !== 3) return null;
  var dia = parseInt(parts[0], 10);
  var mes = parseInt(parts[1], 10) - 1; // mês 0-indexado
  var ano = parseInt(parts[2], 10);
  if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return null;
  var hoje = new Date();
  var idade = hoje.getFullYear() - ano;
  // Subtrai 1 se ainda não chegou o aniversário este ano
  if (hoje.getMonth() < mes || (hoje.getMonth() === mes && hoje.getDate() < dia)) {
    idade--;
  }
  return idade >= 0 ? idade : null;
}

/**
 * Verifica se hoje é o aniversário do jogador.
 * Retorna true se birthDate = "DD/MM/AAAA" e hoje é DD/MM.
 */
function isAniversarioHoje(birthDate) {
  if (!birthDate) return false;
  var parts = birthDate.split('/');
  if (parts.length !== 3) return false;
  var dia = parseInt(parts[0], 10);
  var mes = parseInt(parts[1], 10) - 1;
  var hoje = new Date();
  return hoje.getDate() === dia && hoje.getMonth() === mes;
}

/* ============================================================
   FUNÇÕES UTILITÁRIAS v1.9 — não altere abaixo desta linha
   ============================================================ */

/**
 * Calcula stats de um jogador diretamente das partidas registradas.
 * Retorna { matches, goals, assists, points }
 * Atletas avulsos (guest) não são contabilizados aqui.
 */
function getComputedStats(playerId) {
  let matches = 0, goals = 0, assists = 0, points = 0;
  SRDS.matches.forEach(m => {
    if (!m.result) return; // partidas não realizadas não contam
    // Verifica se o jogador estava na escalação (não conta avulsos)
    const inAzul = (m.teamAzul || []).includes(playerId);
    const inVerm = (m.teamVermelho || []).includes(playerId);
    if (!inAzul && !inVerm) return;
    matches++;
    // Pontos conforme resultado
    const azulWin  = m.result.azul > m.result.vermelho;
    const vermWin  = m.result.vermelho > m.result.azul;
    const empate   = m.result.azul === m.result.vermelho;
    if (empate) { points += 1; }
    else if (inAzul && azulWin)  { points += 3; }
    else if (inVerm && vermWin)  { points += 3; }
    // Gols
    (m.scorers || []).forEach(ev => {
      if (ev.playerId === playerId) goals++;
    });
    // Assistências
    (m.assists || []).forEach(ev => {
      if (ev.playerId === playerId) assists++;
    });
  });
  return { matches, goals, assists, points };
}

/**
 * Conta quantas vezes o jogador foi MVP na temporada.
 */
function getMvpCount(playerId) {
  return SRDS.matches.filter(m => m.mvp === playerId).length;
}

/** Frequência do atleta: partidas jogadas / total de rodadas disputadas */
function getFrequency(player) {
  const disputadas = SRDS.matches.filter(m => m.result !== null).length;
  if (disputadas === 0) return 0;
  const cs = getComputedStats(player.id);
  return cs.matches / disputadas;
}

/**
 * Tabela de pontuação com stats calculados das partidas.
 * Critérios de desempate: pontos → frequência → G+A → gols → nome
 */
function getStandings() {
  return [...SRDS.players].map(p => {
    const cs = getComputedStats(p.id);
    return { ...p, stats: cs };
  }).sort((a, b) => {
    if (b.stats.points !== a.stats.points) return b.stats.points - a.stats.points;
    const disputadas = SRDS.matches.filter(m => m.result !== null).length;
    const freqA = disputadas > 0 ? a.stats.matches / disputadas : 0;
    const freqB = disputadas > 0 ? b.stats.matches / disputadas : 0;
    if (Math.abs(freqB - freqA) > 0.0001) return freqB - freqA;
    const gaA = a.stats.goals + a.stats.assists;
    const gaB = b.stats.goals + b.stats.assists;
    if (gaB !== gaA) return gaB - gaA;
    if (b.stats.goals !== a.stats.goals) return b.stats.goals - a.stats.goals;
    return a.name.localeCompare(b.name, 'pt-BR');
  });
}

/**
 * Ranking de gols com desempate por média por partida.
 */
function getGoalsRanking() {
  return [...SRDS.players].map(p => ({ ...p, stats: getComputedStats(p.id) }))
    .sort((a, b) => {
      if (b.stats.goals !== a.stats.goals) return b.stats.goals - a.stats.goals;
      const avgA = a.stats.matches > 0 ? a.stats.goals / a.stats.matches : 0;
      const avgB = b.stats.matches > 0 ? b.stats.goals / b.stats.matches : 0;
      if (Math.abs(avgB - avgA) > 0.0001) return avgB - avgA;
      return a.name.localeCompare(b.name, 'pt-BR');
    });
}

/**
 * Ranking de assistências com desempate por média por partida.
 */
function getAssistsRanking() {
  return [...SRDS.players].map(p => ({ ...p, stats: getComputedStats(p.id) }))
    .sort((a, b) => {
      if (b.stats.assists !== a.stats.assists) return b.stats.assists - a.stats.assists;
      const avgA = a.stats.matches > 0 ? a.stats.assists / a.stats.matches : 0;
      const avgB = b.stats.matches > 0 ? b.stats.assists / b.stats.matches : 0;
      if (Math.abs(avgB - avgA) > 0.0001) return avgB - avgA;
      return a.name.localeCompare(b.name, 'pt-BR');
    });
}

/** Jogadores em ordem alfabética */
function getAlphabetical() {
  return [...SRDS.players].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

/** Busca jogador por ID */
function getPlayerById(id) {
  return SRDS.players.find(p => p.id === id) || null;
}


/**
 * Retorna dados por rodada para o gráfico de evolução do jogador.
 * Cada item representa uma rodada com resultado registrado.
 * jouEu: se o jogador participou; gols/assists/points: stats daquela rodada.
 * Usado nos dois gráficos do perfil (por rodada e acumulado).
 */
function getPlayerChartData(playerId) {
  const rodadas = SRDS.matches.filter(m => m.result !== null);
  let acumGols = 0, acumAss = 0, acumPts = 0;

  // Conjunto de rodadas perdidas por lesão para este jogador
  const player = getPlayerById(playerId);
  const injuredRoundsSet = new Set(
    (player && player.injuredRounds) ? player.injuredRounds : []
  );

  return rodadas.map(m => {
    const inAzul = (m.teamAzul  || []).includes(playerId);
    const inVerm = (m.teamVermelho || []).includes(playerId);
    const jogou  = inAzul || inVerm;

    // Ausência por lesão: não jogou E a rodada está em injuredRounds
    const lesionado = !jogou && injuredRoundsSet.has(m.round);

    let gols = 0, assists = 0, points = 0;
    if (jogou) {
      const azulWin = m.result.azul > m.result.vermelho;
      const vermWin = m.result.vermelho > m.result.azul;
      if (m.result.azul === m.result.vermelho)    points = 1;
      else if (inAzul && azulWin)                 points = 3;
      else if (inVerm && vermWin)                 points = 3;
      (m.scorers || []).forEach(ev => { if (ev.playerId === playerId) gols++; });
      (m.assists || []).forEach(ev => { if (ev.playerId === playerId) assists++; });
    }

    acumGols += gols;
    acumAss  += assists;
    acumPts  += points;

    return {
      round:       m.round,
      jogou,
      lesionado,   // true = ausente por lesão (exibe ✕ no gráfico)
      // valores daquela rodada
      gols, assists, points,
      // valores acumulados até aqui
      acumGols, acumAss, acumPts
    };
  });
}

/** Calcula rank de um jogador nas três categorias */
function getPlayerRanks(player) {
  const standings = getStandings();
  const goals     = getGoalsRanking();
  const assists   = getAssistsRanking();
  const findRank  = (arr, p) => arr.findIndex(x => x.id === p.id) + 1;
  return {
    points:  findRank(standings, player),
    goals:   findRank(goals, player),
    assists: findRank(assists, player)
  };
}

/** Calcula médias por partida do jogador (baseado nas partidas reais) */
function getPlayerAverages(player) {
  const cs = getComputedStats(player.id);
  const m  = cs.matches;
  if (m === 0) return { goals: '0.00', assists: '0.00', participation: '0.00' };
  return {
    goals:         (cs.goals / m).toFixed(2),
    assists:       (cs.assists / m).toFixed(2),
    participation: ((cs.goals + cs.assists) / m).toFixed(2)
  };
}

/** Ordem das posições na escalação */
const POSITION_ORDER = { 'goleiro':1, 'fixo':2, 'ala':3, 'meia':4, 'ponta':5, 'centroavante':6 };
function positionRank(pos) {
  if (!pos) return 99;
  return POSITION_ORDER[pos.toLowerCase()] ?? 7;
}

/** Resolve entrada da escalação para objeto { id, name, photo, number, position, posRank, isGuest } */
function resolveLineupEntry(entry, team) {
  if (typeof entry === 'string') {
    const p = getPlayerById(entry);
    if (!p) return null;
    const photo  = team === 'azul' ? p.photo?.uni1  : p.photo?.uni2;
    const number = team === 'azul' ? p.number?.uni1 : p.number?.uni2;
    return { id: p.id, name: p.name, photo: photo||null, number: number??null,
             position: p.position||null, posRank: positionRank(p.position), isGuest: false };
  }
  if (entry && entry.guest) {
    // Foto padrão para todos os atletas avulsos
    const guestPhoto = team === 'azul'
      ? 'img/players/jogador-avulso.png'
      : 'img/players/jogador-avulso.png';
    // Foto única se não houver versão por uniforme (fallback)
    const photo = guestPhoto;
    const pos   = entry.position || null;
    const num   = entry.number   ?? null;
    return { id: null, name: entry.name, photo, number: num,
             position: pos, posRank: positionRank(pos), isGuest: true };
  }
  return null;
}

/** Resolve scorer/assist para nome de exibição */
function resolveEventName(event) {
  if (event.guestName) return event.guestName;
  const p = getPlayerById(event.playerId);
  return p ? p.name : '?';
}
