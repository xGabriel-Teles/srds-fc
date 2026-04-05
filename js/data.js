/**
 * SRDS FC — Dados da Temporada 2026
 * Para atualizar os dados, edite os arrays abaixo.
 * 
 * Estrutura do jogador:
 *  id         → slug único para URL (jogador.html?id=ESTE_ID)
 *  name       → nome curto exibido na tabela
 *  fullName   → nome completo para o perfil
 *  nickname   → apelido (opcional)
 *  number     → { uni1: número uniforme azul, uni2: número uniforme vermelho }
 *  position   → posição principal
 *  foot       → "Destro" | "Canhoto" | "Ambidestro" | null
 *  age        → número | null
 *  photo      → { uni1: "caminho/foto1.png", uni2: "caminho/foto2.png" } — null enquanto não tiver foto
 *  stats      → { matches, goals, assists, points }
 *  awards     → array de { year, title, icon }
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
    about: `O SRDS FC nasceu em 2024 como um grupo de amigos unidos pela paixão pelo futebol. O que começou de forma despretensiosa foi crescendo junto com a dedicação de cada jogador — e com o tempo, o grupo foi se profissionalizando: uniformes personalizados, filmagens dos jogos, equipamentos próprios e perfis oficiais nas redes sociais.\n\nHoje, com cerca de duas temporadas completas e a terceira em andamento, o SRDS FC é mais do que um pelada entre amigos. É uma comunidade, uma tradição, um compromisso. As partidas acontecem em quadras de Porto Alegre, com frequência de 2 a 3 vezes por mês durante a temporada 2026.`,
    seasons: ["2024 (parcial)", "2025", "2026 (em andamento)"]
  },

  /**
   * Datas das 5 rodadas da temporada 2026 (atualize conforme novas rodadas)
   */
  matches: [
    { round: 1, date: "07/02/2026" },
    { round: 2, date: "21/02/2026" },
    { round: 3, date: "07/03/2026" },
    { round: 4, date: "14/03/2026" },
    { round: 5, date: "21/03/2026" }
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
      photo: { uni1: null, uni2: null },
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
      id: "viny",
      name: "Vinicius 'Biro' Félix",
      fullName: "Félix",
      nickname: "Biro",
      number: { uni1: 6, uni2: 6 },
      position: "Ala",
      foot: "Direito",
      age: 34,
      photo: { uni1: null, uni2: null },
      stats: { matches: 4, goals: 0, assists: 0, points: 9 },
      awards: []
    },
    {
      id: "germano",
      name: "Germano",
      fullName: "Germano Araujo",
      nickname: null,
      number: { uni1: 4, uni2: 4 },
      position: "Fixo",
      foot: "Direito",
      age: 50,
      photo: { uni1: null, uni2: null },
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
      photo: { uni1: null, uni2: null },
      stats: { matches: 2, goals: 1, assists: 0, points: 6 },
      awards: []
    },
    {
      id: "cabelo",
      name: "Wellerson 'Cabelo' Souza",
      fullName: "Souza",
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
      fullName: "Rafael Souza",
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
      photo: { uni1: null, uni2: null },
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
      photo: { uni1: null, uni2: null },
      stats: { matches: 4, goals: 10, assists: 6, points: 6 },
      awards: [
        { year: 2025, title: "Melhor Atacante", icon: "🥇" }
      ]
    },
    {
      id: "augusto",
      name: "Augusto",
      fullName: "Augusto Souza",
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
      photo: { uni1: null, uni2: null },
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
      name: "Giovane 'Maninho' Maleski",
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
      fullName: "Jean Patrick",
      nickname: null,
      number: { uni1: 8, uni2: 8 },
      position: "Meia",
      foot: "Direito",
      age: null,
      photo: { uni1: null, uni2: null },
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
      photo: { uni1: null, uni2: null },
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
      photo: { uni1: null, uni2: null },
      stats: { matches: 4, goals: 2, assists: 0, points: 3 },
      awards: []
    },
    {
      id: "iago",
      name: "Iago",
      fullName: "Iago Vieira",
      nickname: null,
      number: { uni1: 8, uni2: 10 },
      position: "Ala",
      foot: "Direito",
      age: 31,
      photo: { uni1: null, uni2: null },
      stats: { matches: 2, goals: 3, assists: 1, points: 3 },
      awards: []
    },
    {
      id: "valdir",
      name: "Valdir Jr.",
      fullName: "Valdir Jr.",
      nickname: null,
      number: { uni1: 11, uni2: 11 },
      position: "Meia",
      foot: null,
      age: null,
      photo: { uni1: null, uni2: null },
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
      photo: { uni1: null, uni2: null },
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
      photo: { uni1: null, uni2: null },
      stats: { matches: 3, goals: 1, assists: 1, points: 3 },
      awards: [
        { year: 2025, title: "Melhor Meia", icon: "🥇" }
      ]
    },
    {
      id: "alemao",
      name: "Edson 'Alemão' Muzikant",
      fullName: "Edson ",
      nickname: "Alemão",
      number: { uni1: 7, uni2: 7 },
      position: "Fixo",
      foot: "Direito",
      age: 42,
      photo: { uni1: null, uni2: null },
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
      id: "felipe",
      name: "Filipe Alves",
      fullName: "Filipe Alves Pizzinato",
      nickname: "Lipe",
      number: { uni1: 11, uni2: 11 },
      position: "Ponta",
      foot: "Direito",
      age: 30,
      photo: { uni1: null, uni2: null },
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
      photo: { uni1: null, uni2: null },
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
      photo: { uni1: null, uni2: null },
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
      photo: { uni1: null, uni2: null },
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
      photo: { uni1: null, uni2: null },
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
      id: "gabriel-milica",
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
    logo: "img/sponsors/dana1.png",
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

/** Retorna os jogadores ordenados por pontos (e por nome em caso de empate) */
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

/** Retorna os jogadores ordenados por gols */
function getGoalsRanking() {
  return [...SRDS.players].sort((a, b) => {
    if (b.stats.goals !== a.stats.goals) return b.stats.goals - a.stats.goals;
    return a.name.localeCompare(b.name);
  });
}

/** Retorna os jogadores ordenados por assistências */
function getAssistsRanking() {
  return [...SRDS.players].sort((a, b) => {
    if (b.stats.assists !== a.stats.assists) return b.stats.assists - a.stats.assists;
    return a.name.localeCompare(b.name);
  });
}

/** Retorna os jogadores em ordem alfabética (para navegação de perfil) */
function getAlphabetical() {
  return [...SRDS.players].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

/** Busca jogador por ID */
function getPlayerById(id) {
  return SRDS.players.find(p => p.id === id) || null;
}

/** Calcula rank de um jogador por categoria */
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

/** Calcula médias do jogador */
function getPlayerAverages(player) {
  const m = player.stats.matches;
  if (m === 0) return { goals: 0, assists: 0, participation: 0 };
  return {
    goals: (player.stats.goals / m).toFixed(2),
    assists: (player.stats.assists / m).toFixed(2),
    participation: ((player.stats.goals + player.stats.assists) / m).toFixed(2)
  };
}
