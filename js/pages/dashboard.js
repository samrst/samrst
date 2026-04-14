/* ================================================================
   DASHBOARD
   Cards de métricas, atividades recentes e alertas
   ================================================================ */

const DashboardPage = {
  render() {
    return `
      <div class="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Visão geral da acessibilidade corporativa</p>
        </div>
        <button class="btn btn--accent btn--sm" onclick="window.location.hash='#registro'">
          <span class="material-icons-outlined">add</span>
          Nova Demanda
        </button>
      </div>

      <!-- Cards de métricas -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-card__icon metric-card__icon--yellow">
            <span class="material-icons-outlined">pending_actions</span>
          </div>
          <div class="metric-card__info">
            <h3>Demandas Abertas</h3>
            <div class="metric-card__value">24</div>
            <div class="metric-card__change metric-card__change--up">↑ 12% este mês</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-card__icon metric-card__icon--blue">
            <span class="material-icons-outlined">schedule</span>
          </div>
          <div class="metric-card__info">
            <h3>Tempo Médio</h3>
            <div class="metric-card__value">3.2d</div>
            <div class="metric-card__change metric-card__change--down">↓ 8% vs anterior</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-card__icon metric-card__icon--red">
            <span class="material-icons-outlined">warning</span>
          </div>
          <div class="metric-card__info">
            <h3>Alertas Ativos</h3>
            <div class="metric-card__value">5</div>
            <div class="metric-card__change metric-card__change--up">↑ 2 novos</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-card__icon metric-card__icon--green">
            <span class="material-icons-outlined">check_circle</span>
          </div>
          <div class="metric-card__info">
            <h3>Resolvidas (mês)</h3>
            <div class="metric-card__value">87</div>
            <div class="metric-card__change metric-card__change--up">↑ 23% vs anterior</div>
          </div>
        </div>
      </div>

      <!-- Grid: Atividades + Alertas -->
      <div class="dashboard-grid">
        <!-- Atividades recentes -->
        <div class="card">
          <div class="card__header">
            <h3>Atividades Recentes</h3>
            <button class="btn btn--outline btn--sm">Ver todas</button>
          </div>
          <div class="card__body">
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-item__dot activity-item__dot--green"></div>
                <div>
                  <div class="activity-item__text">
                    Rampa de acesso instalada no <strong>Bloco C</strong>
                  </div>
                  <div class="activity-item__time">Hoje, 14:30</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-item__dot activity-item__dot--blue"></div>
                <div>
                  <div class="activity-item__text">
                    Nova demanda registrada: <strong>Sinalização tátil - Andar 3</strong>
                  </div>
                  <div class="activity-item__time">Hoje, 11:15</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-item__dot activity-item__dot--yellow"></div>
                <div>
                  <div class="activity-item__text">
                    Manutenção do elevador <strong>E-02</strong> em andamento
                  </div>
                  <div class="activity-item__time">Ontem, 16:45</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-item__dot activity-item__dot--red"></div>
                <div>
                  <div class="activity-item__text">
                    Obstáculo reportado no <strong>estacionamento norte</strong>
                  </div>
                  <div class="activity-item__time">Ontem, 09:20</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-item__dot activity-item__dot--green"></div>
                <div>
                  <div class="activity-item__text">
                    Banheiro acessível do <strong>Bloco A</strong> liberado após reforma
                  </div>
                  <div class="activity-item__time">12/04, 17:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Alertas -->
        <div class="card">
          <div class="card__header">
            <h3>Alertas</h3>
            <span class="status-badge status-badge--aberto">
              <span class="status-badge__dot"></span> 5 ativos
            </span>
          </div>
          <div class="card__body">
            <div class="alert-list">
              <div class="alert-item alert-item--danger">
                <span class="material-icons-outlined">error</span>
                Elevador E-03 fora de operação há 48h
              </div>
              <div class="alert-item alert-item--warning">
                <span class="material-icons-outlined">warning</span>
                3 demandas de alta prioridade sem atribuição
              </div>
              <div class="alert-item alert-item--warning">
                <span class="material-icons-outlined">warning</span>
                Prazo de adequação do Bloco D expira em 5 dias
              </div>
              <div class="alert-item alert-item--info">
                <span class="material-icons-outlined">info</span>
                Novo relatório de conformidade disponível
              </div>
              <div class="alert-item alert-item--info">
                <span class="material-icons-outlined">info</span>
                Treinamento de acessibilidade agendado para 20/04
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bind() {
    // Sem interações dinâmicas extras no dashboard por enquanto
  }
};
