/* ================================================================
   RELATÓRIOS
   Gráficos com Chart.js e estatísticas
   ================================================================ */

const RelatoriosPage = {
  render() {
    return `
      <div class="page-header">
        <div>
          <h1>Relatórios</h1>
          <p>Análise e acompanhamento de indicadores de acessibilidade</p>
        </div>
        <button class="btn btn--outline btn--sm" onclick="App.showToast('Relatório exportado em PDF (simulação)')">
          <span class="material-icons-outlined">download</span>
          Exportar PDF
        </button>
      </div>

      <!-- Estatísticas resumidas -->
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-item__value">156</div>
          <div class="stat-item__label">Total de demandas (2026)</div>
        </div>
        <div class="stat-item">
          <div class="stat-item__value">87%</div>
          <div class="stat-item__label">Taxa de resolução</div>
        </div>
        <div class="stat-item">
          <div class="stat-item__value">3.2 dias</div>
          <div class="stat-item__label">Tempo médio de atendimento</div>
        </div>
        <div class="stat-item">
          <div class="stat-item__value">92%</div>
          <div class="stat-item__label">Satisfação dos usuários</div>
        </div>
      </div>

      <!-- Gráficos -->
      <div class="charts-grid">
        <!-- Gráfico de demandas por mês -->
        <div class="chart-card">
          <h3>Demandas por Mês</h3>
          <canvas id="chartMensal"></canvas>
        </div>

        <!-- Gráfico por tipo -->
        <div class="chart-card">
          <h3>Demandas por Tipo</h3>
          <canvas id="chartTipo"></canvas>
        </div>

        <!-- Gráfico de status -->
        <div class="chart-card">
          <h3>Status das Demandas</h3>
          <canvas id="chartStatus"></canvas>
        </div>

        <!-- Gráfico por localização -->
        <div class="chart-card">
          <h3>Demandas por Localização</h3>
          <canvas id="chartLocal"></canvas>
        </div>
      </div>
    `;
  },

  /** Inicializa os gráficos com Chart.js */
  bind() {
    // Espera o DOM atualizar e Chart.js estar disponível
    setTimeout(() => {
      this._initCharts();
    }, 100);
  },

  _initCharts() {
    // Verifica se Chart.js está disponível
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js não carregado');
      return;
    }

    // Cores consistentes com o tema
    const verde = '#006B3F';
    const amarelo = '#FFC220';
    const azul = '#3B82F6';
    const vermelho = '#EF4444';
    const roxo = '#8B5CF6';
    const cinza = '#6B7280';

    // --- Gráfico de Demandas por Mês (barras) ---
    const ctxMensal = document.getElementById('chartMensal');
    if (ctxMensal) {
      new Chart(ctxMensal, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [{
            label: 'Demandas abertas',
            data: [12, 15, 18, 24, 20, 16, 22, 19, 14, 17, 21, 0],
            backgroundColor: verde + 'CC',
            borderColor: verde,
            borderWidth: 1,
            borderRadius: 4,
          }, {
            label: 'Demandas resolvidas',
            data: [10, 13, 16, 20, 18, 15, 20, 17, 13, 16, 19, 0],
            backgroundColor: amarelo + 'CC',
            borderColor: amarelo,
            borderWidth: 1,
            borderRadius: 4,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 12 } } }
          },
          scales: {
            y: { beginAtZero: true, grid: { color: '#E5E7EB' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // --- Gráfico por Tipo (doughnut) ---
    const ctxTipo = document.getElementById('chartTipo');
    if (ctxTipo) {
      new Chart(ctxTipo, {
        type: 'doughnut',
        data: {
          labels: ['Física', 'Visual', 'Auditiva', 'Digital', 'Cognitiva', 'Outro'],
          datasets: [{
            data: [45, 25, 15, 8, 4, 3],
            backgroundColor: [verde, azul, amarelo, roxo, vermelho, cinza],
            borderWidth: 2,
            borderColor: '#FFFFFF',
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } }
          },
          cutout: '60%',
        }
      });
    }

    // --- Gráfico de Status (pie) ---
    const ctxStatus = document.getElementById('chartStatus');
    if (ctxStatus) {
      new Chart(ctxStatus, {
        type: 'pie',
        data: {
          labels: ['Aberto', 'Em andamento', 'Resolvido'],
          datasets: [{
            data: [24, 15, 87],
            backgroundColor: [amarelo, azul, verde],
            borderWidth: 2,
            borderColor: '#FFFFFF',
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 12 } } }
          }
        }
      });
    }

    // --- Gráfico por Localização (barras horizontais) ---
    const ctxLocal = document.getElementById('chartLocal');
    if (ctxLocal) {
      new Chart(ctxLocal, {
        type: 'bar',
        data: {
          labels: ['Bloco A', 'Bloco B', 'Bloco C', 'Bloco D', 'Área Externa', 'Estacionamento'],
          datasets: [{
            label: 'Demandas',
            data: [35, 28, 42, 18, 22, 11],
            backgroundColor: [verde, azul, amarelo, roxo, vermelho, cinza],
            borderRadius: 4,
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: { beginAtZero: true, grid: { color: '#E5E7EB' } },
            y: { grid: { display: false } }
          }
        }
      });
    }
  }
};
