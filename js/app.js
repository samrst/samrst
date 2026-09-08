/* ================================================================
   APP PRINCIPAL
   Router SPA, Sidebar, Acessibilidade, Preferências
   ================================================================ */

const App = {
  /** Usuário logado (simulado) */
  currentUser: {
    name: 'Sam Rodrigues',
    type: 'admin',
    email: 'sam.rodrigues@empresa.com',
  },

  /** Preferências de acessibilidade */
  preferences: {
    highContrast: false,
    avoidStairs: false,
    preferElevators: false,
    largeText: false,
    reduceMotion: false,
  },

  /** Mapeamento de rotas para páginas */
  routes: {
    'login':       { page: LoginPage,       title: 'Login',               icon: 'login',           showSidebar: false },
    'dashboard':   { page: DashboardPage,   title: 'Dashboard',           icon: 'dashboard',       showSidebar: true },
    'registro':    { page: RegistroPage,     title: 'Registrar Demanda',   icon: 'note_add',        showSidebar: true },
    'mapa':        { page: MapaPage,         title: 'Mapa de Acessibilidade', icon: 'map',          showSidebar: true },
    'assistente':  { page: AssistentePage,   title: 'Assistente Virtual',  icon: 'smart_toy',       showSidebar: true },
    'gestao':      { page: GestaoPage,       title: 'Gestão de Demandas',  icon: 'list_alt',        showSidebar: true },
    'relatorios':  { page: RelatoriosPage,   title: 'Relatórios',          icon: 'bar_chart',       showSidebar: true },
  },

  /* ---- Inicialização ---- */
  init() {
    // Carrega preferências salvas
    this._loadPreferences();

    // Escuta mudanças de hash (rota)
    window.addEventListener('hashchange', () => this._onRouteChange());

    // Renderiza a rota inicial
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#login';
    } else {
      this._onRouteChange();
    }
  },

  /* ---- Router ---- */
  _onRouteChange() {
    const hash = window.location.hash.replace('#', '') || 'login';
    this.renderPage(hash);
  },

  /** Renderiza uma página pelo nome da rota */
  renderPage(routeName) {
    const route = this.routes[routeName];
    if (!route) {
      window.location.hash = '#dashboard';
      return;
    }

    const app = document.getElementById('app');
    if (!app) return;

    // Estrutura: sidebar (se aplicável) + conteúdo principal
    if (route.showSidebar) {
      app.innerHTML = `
        ${this._renderSidebar(routeName)}
        <div class="main-content">
          ${this._renderTopbar(route)}
          <div class="page-content">
            ${route.page.render()}
          </div>
        </div>
        ${this._renderPreferencesModal()}
        <div class="toast" id="toast"></div>
      `;
    } else {
      app.className = '';
      app.innerHTML = `
        ${route.page.render()}
        <div class="toast" id="toast"></div>
      `;
    }

    // Binda eventos da página
    route.page.bind();

    // Binda eventos globais
    this._bindGlobalEvents();

    // Atualiza título da aba
    document.title = `${route.title} — Plataforma de Acessibilidade`;
  },

  /* ---- Sidebar ---- */
  _renderSidebar(activeRoute) {
    const navItems = [
      { section: 'Principal' },
      { route: 'dashboard',  icon: 'dashboard',   label: 'Dashboard' },
      { route: 'registro',   icon: 'note_add',    label: 'Registrar Demanda' },
      { route: 'gestao',     icon: 'list_alt',    label: 'Gestão de Demandas' },
      { section: 'Recursos' },
      { route: 'mapa',       icon: 'map',         label: 'Mapa de Acessibilidade' },
      { route: 'assistente', icon: 'smart_toy',   label: 'Assistente Virtual' },
      { route: 'relatorios', icon: 'bar_chart',   label: 'Relatórios' },
    ];

    return `
      <nav class="sidebar" id="sidebar" role="navigation" aria-label="Menu principal">
        <!-- Logo -->
        <div class="sidebar__logo">
          <div class="sidebar__logo-icon" aria-hidden="true">♿</div>
          <div class="sidebar__logo-text">
            Acessibilidade
            <span>Plataforma Inteligente</span>
          </div>
        </div>

        <!-- Navegação -->
        <div class="sidebar__nav">
          ${navItems.map(item => {
            if (item.section) {
              return `<div class="sidebar__section-title">${item.section}</div>`;
            }
            return `
              <a href="#${item.route}" 
                 class="sidebar__link ${activeRoute === item.route ? 'active' : ''}"
                 aria-current="${activeRoute === item.route ? 'page' : 'false'}">
                <span class="material-icons-outlined">${item.icon}</span>
                ${item.label}
              </a>
            `;
          }).join('')}
        </div>

        <!-- Rodapé com info do usuário -->
        <div class="sidebar__footer">
          <div class="sidebar__user">
            <div class="sidebar__avatar">${this.currentUser.name.charAt(0)}</div>
            <div class="sidebar__user-info">
              <strong>${this.currentUser.name}</strong>
              <span>${this.currentUser.type === 'admin' ? 'Administrador' : this.currentUser.type === 'acessibilidade' ? 'Acessibilidade' : 'Usuário Geral'}</span>
            </div>
          </div>
          <button class="sidebar__link" style="margin-top:0.5rem;" onclick="window.location.hash='#login'">
            <span class="material-icons-outlined">logout</span>
            Sair
          </button>
        </div>
      </nav>
    `;
  },

  /* ---- Topbar ---- */
  _renderTopbar(route) {
    return `
      <header class="topbar">
        <div class="topbar__left">
          <button class="topbar__menu-btn" id="menuToggle" aria-label="Abrir menu">
            <span class="material-icons-outlined">menu</span>
          </button>
          <div class="topbar__breadcrumb">
            <span class="material-icons-outlined" style="font-size:1rem;vertical-align:middle;margin-right:0.25rem;">${route.icon}</span>
            <strong>${route.title}</strong>
          </div>
        </div>
        <div class="topbar__right">
          <!-- Botão alto contraste -->
          <button class="topbar__a11y-btn ${this.preferences.highContrast ? 'active' : ''}" 
                  id="contrastToggle"
                  aria-label="Alternar modo de alto contraste"
                  title="Alto contraste">
            <span class="material-icons-outlined" style="font-size:1rem;">contrast</span>
            Contraste
          </button>

          <!-- Botão preferências -->
          <button class="topbar__icon-btn" id="prefsToggle" title="Preferências de acessibilidade" aria-label="Abrir preferências de acessibilidade">
            <span class="material-icons-outlined">settings_accessibility</span>
          </button>

          <!-- Notificações -->
          <button class="topbar__icon-btn" title="Notificações" aria-label="Notificações">
            <span class="material-icons-outlined">notifications</span>
            <span class="topbar__badge"></span>
          </button>
        </div>
      </header>
    `;
  },

  /* ---- Modal de Preferências ---- */
  _renderPreferencesModal() {
    const p = this.preferences;
    return `
      <div class="modal-overlay" id="prefsModal">
        <div class="modal" role="dialog" aria-labelledby="prefsTitle" aria-modal="true">
          <div class="modal__header">
            <h3 id="prefsTitle">
              <span class="material-icons-outlined" style="vertical-align:middle;margin-right:0.25rem;">settings_accessibility</span>
              Preferências de Acessibilidade
            </h3>
            <button class="modal__close" id="prefsClose" aria-label="Fechar">
              <span class="material-icons-outlined">close</span>
            </button>
          </div>
          <div class="modal__body">
            <!-- Visual -->
            <div class="pref-group">
              <h4>Visual</h4>
              <div class="pref-toggle">
                <label for="prefContrast">Modo alto contraste</label>
                <div class="switch">
                  <input type="checkbox" id="prefContrast" ${p.highContrast ? 'checked' : ''}>
                  <span class="switch__slider"></span>
                </div>
              </div>
              <div class="pref-toggle">
                <label for="prefLargeText">Texto maior</label>
                <div class="switch">
                  <input type="checkbox" id="prefLargeText" ${p.largeText ? 'checked' : ''}>
                  <span class="switch__slider"></span>
                </div>
              </div>
              <div class="pref-toggle">
                <label for="prefReduceMotion">Reduzir animações</label>
                <div class="switch">
                  <input type="checkbox" id="prefReduceMotion" ${p.reduceMotion ? 'checked' : ''}>
                  <span class="switch__slider"></span>
                </div>
              </div>
            </div>

            <!-- Mobilidade -->
            <div class="pref-group">
              <h4>Mobilidade</h4>
              <div class="pref-toggle">
                <label for="prefStairs">Evitar escadas</label>
                <div class="switch">
                  <input type="checkbox" id="prefStairs" ${p.avoidStairs ? 'checked' : ''}>
                  <span class="switch__slider"></span>
                </div>
              </div>
              <div class="pref-toggle">
                <label for="prefElevator">Preferir elevadores</label>
                <div class="switch">
                  <input type="checkbox" id="prefElevator" ${p.preferElevators ? 'checked' : ''}>
                  <span class="switch__slider"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal__footer">
            <button class="btn btn--outline btn--sm" id="prefsCancel">Cancelar</button>
            <button class="btn btn--primary btn--sm" id="prefsSave" style="width:auto;">
              <span class="material-icons-outlined">save</span>
              Salvar Preferências
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /* ---- Eventos Globais ---- */
  _bindGlobalEvents() {
    // Toggle alto contraste (botão na topbar)
    const contrastBtn = document.getElementById('contrastToggle');
    if (contrastBtn) {
      contrastBtn.addEventListener('click', () => {
        this.preferences.highContrast = !this.preferences.highContrast;
        this._applyPreferences();
        this._savePreferences();
        // Atualiza visual do botão
        contrastBtn.classList.toggle('active', this.preferences.highContrast);
        this.showToast(this.preferences.highContrast ? 'Alto contraste ativado' : 'Alto contraste desativado');
      });
    }

    // Abrir modal de preferências
    const prefsToggle = document.getElementById('prefsToggle');
    const prefsModal = document.getElementById('prefsModal');
    if (prefsToggle && prefsModal) {
      prefsToggle.addEventListener('click', () => {
        prefsModal.classList.add('active');
      });
    }

    // Fechar modal
    const prefsClose = document.getElementById('prefsClose');
    const prefsCancel = document.getElementById('prefsCancel');
    [prefsClose, prefsCancel].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          if (prefsModal) prefsModal.classList.remove('active');
        });
      }
    });

    // Fechar modal clicando fora
    if (prefsModal) {
      prefsModal.addEventListener('click', (e) => {
        if (e.target === prefsModal) prefsModal.classList.remove('active');
      });
    }

    // Salvar preferências
    const prefsSave = document.getElementById('prefsSave');
    if (prefsSave) {
      prefsSave.addEventListener('click', () => {
        this.preferences.highContrast = document.getElementById('prefContrast')?.checked || false;
        this.preferences.largeText = document.getElementById('prefLargeText')?.checked || false;
        this.preferences.reduceMotion = document.getElementById('prefReduceMotion')?.checked || false;
        this.preferences.avoidStairs = document.getElementById('prefStairs')?.checked || false;
        this.preferences.preferElevators = document.getElementById('prefElevator')?.checked || false;

        this._applyPreferences();
        this._savePreferences();
        if (prefsModal) prefsModal.classList.remove('active');
        this.showToast('Preferências salvas com sucesso!');
      });
    }

    // Menu toggle (mobile)
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });

      // Fecha sidebar ao clicar em um link (mobile)
      sidebar.querySelectorAll('.sidebar__link').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
          }
        });
      });
    }
  },

  /* ---- Preferências ---- */
  /** Aplica preferências visuais */
  _applyPreferences() {
    const body = document.body;
    const p = this.preferences;

    // Alto contraste
    body.classList.toggle('high-contrast', p.highContrast);

    // Texto maior
    document.documentElement.style.fontSize = p.largeText ? '17px' : '15px';

    // Reduzir animações
    if (p.reduceMotion) {
      document.documentElement.style.setProperty('--transition', '0s');
    } else {
      document.documentElement.style.setProperty('--transition', '0.25s ease');
    }
  },

  /** Salva preferências no localStorage */
  _savePreferences() {
    try {
      localStorage.setItem('a11y_prefs', JSON.stringify(this.preferences));
    } catch (e) {
      // localStorage pode não estar disponível
    }
  },

  /** Carrega preferências do localStorage */
  _loadPreferences() {
    try {
      const saved = localStorage.getItem('a11y_prefs');
      if (saved) {
        this.preferences = { ...this.preferences, ...JSON.parse(saved) };
        this._applyPreferences();
      }
    } catch (e) {
      // Ignora erros
    }
  },

  /* ---- Toast / Notificação ---- */
  _toastTimer: null,

  showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = `
      <span class="material-icons-outlined" style="font-size:1.1rem;">check_circle</span>
      ${message}
    `;
    toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }
};

/* ---- Inicia a aplicação quando o DOM estiver pronto ---- */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
