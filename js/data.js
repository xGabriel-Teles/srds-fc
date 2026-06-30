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
 * CAMPO interview (opcional) nas partidas — vídeo ÚNICO com até 2 atletas entrevistados:
 *   interview: null  → sem entrevista nesta rodada
 *   interview: {
 *     youtubeId: "dQw4w9WgXcQ",       // código do vídeo (NUNCA use Shorts — ver nota abaixo)
 *     players: [
 *       { team: "azul",     playerId: "rodrigo-p", playerName: null },
 *       { team: "vermelho", playerId: "gabriel",   playerName: null }
 *     ]
 *   }
 *   - Os dois atletas aparecem juntos no MESMO card (é um vídeo só com as duas entrevistas).
 *   - Se o entrevistado for avulso (sem ID no elenco), use playerId: null e playerName: "Nome".
 *   - Pode ter só 1 atleta no array "players" se for o caso.
 *
 * CAMPO highlight (opcional) nas partidas — vídeo dos melhores momentos da rodada:
 *   highlight: null somente um se valor não houver vídeo nesta rodada
 *   highlight: { youtubeId: "dQw4w9WgXcQ" }
 *
 * ⚠️ IMPORTANTE SOBRE O youtubeId (interview e highlight):
 *   - Use APENAS o código do vídeo normal do YouTube, NUNCA links de Shorts.
 *     Exemplo correto:    https://youtu.be/dQw4w9WgXcQ        → youtubeId: "dQw4w9WgXcQ"
 *     Exemplo correto:    https://youtube.com/watch?v=dQw4w9WgXcQ → youtubeId: "dQw4w9WgXcQ"
 *     NÃO use:            https://youtube.com/shorts/XXXXXXX  (Shorts não suportam embed)
 *   - Mesmo com "Permitir incorporação" ativado no YouTube Studio, vídeos do tipo Shorts
 *     costumam dar Erro 153 quando embedados — converta o vídeo para um upload normal
 *     (vídeo "longo", ainda que curto) se quiser que ele toque dentro do site.
 *   - Se o vídeo continuar bloqueado mesmo sendo um vídeo normal, o site detecta a falha
 *     automaticamente e abre um modal com player alternativo, sem quebrar a página.
 *
 *   Se nenhum dos dois campos (interview/highlight) estiver preenchido na rodada,
 *   a seção "Entrevistas Pós-Jogo" não aparece na página da partida.
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
    youtube: "@SRDSFC",
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
      ],
      // Exemplo de preenchimento — substitua pelos códigos reais do YouTube
      interview: null,
      // interview: {
      //   youtubeId: "SEU_CODIGO_AQUI",
      //   players: [
      //     { team: "azul",     playerId: "rodrigo-p", playerName: null },
      //     { team: "vermelho", playerId: "gabriel",   playerName: null }
      //   ]
      // },
      highlight: null
      // highlight: { youtubeId: "SEU_CODIGO_AQUI" }
    },
    {
      round: 2,
      date: "21/02/2026",
      time: "09:30",
      location: { venue: "HD Sports Complex", address: "R. Lauro Müller, 850 - Navegantes, Porto Alegre - RS" },
      result: { azul: 4, vermelho: 5 },
      mvp: "gabriel",
      teamAzul: ["vinicius", "milica","chico", "alexandre", "adler", "wesley", "gustavo", "filipe", "alef", "augusto"],
      teamVermelho: ["edu", "thiago", "germano", "biro", "gabriel", {guest: true, name: "Diego", position: "Meia", number: 20}, "baracy", "rodrigo-costa", "weslley", "marcelo"],
      scorers: [
        { playerId: "gabriel", team: "vermelho" },
        { playerId: "gabriel", team: "vermelho" },
        { playerId: "germano", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { guestName: "diego", team: "vermelho" },
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
      ],
      interview: null,
      highlight: null
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
      ],
      interview: null,
      highlight: null
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
      ],
      interview: null,
      highlight: null
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
      ],
      interview: null,
      highlight: null
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
      ],
      interview: null,
      highlight: null
    },
    {
      round: 7,
      date: "18/04/2026",
      time: "10:00",
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 2, vermelho: 4 },
      mvp: "weslley",
      teamAzul: ["vinicius", "biro", "thiago","alexandre", "iago",  "krigor", "adler", "rodrigo-p", "marcelo"],
      teamVermelho: ["silvio", "milica","chico", "wesley", "erig", "vander", "jean", "weslley", "anderson"],
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
      ],
      interview: null,
      highlight: null
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
        { playerId: "krigor", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "rodrigo-p", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "augusto", team: "azul" },
        { playerId: "milica", team: "azul" },
        { playerId: "milica", team: "azul" },
        { playerId: "alef", team: "azul" }
      ],
      interview: null,
      highlight: null
    },
    {
      round: 9,
      date: "17/05/2026",
      time: "10:00",
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 9, vermelho: 1 },
      mvp: "krigor",
      teamAzul: ["vinicius", "cabelo", "thiago", "chico", "alexandre", "wesley", "rodrigo-costa", "adler", "marcelo", "krigor"],
      teamVermelho: ["edu", "biro","germano", "ivan", "erig", "gabriel", "iago", "augusto", "rodrigo-p", "alef"],
      scorers: [
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "wesley", team: "azul" },
        { playerId: "wesley", team: "azul" },
        { playerId: "chico", team: "azul" },
        { playerId: "rodrigo-costa", team: "azul" },
        { playerId: "rodrigo-costa", team: "azul" },
        { playerId: "alef", team: "vermelho" },
      ],
      assists: [
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "alexandre", team: "azul" },
        { playerId: "wesley", team: "azul" },
        { playerId: "wesley", team: "azul" },
        { playerId: "thiago", team: "azul" },
        { playerId: "adler", team: "azul" },
        { playerId: "chico", team: "azul" }
      ],
      interview: null,
      highlight: null
    },
    {
      round: 10,
      date: "23/05/2026",
      time: "09:00",
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 4, vermelho: 4 },
      mvp: "milica",
      teamAzul: ["milica", "germano", "alemao", "alexandre", "gabriel", "vander", "augusto", "alef", "weslley", {guest: true, name: "Adrian", position: "Ponta", number: 20}],
      teamVermelho: [{guest: true, name: "Goleiro de Aluguel", position: "goleiro", number: 1}, "cabelo","thiago", "wesley", "erig", "marcelo", "iago", "keke", "jederson", "filipe", "anderson"],
      scorers: [
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "jederson", team: "vermelho" },
        { playerId: "weslley", team: "azul" },
        { playerId: "weslley", team: "azul" },
        { playerId: "weslley", team: "azul" },
        { playerId: "alef", team: "azul" }
      ],
      assists: [
        { playerId: "gabriel", team: "azul" },
        { playerId: "germano", team: "azul" },
        { playerId: "alemao", team: "azul" },
        { playerId: "filipe", team: "vermelho" },
        { playerId: "filipe", team: "vermelho" },
        { playerId: "anderson", team: "vermelho" },
        { playerId: "erig", team: "vermelho" }
      ],
      interview: null,
      highlight: null
    },
    {
      round: 11,
      date: "06/06/2026",
      time: "10:00",
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 4, vermelho: 12 },
      mvp: "edu",
      teamAzul: ["miliquinha", "cabelo", "alemao", "thiago", "gabriel", "krigor", "rodrigo-p", "rodrigo-costa", "chico", {guest: true, name: "Eder", position: "Meia", number: 333}],
      teamVermelho: ["edu", "biro","germano", "wesley", "milica", "marcelo", "anderson", "jederson", "adler", "gustavo"],
      scorers: [
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "wesley", team: "vermelho" },
        { playerId: "jederson", team: "vermelho" },
        { playerId: "jederson", team: "vermelho" },
        { playerId: "anderson", team: "vermelho" },
        { playerId: "anderson", team: "vermelho" },
        { playerId: "adler", team: "vermelho" },
        { playerId: "adler", team: "vermelho" },
        { playerId: "gustavo", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "gabriel", team: "azul" },
        { playerId: "gabriel", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" }
      ],
      assists: [
        { playerId: "gabriel", team: "azul" },
        { playerId: "alemao", team: "azul" },
        { playerId: "krigor", team: "azul" },
        { playerId: "anderson", team: "vermelho" },
        { playerId: "biro", team: "vermelho" },
        { playerId: "biro", team: "vermelho" },
        { playerId: "biro", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "wesley", team: "vermelho" },
        { playerId: "wesley", team: "vermelho" },
        { playerId: "wesley", team: "vermelho" }
      ],
      interview: null,
      highlight: null
    },
    {
      round: 12,
      date: "13/06/2026",
      time: "10:00",
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 5, vermelho: 3 },
      mvp: "silvio",
      teamAzul: ["silvio", "germano", "ivan", "erig", "iago", "wesley", "augusto", "marcelo", "jederson", "chico"],
      teamVermelho: ["vinicius", "milica","thiago", "rodrigo-costa", "gabriel", "anderson", "adler", "biro", "jean", "weslley"],
      scorers: [
        { playerId: "weslley", team: "vermelho" },
        { playerId: "weslley", team: "vermelho" },
        { playerId: "adler", team: "vermelho" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "jederson", team: "azul" },
        { playerId: "germano", team: "azul" },
        { playerId: "chico", team: "azul" }
      ],
      assists: [
        { playerId: "wesley", team: "azul" },
        { playerId: "wesley", team: "azul" },
        { playerId: "augusto", team: "azul" },
        { playerId: "jederson", team: "azul" },
        { playerId: "biro", team: "vermelho" },
        { playerId: "anderson", team: "vermelho" }
      ],
      interview: {  youtubeId: "D8KiHd1JiHg",  // código do vídeo NORMAL (não Shorts)
      players: [
    { team: "azul",     playerId: "wesley", playerName: null },
    { team: "vermelho", playerId: "milica",   playerName: null }
  ]
},
      highlight: null
    },
    {
      round: 13,
      date: "20/06/2026",
      time: "10:00",
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 4, vermelho: 6 },
      mvp: "miliquinha",
      teamAzul: [{guest: true, name: "João", position: "Goleiro", number: 1}, "germano", "ivan", "thiago", "adler", "krigor", "augusto", "marcelo", "baracy", "biro"],
      teamVermelho: ["vinicius", "milica","miliquinha", {guest: true, name: "Rodrigo", position: "Meia", number: 333}, "gabriel", "chico", "filipe", {guest: true, name: "Rafael Nascimento", position: "Ala", number: 0}, {guest: true, name: "Adrian", position: "Ponta", number: 20}],
      scorers: [
        { playerId: "gabriel", team: "vermelho" },
        { playerId: "vinicius", team: "vermelho" },
        { playerId: "chico", team: "vermelho" },
        { playerId: "milica", team: "vermelho" },
        { playerId: "filipe", team: "vermelho" },        
        { guestName: "Rodrigo", team: "vermelho" },
        { playerId: "krigor", team: "azul" },
        { playerId: "krigor", team: "azul" },
        { playerId: "marcelo", team: "azul" },
        { playerId: "adler", team: "azul" }
      ],
      assists: [
        { playerId: "biro", team: "azul" },
        { playerId: "thiago", team: "azul" },
        { playerId: "augusto", team: "azul" },
        { playerId: "gabriel", team: "vermelho" },
        { guestName: "Adrian", team: "vermelho" }
      ],
      interview: {  youtubeId: "EU079MPwSv0",  // código do vídeo NORMAL (não Shorts)
      players: [
    { team: "azul",     playerId: "baracy", playerName: null },
    { team: "vermelho", playerId: "vinicius",   playerName: null }
  ]
},
      highlight: null //{ youtubeId: "OUTRO_CODIGO" }  // ou null se não houver highlights
    },
    {
      round: 14,
      date: "27/06/2026",
      time: "10:00",
      location: { venue: "MCM ESPORTES - Porto Seco", address: "Av. Francisco Silveira Bitencourt, 1035 - Sarandi, Porto Alegre - RS" },
      result: { azul: 3, vermelho: 3 },
      mvp: "vinicius",
      teamAzul: ["milica", "krigor", "rodrigo-costa", "rodrigo-p", "iago", "jederson", "filipe", {guest: true, name: "Rafael Nascimento", position: "Ala", number: 0}, {guest: true, name: "Eder", position: "Fixo", number: 333}],
      teamVermelho: ["vinicius", "ivan","germano", "gabriel", "wesley", "marcelo", "valdir", {guest: true, name: "Bruno", position: "Centroavante", number: 20},],
      scorers: [
        { playerId: "gabriel", team: "vermelho" },
        { playerId: "wesley", team: "vermelho" },
        { playerId: "marcelo", team: "vermelho" },
        { playerId: "filipe", team: "azul" },
        { playerId: "rodrigo-costa", team: "azul" },
        { guestName: "Eder (contra)", team: "azul" }
      ],
      assists: [
        { playerId: "milica", team: "azul" },
        { playerId: "rodrigo-p", team: "azul" },
        { playerId: "gabriel", team: "vermelho" },
        { playerId: "wesley", team: "vermelho" },
        { guestName: "Bruno", team: "vermelho" }
      ],
      interview: {  youtubeId: "DGYc2spRLKQ",  // código do vídeo NORMAL (não Shorts)
      players: [
    { team: "azul",     playerId: "iago", playerName: null },
    { team: "vermelho", playerId: "valdir",   playerName: null }
  ]
},
      highlight: null //{ youtubeId: "OUTRO_CODIGO" }  // ou null se não houver highlights
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
      ],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      ],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      injury: { name: "Controle da carga", returnDate: "25/10/2026" },
      injuredRounds: [11,12,13,14],
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
    },
    {
      id: "germano",
      name: "Germano",
      fullName: "Germano Luiz Brites de Araujo",
      nickname: null,
      number: { uni1: 4, uni2: 4 },
      position: "Fixo",
      foot: "Direito",
      birthDate: "08/02/1976",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1976, idade atual: 50 anos)
      photo: {
        uni1: "img/players/germano-azul.png", 
        uni2: "img/players/germano-vermelho.png"
      },
      injury: null,
      awards: [
        { year: 2025, title: "Melhor Zagueiro", icon: "🥇" }
      ],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      injury: { name: "Lesão na lombar", returnDate: "Sem previsão" },
      injuredRounds: [14],
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
    },
    {
      id: "cabelo",
      name: "Wellerson 'Cabelo' Souza",
      fullName: "Wellerson Souza",
      nickname: "Cabelo",
      number: { uni1: 2, uni2: 2 },
      position: "Fixo",
      foot: "Direito",
      birthDate: "16/11/1996",        // DD/MM/AAAA — data de nascimento (não informada)
      photo: {
        uni1: "img/players/cabelo-azul.png", 
        uni2: "img/players/cabelo-vermelho.png"
      },
      injury: null,
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      //injury: { name: "Distensão muscular do adutor direito", returnDate: "13/06/2026" },
      injuredRounds: [10, 11],
      awards: [
        { year: 2025, title: "Melhor Goleiro", icon: "🧤" }
      ],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      ],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      ],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
    },
    /*{
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
    },*/
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
    },
    {
      id: "vander",
      name: "Vander Souza",
      fullName: "Vanderson Souza da Silva",
      nickname: "Vander",
      number: { uni1: 90, uni2: 90 },
      position: "Meia",
      foot: "Direito",
      birthDate: "31/05/1990",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1991, idade atual: 35 anos)
      photo: {
        uni1: "img/players/vander-azul.png", 
        uni2: "img/players/vander-vermelho.png"
      },
      injury: null,
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      injury: { name: "Entorse no tornozelo", returnDate: "15/07/2026" },
      injuredRounds: [12,13,14],
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      injury: { name: "Lesão ligamentar do joelho", returnDate: "15/09/2026" },
      injuredRounds: [13,14],
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      ],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      injuredRounds: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
    },
    {
      id: "chico",
      name: "Diego 'Chico'",
      fullName: "Diego Mezetti Terra",
      nickname: "Chico",
      number: { uni1: 8, uni2: 8 },
      position: "Fixo",
      foot: "Direito",
      birthDate: "13/01/1981",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1981, idade atual: 45 anos)
      photo: {
        uni1: "img/players/chico-azul.png", 
        uni2: "img/players/chico-vermelho.png"
      },
      injury: null,
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
    },
    {
      id: "thiago",
      name: "Thiago Leite",
      fullName: "Thiago Leite",
      nickname: null,
      number: { uni1: 90, uni2: 90 },
      position: "Fixo",
      foot: "Direito",
      birthDate: "01/06/1990",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1991, idade atual: 35 anos)
      photo: {
        uni1: "img/players/thiago-azul.png", 
        uni2: "img/players/thiago-vermelho.png"
      },
      injury: null,
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
    },
    {
      id: "jederson",
      name: "Jéderson",
      fullName: "Jéderson dos Santos Ablo",
      nickname: "Jéder",
      number: { uni1: "11", uni2: "11"},
      position: "Ponta",
      foot: "Esquerdo",
      birthDate: "15/05/1993",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1985, idade atual: 41 anos)
      photo: {
        uni1: null, 
        uni2: null, 
      },
      injury: null,
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
    },
    {
      id: "anderson",
      name: "Anderson",
      fullName: "Anderson Carvalho da Silva",
      nickname: "Calcinha",
      number: { uni1: "87", uni2: "99" },
      position: "Centroavante",
      foot: "Direito",
      birthDate: "27/04/1987",        // DD/MM/AAAA — preencha a data real (nascido aprox. em 1985, idade atual: 41 anos)
      photo: {
        uni1: null, 
        uni2: null,
      },
      injury: null,
      awards: [],
      attributes: {
        // ── Atributos detalhados por grupo (escala 1–10) ──────────────────────
        // Preencha cada atributo individualmente. As médias dos grupos são
        // calculadas automaticamente e exibidas no gráfico radar do perfil.
        // Deixe null enquanto o valor não tiver sido avaliado.
        ritmo: {
          aceleracao:    null, // Aceleração
          pique:         null, // Pique (Sprint)
          recomposicao:  null, // Recomposição
        },
        finalizacao: {
          posicionamento:    null, // Posicionamento
          precisao:          null, // Precisão
          forcaChute:        null, // Força do Chute
          chuteLongo:        null, // Chute Longo
          precCabeceio:      null, // Prec. de Cabeceio
          penalti:           null, // Pênalti
        },
        passe: {
          visao:        null, // Visão
          dominio:      null, // Domínio
          nocaoTatica:  null, // Noção tática
          passeCurto:   null, // Passe Curto
          passeLongo:   null, // Passe Longo
        },
        drible: {
          agilidade:      null, // Agilidade
          equilibrio:     null, // Equilíbrio
          reacao:         null, // Reação
          controleBola:   null, // Controle de Bola
          conducao:       null, // Condução
          compostura:     null, // Compostura
        },
        defesa: {
          interceptacao:    null, // Interceptação
          saidaPressao:     null, // Saída sob pressão
          precCabeceio:     null, // Prec. de Cabeceio
          nocaoDefensiva:   null, // Noção Defensiva
          dividida:         null, // Dividida em Pé
          carrinho:         null, // Carrinho
        },
        fisico: {
          impulsao:      null, // Impulsão
          folego:        null, // Fôlego
          forca:         null, // Força
          agressividade: null, // Agressividade
        },
      },
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

/**
 * Retorna a lista de rodadas em que o atleta foi eleito MVP,
 * ordenadas da mais recente para a mais antiga.
 * Cada item: { round, date }
 */
function getMvpRounds(playerId) {
  return SRDS.matches
    .filter(m => m.mvp === playerId)
    .map(m => ({ round: m.round, date: m.date }))
    .sort((a, b) => b.round - a.round);
}

/**
 * Analisa o histórico de partidas e retorna os "parceiros de elenco" de um atleta:
 * companheiros de TIME (mesmo lado), nunca adversários.
 *
 * Retorna { topJogou, topVenceu, topPerdeu } — cada um no formato:
 *   { player, partidasJuntos, vitoriasJuntos, derrotasJuntos, empatesJuntos }
 *   ou null se não houver dados suficientes (mínimo de 2 partidas juntos).
 *
 * Guests (atletas avulsos sem cadastro) são ignorados — só conta companheiros
 * que têm perfil próprio no elenco.
 */
function getElencoPartners(playerId, minPartidas = 2) {
  const disputadas = SRDS.matches.filter(m => m.result !== null);
  const partnerStats = {}; // { partnerId: { partidas, vitorias, derrotas, empates } }

  disputadas.forEach(m => {
    const inAzul = (m.teamAzul || []).includes(playerId);
    const inVerm = (m.teamVermelho || []).includes(playerId);
    if (!inAzul && !inVerm) return; // atleta não jogou esta rodada

    const meuTime = inAzul ? (m.teamAzul || []) : (m.teamVermelho || []);
    const azulWin  = m.result.azul > m.result.vermelho;
    const vermWin  = m.result.vermelho > m.result.azul;
    const empate   = m.result.azul === m.result.vermelho;

    let resultado; // 'vitoria' | 'derrota' | 'empate'
    if (empate) resultado = 'empate';
    else if (inAzul && azulWin) resultado = 'vitoria';
    else if (inVerm && vermWin) resultado = 'vitoria';
    else resultado = 'derrota';

    meuTime.forEach(entry => {
      // Ignora guests (objetos) e o próprio atleta
      if (typeof entry !== 'string' || entry === playerId) return;

      if (!partnerStats[entry]) {
        partnerStats[entry] = { partidas: 0, vitorias: 0, derrotas: 0, empates: 0 };
      }
      partnerStats[entry].partidas++;
      if (resultado === 'vitoria') partnerStats[entry].vitorias++;
      else if (resultado === 'derrota') partnerStats[entry].derrotas++;
      else partnerStats[entry].empates++;
    });
  });

  // Monta lista de parceiros elegíveis (mínimo de partidas juntos)
  const partners = Object.keys(partnerStats)
    .filter(id => partnerStats[id].partidas >= minPartidas)
    .map(id => ({
      player: getPlayerById(id),
      partidasJuntos:  partnerStats[id].partidas,
      vitoriasJuntos:  partnerStats[id].vitorias,
      derrotasJuntos:  partnerStats[id].derrotas,
      empatesJuntos:   partnerStats[id].empates,
    }))
    .filter(p => p.player); // remove caso o ID não exista mais no elenco

  if (partners.length === 0) {
    return { topJogou: null, topVenceu: null, topPerdeu: null };
  }

  // ── Top "jogou junto" — mais partidas, desempate por nome ──
  const topJogou = [...partners].sort((a, b) =>
    b.partidasJuntos - a.partidasJuntos || a.player.name.localeCompare(b.player.name, 'pt-BR')
  )[0];

  // ── Top "venceu junto" — mais vitórias, desempate por % de aproveitamento, depois nome ──
  const comVitorias = partners.filter(p => p.vitoriasJuntos > 0);
  const topVenceu = comVitorias.length
    ? [...comVitorias].sort((a, b) => {
        if (b.vitoriasJuntos !== a.vitoriasJuntos) return b.vitoriasJuntos - a.vitoriasJuntos;
        const pctA = a.vitoriasJuntos / a.partidasJuntos;
        const pctB = b.vitoriasJuntos / b.partidasJuntos;
        if (pctB !== pctA) return pctB - pctA;
        return a.player.name.localeCompare(b.player.name, 'pt-BR');
      })[0]
    : null;

  // ── Top "perdeu junto" — mais derrotas, desempate por % de derrotas, depois nome ──
  const comDerrotas = partners.filter(p => p.derrotasJuntos > 0);
  const topPerdeu = comDerrotas.length
    ? [...comDerrotas].sort((a, b) => {
        if (b.derrotasJuntos !== a.derrotasJuntos) return b.derrotasJuntos - a.derrotasJuntos;
        const pctA = a.derrotasJuntos / a.partidasJuntos;
        const pctB = b.derrotasJuntos / b.partidasJuntos;
        if (pctB !== pctA) return pctB - pctA;
        return a.player.name.localeCompare(b.player.name, 'pt-BR');
      })[0]
    : null;

  return { topJogou, topVenceu, topPerdeu };
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

/**
 * getRadarData(playerId)
 * Calcula os valores médios de cada grupo de atributos para exibição
 * no gráfico radar (hexagonal) do perfil do atleta.
 *
 * Retorna um array de 6 objetos na ordem do radar:
 *   { key, label, value, hasData }
 *   value  : média do grupo (0–10), arredondada para 1 decimal
 *   hasData: true se ao menos 1 atributo do grupo foi preenchido (≠ null)
 *
 * Se NENHUM grupo tiver dados, retorna null (o gráfico não é exibido).
 */
function getRadarData(playerId) {
  const p = getPlayerById(playerId);
  if (!p || !p.attributes) return null;
  const a = p.attributes;

  function groupAvg(obj) {
    if (!obj) return { value: 0, hasData: false };
    const vals = Object.values(obj).filter(v => v !== null && !isNaN(v));
    if (vals.length === 0) return { value: 0, hasData: false };
    return { value: Math.round((vals.reduce((s, v) => s + v, 0) / vals.length) * 10) / 10, hasData: true };
  }

  const groups = [
    { key: 'finalizacao', label: 'FINALIZAÇÃO',  ...groupAvg(a.finalizacao) }, // topo — mais espaço horizontal
    { key: 'passe',       label: 'PASSE',        ...groupAvg(a.passe)       },
    { key: 'drible',      label: 'DRIBLE',       ...groupAvg(a.drible)      },
    { key: 'defesa',      label: 'DEFESA',       ...groupAvg(a.defesa)      },
    { key: 'fisico',      label: 'FÍSICO',       ...groupAvg(a.fisico)      },
    { key: 'ritmo',       label: 'RITMO',        ...groupAvg(a.ritmo)       }, // posição 5 (canto superior esq.)
  ];

  // Só exibe o gráfico se pelo menos um grupo tiver dados
  const anyData = groups.some(g => g.hasData);
  return anyData ? groups : null;
}
