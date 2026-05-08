/**
 * SRDS FC — Componentes compartilhados v1.1
 */

function renderHeader(activePage) {
  const pages = [
    { href: 'tabela.html',        label: 'Tabela' },
    { href: 'gols.html',          label: 'Gols' },
    { href: 'assistencias.html',  label: 'Assistências' },
    { href: 'partidas.html',      label: 'Partidas' },
    { href: 'patrocinadores.html',label: 'Patrocinadores' },
  ];

  const links = pages.map(p => {
    const isActive = p.href === activePage ? ' active' : '';
    return `<a href="${p.href}" class="nav-link${isActive}">${p.label}</a>`;
  }).join('');

  const drawerLinks = pages.map(p => {
    const isActive = p.href === activePage ? ' active' : '';
    return `<a href="${p.href}" class="nav-link${isActive}">${p.label}</a>`;
  }).join('');

  document.querySelector('header.site-header').innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="site-logo">
        ${getCrestSVG(36)}
        <div class="site-logo-text">
          <span class="club-name">SRDS FC</span>
          <span class="season-badge">Temporada ${SRDS.club.season}</span>
        </div>
      </a>
      <nav class="nav-links">${links}</nav>
      <a href="https://instagram.com/${SRDS.club.instagram}" target="_blank" rel="noopener" class="nav-instagram" style="display:flex">
        ${instagramIcon()}
        @${SRDS.club.instagram}
      </a>
      <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <nav class="nav-drawer" id="navDrawer">
      ${drawerLinks}
      <a href="https://instagram.com/${SRDS.club.instagram}" target="_blank" rel="noopener" class="nav-instagram">
        ${instagramIcon()} @${SRDS.club.instagram}
      </a>
    </nav>
  `;

  const btn = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('navDrawer');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    drawer.classList.toggle('open');
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { btn.classList.remove('open'); drawer.classList.remove('open'); });
  });
}

function renderFooter() {
  const year = new Date().getFullYear();
  document.querySelector('footer.site-footer').innerHTML = `
    <div class="footer-inner">
      <div>
        <div class="footer-brand">SRDS FC</div>
        <div class="footer-sub">Porto Alegre, RS · Temporada ${SRDS.club.season}</div>
      </div>
      <div class="footer-links">
        <a href="tabela.html" class="footer-link">Tabela</a>
        <a href="gols.html" class="footer-link">Gols</a>
        <a href="assistencias.html" class="footer-link">Assistências</a>
        <a href="partidas.html" class="footer-link">Partidas</a>
        <a href="https://instagram.com/${SRDS.club.instagram}" target="_blank" rel="noopener" class="footer-link" style="color:var(--ouro)">
          Instagram
        </a>
      </div>
    </div>
    <div class="footer-copyright">
      © ${year} SRDS FC · Site desenvolvido por <strong>Gabriel Teles</strong> · Todos os direitos reservados
    </div>
  `;
}

function getCrestSVG(size = 44) {
  return `<img src="img/logo/logo-srds2.png" alt="SRDS FC" class="header-logo-img" style="width:${size}px;height:${size}px;object-fit:contain;flex-shrink:0;">`;
}

function getCrestSVGFull() {
  return `<img src="img/logo/logo-srds2.png" alt="SRDS FC" class="hero-logo-img">`;
}

function instagramIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>`;
}

function chevronLeft() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>`;
}

function chevronRight() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>`;
}

function avatarSVG(color = '#c99f40') {
  return `<svg class="avatar-silhouette" viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="45" cy="28" rx="18" ry="20" fill="${color}" opacity="0.3"/>
    <path d="M8 105 Q8 65 45 65 Q82 65 82 105" fill="${color}" opacity="0.3"/>
    <ellipse cx="45" cy="28" rx="18" ry="20" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.5"/>
    <path d="M8 105 Q8 65 45 65 Q82 65 82 105" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.5"/>
  </svg>`;
}

function rankSuffix(n) {
  return n === 1 ? '1º' : n === 2 ? '2º' : n === 3 ? '3º' : `${n}º`;
}

/**
 * Calcula o movimento de posição de cada jogador comparando o ranking
 * atual (todas as rodadas) com o ranking da rodada anterior (excluindo a última).
 *
 * @param {'standings'|'goals'|'assists'} type - qual ranking calcular
 * @returns {Object} Mapa { playerId: { diff: number, label: string } }
 *   diff > 0 → subiu (ex: diff=2 → subiu 2 posições)
 *   diff < 0 → desceu
 *   diff = 0 → manteve
 *   diff = null → novo no ranking (não jogou na rodada anterior)
 */
