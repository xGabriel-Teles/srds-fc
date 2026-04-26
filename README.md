# ⚽ SRDS FC — Plataforma Oficial de Estatísticas

<div align="center">

![Status](https://img.shields.io/badge/status-online-brightgreen?style=for-the-badge)
![Versão](https://img.shields.io/badge/versão-1.14.1-c99f40?style=for-the-badge)
![Hospedagem](https://img.shields.io/badge/hospedagem-GitHub%20Pages-192a3e?style=for-the-badge&logo=github)
![Mobile](https://img.shields.io/badge/mobile-first-ead186?style=for-the-badge)
![SEO](https://img.shields.io/badge/SEO-otimizado-4caf50?style=for-the-badge)

<br/>

**Plataforma digital oficial do SRDS FC — estatísticas, rankings, partidas e perfis dos atletas da temporada 2026.**

🌐 **[srdsfc.com.br](https://srdsfc.com.br)**

<br/>

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Páginas](#-páginas)
- [Tecnologias](#-tecnologias)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Identidade Visual](#-identidade-visual)
- [Como Atualizar](#-como-atualizar)
- [Estrutura de Dados](#-estrutura-de-dados)
- [Deploy](#-deploy)
- [SEO e Analytics](#-seo-e-analytics)
- [Roadmap](#-roadmap)
- [Autor](#-autor)

---

## 🏟️ Sobre o Projeto

O **SRDS FC** nasceu em 2024 como um grupo de amigos unidos pela paixão pelo futebol em Porto Alegre, RS. Em dois anos, o clube evoluiu de um jogo informal para uma organização estruturada — com uniformes personalizados, filmagens profissionais, equipamentos próprios e perfis oficiais nas redes sociais.

Esta plataforma é o próximo passo dessa evolução: um site oficial completo que centraliza todas as estatísticas do clube, registra a trajetória de cada atleta e posiciona o SRDS FC com a seriedade de uma liga profissional.

> *"O que começou como uma pelada entre amigos virou um clube de verdade."*

---

## ✨ Funcionalidades

### Estatísticas e Rankings
- 🏆 **Tabela de Pontuação** — Ranking estilo Premier League com filtro por posição. Critérios de desempate: pontos → frequência → G+A → gols → nome
- ⚽ **Ranking de Gols** — Artilheiros com filtro por posição e desempate por média por partida
- 🎯 **Ranking de Assistências** — Garçons com filtro por posição e desempate por média por partida
- 📊 **Stats automáticos** — Partidas, gols, assistências e pontos calculados diretamente das partidas registradas, sem editar jogador por jogador

### Perfil do Atleta
- 👤 **Card 3D girável** — Dois uniformes (Azul e Vermelho) com foto real ou silhueta
- 📊 **Posição nos rankings** — Container indicando a colocação em Pontos, Gols e Assistências
- 📈 **Médias por partida** — Gols/partida, Assistências/partida e Participação/partida (automáticas)
- 🏅 **Aproveitamento e Frequência** — Com cores dinâmicas (verde/amarelo/vermelho)
- 🏆 **MVP count** — Card de prêmio com badge `2x`, `3x` quando aplicável
- 🎂 **Aniversário** — No dia do aniversário o perfil recebe efeito dourado especial para post no Instagram
- 🚑 **Indicador de lesão** — Banner de alerta com previsão de retorno

### Partidas
- 📅 **Histórico de rodadas** — Cards coloridos por resultado
- 🔍 **Detalhe da partida** — Escalação ordenada por posição, MVP, gols e assistências agrupados
- 📍 **Local com endereço** — Clicável, abre direto no Google Maps
- 🤖 **Atletas avulsos** — Com número, posição e foto padrão
- 📱 **Mobile: abas de times** — Times alternam por abas em celular
- 📤 **Exportar arte** — Gera PNG 1080×1440 px com escalação, placar, MVP e logos dos patrocinadores

### Próxima Partida
- 🗓️ Card especial "Próxima partida" na lista de partidas, com borda dourada tracejada

### Patrocinadores
- 🏠 **Carrossel no index** — Logos em esteira animada contínua, sem borda, imagens maiores
- ⭐ **Tier Master** — Card grande com borda dourada animada, banner lateral e ícones de Instagram/Facebook
- 🥇 **Tier Ouro** — Cards médios lado a lado com logo e informações
- 🥈 **Tier Prata** — Cards compactos em três colunas
- 📬 **Formulário "Seja um Patrocinador"** — Envia proposta via WhatsApp

### Outros
- 📱 **100% Responsivo** — Mobile first
- ⚡ **Zero Dependências** — Sem frameworks, sem bibliotecas, sem mensalidades
- 🔒 **Sanitização de URLs** — Parâmetros `?id=` e `?round=` validados antes do uso

---

## 🗂️ Páginas

| Página | URL | Descrição |
|--------|-----|-----------|
| Início | `/index.html` | Sobre o clube, redes sociais, carrossel de patrocinadores e cards de navegação |
| Tabela | `/tabela.html` | Ranking de pontuação com filtro por posição |
| Perfil do Atleta | `/jogador.html?id=gabriel` | Perfil individual dinâmico |
| Ranking de Gols | `/gols.html` | Artilheiros com filtro por posição |
| Ranking de Assistências | `/assistencias.html` | Garçons com filtro por posição |
| Partidas | `/partidas.html` | Histórico de rodadas com resultados |
| Detalhe da Partida | `/partida.html?round=1` | Escalação, placar, MVP e exportação de arte |
| Patrocinadores | `/patrocinadores.html` | Tiers Master/Ouro/Prata + formulário de interesse |

---

## 🛠️ Tecnologias

| Tecnologia | Uso | Custo |
|---|---|---|
| HTML5 | Estrutura e conteúdo das páginas | Gratuito |
| CSS3 + Custom Properties | Visual, animações e responsividade | Gratuito |
| JavaScript ES6+ | Lógica, rankings e interatividade | Gratuito |
| Google Fonts | Tipografia (Bebas Neue + Barlow) | Gratuito |
| Google Analytics 4 | Monitoramento de acessos | Gratuito |
| GitHub Pages | Hospedagem web permanente | Gratuito |

---

## 📁 Estrutura de Arquivos

```
srds-fc/
│
├── 📄 index.html              → Página inicial
├── 📄 tabela.html             → Tabela de pontuação com filtro por posição
├── 📄 jogador.html            → Perfil do atleta (dinâmico via ?id=)
├── 📄 gols.html               → Ranking de gols com filtro por posição
├── 📄 assistencias.html       → Ranking de assistências com filtro por posição
├── 📄 partidas.html           → Lista de partidas com próxima partida
├── 📄 partida.html            → Detalhe da partida + exportação de arte (via ?round=)
├── 📄 patrocinadores.html     → Tiers de patrocinadores + formulário
├── 📄 sitemap.xml             → Mapa do site para o Google
├── 📄 robots.txt              → Instruções para robôs de busca
├── 📄 CNAME                   → Domínio personalizado
│
├── 📁 css/
│   └── style.css              → Folha de estilos global
│
├── 📁 js/
│   ├── ⭐ data.js             → FONTE DE DADOS — edite aqui
│   └── components.js          → Header, footer e funções auxiliares
│
└── 📁 img/
    ├── 📁 logo/               → Logo oficial do clube
    ├── 📁 players/            → Fotos dos atletas (PNG, nomeadas por id)
    └── 📁 sponsors/           → Logos e banners dos patrocinadores (PNG)
```

> ⭐ O arquivo `js/data.js` é a **única fonte de dados** do site. Para adicionar uma nova rodada, basta editar esse arquivo — todos os stats são recalculados automaticamente.

---

## 🎨 Identidade Visual

| Cor | Hex | Uso |
|-----|-----|-----|
| ![#192a3e](https://placehold.co/15x15/192a3e/192a3e.png) Azul Escuro | `#192a3e` | Background principal |
| ![#c99f40](https://placehold.co/15x15/c99f40/c99f40.png) Dourado | `#c99f40` | Destaque primário, títulos |
| ![#ead186](https://placehold.co/15x15/ead186/ead186.png) Dourado Claro | `#ead186` | Destaque secundário, médias |
| ![#9e2e46](https://placehold.co/15x15/9e2e46/9e2e46.png) Vermelho | `#9e2e46` | Uniforme 2, assistências |
| ![#f0f4f8](https://placehold.co/15x15/f0f4f8/f0f4f8.png) Branco Suave | `#f0f4f8` | Texto principal |
| ![#8a9ab0](https://placehold.co/15x15/8a9ab0/8a9ab0.png) Cinza | `#8a9ab0` | Texto secundário, labels |

**Fontes:** `Bebas Neue` (títulos) · `Barlow Semi Condensed` (stats) · `Barlow` (texto)

---

## 🔄 Como Atualizar

### Rotina após cada rodada

```bash
# 1. Sempre sincronize antes de editar
git pull

# 2. Edite js/data.js — adicione o objeto da nova rodada em matches[]
#    Stats de todos os jogadores são recalculados automaticamente

# 3. Adicione, confirme e envie
git add .
git commit -m "stats: rodada X — DD/MM/AAAA"
git push
```

O site atualiza automaticamente em **1 a 2 minutos** após o push.

---

## 📊 Estrutura de Dados

### Jogador (`players[]`)

```javascript
{
  id: "gabriel",                    // Slug único — NÃO ALTERE após criado
  name: "Gabriel 'Teles'",          // Nome exibido nos rankings
  fullName: "Gabriel Teles Dos Santos", // Nome completo no perfil
  nickname: "Teles",                // Apelido (ou null)
  number: { uni1: 97, uni2: 97 },   // Números dos uniformes
  position: "Ala",                  // Goleiro|Fixo|Ala|Meia|Ponta|Centroavante
  foot: "Direito",                  // Direito|Esquerdo|Ambos|null
  birthDate: "25/04/1997",          // DD/MM/AAAA — idade calculada automaticamente
  photo: {
    uni1: "img/players/gabriel-azul.png",
    uni2: "img/players/gabriel-vermelho.png"
  },
  injury: null,                     // null = sem lesão
  // injury: { name: "Entorse", returnDate: "15/05/2026" }
  awards: [
    { year: 2025, title: "Melhor Meia", icon: "🥇" }
  ]
  // ⚡ stats são calculados automaticamente — não preencher aqui
}
```

### Partida (`matches[]`)

```javascript
{
  round: 7,
  date: "02/05/2026",
  time: "10:00",
  location: {
    venue: "MCM Porto Seco",
    address: "Av. Sertório, 7777 - Porto Alegre, RS"  // abre no Maps
  },
  result: { azul: 5, vermelho: 6 },  // null se não realizada
  mvp: "marcelo",                    // ID do jogador MVP (null se não definido)

  // Escalação: string = ID do jogador | objeto = atleta avulso
  teamAzul: [
    "marcelo",
    { guest: true, name: "Carlos", position: "Ala", number: 20 }
  ],
  teamVermelho: ["vinicius", "jean"],

  // Gols e assistências
  scorers: [
    { playerId: "marcelo", team: "azul" },
    { guestName: "Carlos", team: "azul" }
  ],
  assists: [
    { playerId: "vinicius", team: "vermelho" }
  ]
}
```

### Próxima Partida (`nextMatch`)

```javascript
// Preencha após definir a data da próxima rodada:
nextMatch: {
  round: 8,
  date: "09/05/2026",
  time: "10:00",
  location: { venue: "Soccer City", address: "R. Lauro Müller, 700 - Porto Alegre, RS" }
}
// Para remover o card "Próxima Partida": nextMatch: null
```

### Patrocinador (`sponsors[]`)

```javascript
{
  id: "monello",
  name: "Monello",
  tier: "master",           // "master" | "ouro" | "prata"
  description: "O que define família é o amor.",
  logo: "img/sponsors/monello.png",
  bannerImg: "img/sponsors/monello-banner.png",  // 800×180px — só para tier master
  link: "https://www.instagram.com/monello_oficial/",
  instagram: "https://www.instagram.com/monello_oficial/",
  facebook: null,
  // whatsapp: "5551999999999",  // descomente para exibir ícone de WhatsApp
}
```

### Lógica de pontuação

| Resultado | Pontos por atleta |
|-----------|-------------------|
| Vitória | +3 pontos |
| Empate | +1 ponto |
| Derrota | 0 pontos |

### Critérios de desempate

| Ranking | 1º | 2º | 3º | 4º |
|---------|-----|-----|-----|-----|
| Tabela | Pontos | % Frequência | G+A | Gols |
| Gols | Total | Média/partida | — | Nome |
| Assistências | Total | Média/partida | — | Nome |

---

## 🚀 Deploy

```
Repositório  →  github.com/xGabriel-Teles/srds-fc
Site         →  srdsfc.com.br
```

### Configuração DNS (registro.br)

| Tipo | Nome | Valor |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | xgabriel-teles.github.io |

---

## 🔍 SEO e Analytics

- `<title>` e `<meta description>` únicos por página
- Tags **Open Graph** para preview no WhatsApp e redes sociais
- **Schema.org** com dados estruturados para o Google
- `sitemap.xml` listando todas as páginas públicas
- `robots.txt` autorizando indexação
- **Google Analytics 4** ativo em todas as páginas (ID: `G-PMS5H3L4YL`)

Para indexar: acesse o **Search Console** e envie `https://www.srdsfc.com.br/sitemap.xml`.

---

## 🗺️ Roadmap

### ✅ Implementado (v1.14.1)
- [x] Tabela de pontuação com filtro por posição
- [x] Perfil individual com card flip 3D (dois uniformes)
- [x] Rankings de gols e assistências com filtro por posição
- [x] Stats automáticos calculados das partidas (sem editar jogador por jogador)
- [x] Página de partidas com detalhe completo — escalação, MVP, gols/assists agrupados
- [x] Exportação de arte PNG para redes sociais (1080×1440px)
- [x] Local da partida com endereço clicável (Google Maps)
- [x] Atletas avulsos com número, posição e foto padrão
- [x] MVP da partida com foto no detalhe e na arte exportada
- [x] Card "Próxima Partida" na lista de rodadas
- [x] Indicador de lesão nos rankings e no perfil
- [x] MVP count no perfil do jogador
- [x] Aproveitamento e frequência com cores dinâmicas
- [x] Idade calculada automaticamente via `birthDate` (sem atualização manual)
- [x] Efeito especial de aniversário no perfil (para post no Instagram)
- [x] Filtro por posição nos três rankings
- [x] Seção de redes sociais com métricas do Instagram na home
- [x] Patrocinadores com tiers Master / Ouro / Prata
- [x] Carrossel de patrocinadores na home (sem borda, animação contínua)
- [x] Formulário "Seja um Patrocinador" com envio via WhatsApp
- [x] Banner lateral no card Master + ícones de Instagram/Facebook
- [x] SEO completo (meta tags, Open Graph, Schema.org, sitemap, robots.txt)
- [x] Google Analytics 4
- [x] Domínio personalizado (srdsfc.com.br) com HTTPS
- [x] Layout responsivo mobile-first
- [x] Sanitização de parâmetros de URL (`?id=`, `?round=`)

### 🔄 Próximas versões
- [ ] Modal de patrocinador com descrição longa e galeria de produtos
- [ ] Histórico de temporadas anteriores (2024 e 2025)
- [ ] Sistema de votação para prêmios da temporada
- [ ] Galeria de fotos e vídeos por rodada
- [ ] Comparativo entre jogadores
- [ ] Integração com Google Sheets para atualização simplificada

---

## 👤 Autor

<div align="center">

Desenvolvido por **Gabriel Teles**

[![Instagram](https://img.shields.io/badge/@srds.fc-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/srds.fc)
[![GitHub](https://img.shields.io/badge/xGabriel--Teles-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/xGabriel-Teles)

<br/>

*SRDS FC · Porto Alegre, RS · Fundado em 2024*

</div>

---

<div align="center">

**© 2026 SRDS FC · Todos os direitos reservados**

</div>
