# ⚽ SRDS FC — Plataforma Oficial de Estatísticas

<div align="center">

![Status](https://img.shields.io/badge/status-online-brightgreen?style=for-the-badge)
![Versão](https://img.shields.io/badge/versão-1.0-c99f40?style=for-the-badge)
![Hospedagem](https://img.shields.io/badge/hospedagem-GitHub%20Pages-192a3e?style=for-the-badge&logo=github)
![Licença](https://img.shields.io/badge/licença-MIT-9e2e46?style=for-the-badge)
![Mobile](https://img.shields.io/badge/mobile-first-ead186?style=for-the-badge)

<br/>

**Plataforma digital oficial do SRDS FC — estatísticas, rankings e perfis dos atletas da temporada 2026.**

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
- [Deploy](#-deploy)
- [Roadmap](#-roadmap)
- [Autor](#-autor)

---

## 🏟️ Sobre o Projeto

O **SRDS FC** nasceu em 2024 como um grupo de amigos unidos pela paixão pelo futebol em Porto Alegre, RS. Em dois anos, o clube evoluiu de um jogo informal para uma organização estruturada — com uniformes personalizados, filmagens profissionais, equipamentos próprios e perfis oficiais nas redes sociais.

Esta plataforma é o próximo passo dessa evolução: um site oficial completo que centraliza todas as estatísticas do clube, registra a trajetória de cada atleta e posiciona o SRDS FC com a seriedade de uma liga profissional.

> *"O que começou como uma pelada entre amigos virou um clube de verdade."*

---

## ✨ Funcionalidades

- 🏆 **Tabela de Pontuação** — Ranking completo da temporada estilo Premier League, com pontos, gols, assistências e participação em gols (G+A)
- 👤 **Perfil Individual** — Página exclusiva para cada atleta com card giratório 3D mostrando os dois uniformes, estatísticas detalhadas, médias por partida e prêmios conquistados
- ⚽ **Ranking de Gols** — Artilheiros da temporada com barras de progresso visuais
- 🎯 **Ranking de Assistências** — Classificação dos garçons da temporada
- 🤝 **Patrocinadores** — Vitrine oficial dos parceiros do clube com logo e link direto
- 📱 **100% Responsivo** — Experiência otimizada para celular, tablet e desktop
- 🎨 **Identidade Visual** — Cores e tipografia fiel ao brasão oficial do clube
- ⚡ **Zero Dependências** — Sem frameworks, sem bibliotecas externas, sem mensalidades

---

## 🗂️ Páginas

| Página | URL | Descrição |
|--------|-----|-----------|
| Início | `/index.html` | Tabela de pontuação + Sobre o clube + Rodadas |
| Perfil do Atleta | `/jogador.html?id=gabriel` | Perfil individual dinâmico por parâmetro de URL |
| Ranking de Gols | `/gols.html` | Artilheiros da temporada |
| Ranking de Assistências | `/assistencias.html` | Garçons da temporada |
| Patrocinadores | `/patrocinadores.html` | Parceiros oficiais do clube |

---

## 🛠️ Tecnologias

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

</div>

<br/>

| Tecnologia | Uso | Custo |
|---|---|---|
| HTML5 | Estrutura e conteúdo das páginas | Gratuito |
| CSS3 + Custom Properties | Visual, animações e responsividade | Gratuito |
| JavaScript ES6+ | Lógica, rankings e interatividade | Gratuito |
| Google Fonts | Tipografia (Bebas Neue + Barlow) | Gratuito |
| GitHub Pages | Hospedagem web permanente | Gratuito |

---

## 📁 Estrutura de Arquivos

```
srds-fc/
│
├── 📄 index.html              → Página inicial
├── 📄 jogador.html            → Perfil do atleta (dinâmico via ?id=)
├── 📄 gols.html               → Ranking de gols
├── 📄 assistencias.html       → Ranking de assistências
├── 📄 patrocinadores.html     → Página de patrocinadores
├── 📄 CNAME                   → Domínio personalizado
├── 📄 .gitignore              → Arquivos ignorados pelo Git
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
    ├── 📁 players/            → Fotos dos atletas (PNG)
    └── 📁 sponsors/           → Logos dos patrocinadores (PNG)
```

> ⭐ O arquivo `js/data.js` é a única fonte de dados do site. Todas as páginas são alimentadas a partir dele.

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

# 2. Edite o arquivo js/data.js com as novas estatísticas

# 3. Adicione, confirme e envie
git add .
git commit -m "stats: rodada X — DD/MM/AAAA"
git push
```

O site atualiza automaticamente em **1 a 2 minutos** após o push.

### Estrutura de um jogador no data.js

```javascript
{
  id: "gabriel",              // Slug único — NÃO ALTERE após criado
  name: "Gabriel",            // Nome exibido na tabela
  fullName: "Gabriel Teles",  // Nome completo no perfil
  nickname: "G. Teles",       // Apelido (ou null)
  number: { uni1: 97, uni2: 97 }, // Números dos uniformes
  position: "Meia",           // Posição em campo
  foot: "Destro",             // Pé dominante (ou null)
  age: 26,                    // Idade (ou null)
  photo: {
    uni1: "img/players/gabriel-uni1.png",
    uni2: "img/players/gabriel-uni2.png"
  },
  stats: {
    matches: 5,   // Partidas jogadas (acumulado da temporada)
    goals: 4,     // Gols (acumulado)
    assists: 6,   // Assistências (acumulado)
    points: 12    // Pontos (acumulado)
  },
  awards: [
    { year: 2025, title: "Melhor Meia", icon: "🎯" }
  ]
}
```

### Lógica de pontuação

| Resultado | Pontos por atleta |
|-----------|------------------|
| Vitória | +3 pontos |
| Empate | +1 ponto |
| Derrota | 0 pontos |

---

## 🚀 Deploy

O site está hospedado gratuitamente no **GitHub Pages** com domínio personalizado.

```
Repositório  →  github.com/xGabriel-Teles/srds-fc
Site         →  srdsfc.com.br
```

### Configuração do domínio personalizado

Registros DNS configurados no registro.br:

| Tipo | Nome | Valor |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | xgabriel-teles.github.io |

---

## 🗺️ Roadmap

### ✅ v1.0 — Atual
- [x] Tabela de pontuação
- [x] Perfil individual com card flip 3D
- [x] Rankings de gols e assistências
- [x] Página de patrocinadores
- [x] Domínio personalizado (srdsfc.com.br)
- [x] HTTPS ativo
- [x] Layout responsivo mobile-first

### 🔄 v2.0 — Próxima versão
- [ ] Atualização via upload de planilha Excel
- [ ] Integração com Google Sheets
- [ ] Calendário de partidas
- [ ] Histórico de temporadas anteriores (2024 e 2025)
- [ ] Banner "Próxima Partida"

### 🔮 v3.0 — Futuro
- [ ] Sistema de votação para prêmios da temporada
- [ ] Melhor da Partida (MOTM) por rodada
- [ ] Modo tema por uniforme (azul / vermelho)
- [ ] Galeria de fotos e vídeos
- [ ] Comparativo entre jogadores

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