function getRankingMovement(type) {
  const rodadasComResultado = SRDS.matches.filter(m => m.result !== null);

  // Se houver menos de 2 rodadas disputadas, não há comparação possível
  if (rodadasComResultado.length < 2) {
    return {};
  }

  // Última rodada disputada
  const ultimaRodada = rodadasComResultado[rodadasComResultado.length - 1];

  // Calcula stats de um jogador apenas considerando partidas de uma lista específica
  function computeStatsFromMatches(playerId, matchList) {
    let matches = 0, goals = 0, assists = 0, points = 0;
    matchList.forEach(m => {
      const inAzul = (m.teamAzul || []).includes(playerId);
      const inVerm = (m.teamVermelho || []).includes(playerId);
      if (!inAzul && !inVerm) return;
      matches++;
      const azulWin = m.result.azul > m.result.vermelho;
      const vermWin = m.result.vermelho > m.result.azul;
      const empate  = m.result.azul === m.result.vermelho;
      if (empate)              points += 1;
      else if (inAzul && azulWin) points += 3;
      else if (inVerm && vermWin) points += 3;
      (m.scorers || []).forEach(ev => { if (ev.playerId === playerId) goals++; });
      (m.assists || []).forEach(ev => { if (ev.playerId === playerId) assists++; });
    });
    return { matches, goals, assists, points };
  }

  // Função de ordenação para cada tipo
  function sortPlayers(playerList, matchList) {
    const disputadas = matchList.length;
    return [...playerList].map(p => {
      const cs = computeStatsFromMatches(p.id, matchList);
      return { ...p, stats: cs };
    }).sort((a, b) => {
      if (type === 'standings') {
        if (b.stats.points !== a.stats.points) return b.stats.points - a.stats.points;
        const freqA = disputadas > 0 ? a.stats.matches / disputadas : 0;
        const freqB = disputadas > 0 ? b.stats.matches / disputadas : 0;
        if (Math.abs(freqB - freqA) > 0.0001) return freqB - freqA;
        const gaA = a.stats.goals + a.stats.assists;
        const gaB = b.stats.goals + b.stats.assists;
        if (gaB !== gaA) return gaB - gaA;
        if (b.stats.goals !== a.stats.goals) return b.stats.goals - a.stats.goals;
        return a.name.localeCompare(b.name, 'pt-BR');
      } else if (type === 'goals') {
        if (b.stats.goals !== a.stats.goals) return b.stats.goals - a.stats.goals;
        const avgA = a.stats.matches > 0 ? a.stats.goals / a.stats.matches : 0;
        const avgB = b.stats.matches > 0 ? b.stats.goals / b.stats.matches : 0;
        if (Math.abs(avgB - avgA) > 0.0001) return avgB - avgA;
        return a.name.localeCompare(b.name, 'pt-BR');
      } else { // assists
        if (b.stats.assists !== a.stats.assists) return b.stats.assists - a.stats.assists;
        const avgA = a.stats.matches > 0 ? a.stats.assists / a.stats.matches : 0;
        const avgB = b.stats.matches > 0 ? b.stats.assists / b.stats.matches : 0;
        if (Math.abs(avgB - avgA) > 0.0001) return avgB - avgA;
        return a.name.localeCompare(b.name, 'pt-BR');
      }
    });
  }

  // Ranking ATUAL (todas as rodadas disputadas)
  const rankingAtual = sortPlayers(SRDS.players, rodadasComResultado);

  // Ranking ANTERIOR (excluindo a última rodada)
  const rodadasAnteriores = rodadasComResultado.slice(0, -1);
  const rankingAnterior   = sortPlayers(SRDS.players, rodadasAnteriores);

  // Identifica jogadores que participaram da última rodada
  const jogadoramNaUltima = new Set([
    ...(ultimaRodada.teamAzul    || []).filter(e => typeof e === 'string'),
    ...(ultimaRodada.teamVermelho || []).filter(e => typeof e === 'string'),
  ]);

  // Monta mapa de posições anteriores { playerId: rank }
  const posAnterior = {};
  rankingAnterior.forEach((p, i) => {
    // Só considera quem tinha ao menos 1 partida antes da última rodada
    if (computeStatsFromMatches(p.id, rodadasAnteriores).matches > 0) {
      posAnterior[p.id] = i + 1;
    }
  });

  // Compara posições
  const resultado = {};
  rankingAtual.forEach((p, i) => {
    const posAtual = i + 1;
    const posAnt   = posAnterior[p.id];

    // Se não havia jogado antes (estreante nas estatísticas), não exibe indicador
    if (posAnt === undefined) {
      resultado[p.id] = { diff: null };
    } else {
      const diff = posAnt - posAtual; // positivo = subiu, negativo = desceu
      resultado[p.id] = { diff };
    }
  });

  return resultado;
}

/**
 * Gera o HTML do indicador de movimento de posição.
 * @param {{ diff: number|null }} mov
 * @returns {string} HTML da badge
 */
function renderMovementBadge(mov) {
  if (!mov || mov.diff === null) return '';
  if (mov.diff > 0) {
    return `<span class="rank-movement rank-up" title="Subiu ${mov.diff} posição${mov.diff > 1 ? 'ões' : ''}">▲${mov.diff}</span>`;
  } else if (mov.diff < 0) {
    const n = Math.abs(mov.diff);
    return `<span class="rank-movement rank-down" title="Caiu ${n} posição${n > 1 ? 'ões' : ''}">▼${n}</span>`;
  } else {
    return `<span class="rank-movement rank-same" title="Mesma posição">—</span>`;
  }
}
