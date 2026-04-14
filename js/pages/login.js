/* ================================================================
   PÁGINA DE LOGIN / CADASTRO
   Formulário dinâmico com seleção de tipo de usuário
   ================================================================ */

const LoginPage = {
  /** Estado interno do formulário */
  state: {
    isLogin: true,        // true = login, false = cadastro
    userType: 'geral',    // admin | geral | acessibilidade
  },

  /** Renderiza a página de login/cadastro */
  render() {
    const { isLogin, userType } = this.state;

    return `
      <div class="login-page">
        <!-- Painel de branding à esquerda -->
        <div class="login__branding">
          <div class="login__branding-icon" aria-hidden="true">♿</div>
          <h1>Plataforma Inteligente de Acessibilidade</h1>
          <p>Gestão integrada de acessibilidade corporativa. 
             Promovendo inclusão e autonomia para todos os colaboradores.</p>
        </div>

        <!-- Painel do formulário à direita -->
        <div class="login__form-panel" role="main">
          <h2>${isLogin ? 'Bem-vindo de volta' : 'Criar conta'}</h2>
          <p class="login__subtitle">
            ${isLogin 
              ? 'Acesse sua conta para continuar' 
              : 'Preencha os dados para se cadastrar'}
          </p>

          ${!isLogin ? this._renderUserTypeSelector() : ''}

          <form id="loginForm" aria-label="${isLogin ? 'Formulário de login' : 'Formulário de cadastro'}">
            ${!isLogin ? `
              <div class="form-group">
                <label for="fullName">Nome completo</label>
                <input type="text" id="fullName" placeholder="Seu nome completo" required>
              </div>
            ` : ''}

            <div class="form-group">
              <label for="email">E-mail corporativo</label>
              <input type="email" id="email" placeholder="seu.email@empresa.com" required>
            </div>

            <div class="form-group">
              <label for="password">Senha</label>
              <input type="password" id="password" placeholder="••••••••" required>
            </div>

            ${!isLogin && userType === 'acessibilidade' ? this._renderA11yFields() : ''}

            ${!isLogin ? `
              <div class="form-group">
                <label for="department">Departamento</label>
                <select id="department">
                  <option value="">Selecione o departamento</option>
                  <option value="ti">Tecnologia da Informação</option>
                  <option value="rh">Recursos Humanos</option>
                  <option value="engenharia">Engenharia</option>
                  <option value="administrativo">Administrativo</option>
                  <option value="operacoes">Operações</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            ` : ''}

            <button type="submit" class="btn btn--primary">
              <span class="material-icons-outlined">${isLogin ? 'login' : 'person_add'}</span>
              ${isLogin ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          <div class="login__toggle">
            ${isLogin 
              ? 'Não tem conta? <a id="toggleAuth">Criar conta</a>'
              : 'Já tem conta? <a id="toggleAuth">Fazer login</a>'}
          </div>
        </div>
      </div>
    `;
  },

  /** Seletor de tipo de usuário */
  _renderUserTypeSelector() {
    const types = [
      { id: 'admin', icon: 'admin_panel_settings', label: 'Administrador' },
      { id: 'geral', icon: 'person', label: 'Usuário Geral' },
      { id: 'acessibilidade', icon: 'accessible', label: 'Acessibilidade' },
    ];

    return `
      <div class="user-type-selector" role="radiogroup" aria-label="Tipo de usuário">
        ${types.map(t => `
          <button type="button" 
                  class="user-type-btn ${this.state.userType === t.id ? 'selected' : ''}"
                  data-type="${t.id}"
                  role="radio"
                  aria-checked="${this.state.userType === t.id}">
            <span class="material-icons-outlined">${t.icon}</span>
            ${t.label}
          </button>
        `).join('')}
      </div>
    `;
  },

  /** Campos extras para usuários com necessidade de acessibilidade */
  _renderA11yFields() {
    return `
      <div class="a11y-extra-fields">
        <h4>
          <span class="material-icons-outlined">accessibility_new</span>
          Preferências de Acessibilidade
        </h4>
        <div class="checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" name="a11y" value="visual"> Visual
          </label>
          <label class="checkbox-label">
            <input type="checkbox" name="a11y" value="auditiva"> Auditiva
          </label>
          <label class="checkbox-label">
            <input type="checkbox" name="a11y" value="motora"> Motora
          </label>
          <label class="checkbox-label">
            <input type="checkbox" name="a11y" value="cognitiva"> Cognitiva
          </label>
        </div>
        <div class="form-group" style="margin-top:0.75rem;margin-bottom:0">
          <label for="a11yNotes">Necessidades específicas</label>
          <input type="text" id="a11yNotes" placeholder="Ex: evitar escadas, preferência por rampas">
        </div>
      </div>
    `;
  },

  /** Bindeia eventos da página */
  bind() {
    // Toggle login/cadastro
    const toggleBtn = document.getElementById('toggleAuth');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.state.isLogin = !this.state.isLogin;
        App.renderPage('login');
      });
    }

    // Seleção de tipo de usuário
    document.querySelectorAll('.user-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.userType = btn.dataset.type;
        App.renderPage('login');
      });
    });

    // Submit do formulário
    const form = document.getElementById('loginForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simula login — salva tipo de usuário
        const userName = document.getElementById('fullName')?.value || 'Usuário';
        App.currentUser = {
          name: this.state.isLogin ? 'Sam Rodrigues' : userName,
          type: this.state.userType,
          email: document.getElementById('email')?.value || 'usuario@empresa.com',
        };
        App.showToast('Login realizado com sucesso!');
        window.location.hash = '#dashboard';
      });
    }
  }
};
