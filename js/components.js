/**
 * SRDS FC — Componentes compartilhados
 * Injeta header e footer em todas as páginas.
 */

function renderHeader(activePage) {
  const pages = [
    { href: 'index.html',         label: 'Tabela' },
    { href: 'gols.html',          label: 'Gols' },
    { href: 'assistencias.html',  label: 'Assistências' },
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

  // Hamburger toggle
  const btn = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('navDrawer');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    drawer.classList.toggle('open');
  });
  // Close on link click
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
        <a href="index.html" class="footer-link">Tabela</a>
        <a href="gols.html" class="footer-link">Gols</a>
        <a href="assistencias.html" class="footer-link">Assistências</a>
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

/* ── Logo real do SRDS FC ── */
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

/* Avatar SVG silhouette for players without photo */
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
