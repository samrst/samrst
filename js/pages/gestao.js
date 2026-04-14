/* ================================================================
   GESTÃO DE DEMANDAS
   Lista com status, filtros e ações
   ================================================================ */

const GestaoPage = {
  /** Filtro atual */
  currentFilter: 'todos',

  /** Dados mockados de demandas */
  demandas: [
    { id: 'DEM-001', titulo: 'Instalação de rampa de acesso', tipo: 'Física', local: 'Bloco C - Térreo', status: 'aberto', prioridade: 'alta', data: '13/04/2026', responsavel: 'João Silva' },
    { id: 'DEM-002', titulo: 'Sinalização tátil no corredor', tipo: 'Visual', local: 'Bloco A - 3º Andar', status: 'andamento', prioridade: 'media', data: '12/04/2026', responsavel: 'Maria Santos' },
    { id: 'DEM-003', titulo: 'Reparo do elevador E-03', tipo: 'Física', local: 'Bloco B - Todos', status: 'andamento', prioridade: 'alta', data: '11/04/2026', responsavel: 'Carlos Oliveira' },
    { id: 'DEM-004', titulo: 'Banheiro acessível - reforma', tipo: 'Física', local: 'Bloco C - Térreo', status: 'resolvido', prioridade: 'media', data: '08/04/2026', responsavel: 'Ana Costa' },
    { id: 'DEM-005', titulo: 'Piso tátil na entrada principal', tipo: 'Visual', local: 'Área Externa', status: 'resolvido', prioridade: 'baixa', data: '05/04/2026', responsavel: 'Pedro Lima' },
    { id: 'DEM-006', titulo: 'Alarme visual em salas de reunião', tipo: 'Auditiva', local: 'Bloco A - 2º Andar', status: 'aberto', prioridade: 'media', data: '13/04/2026', responsavel: '—' },
    { id: 'DEM-007', titulo: 'Adequação da largura da porta', tipo: 'Física', local: 'Bloco D - 1º Andar', status: 'aberto', prioridade: 'alta', data: '14/04/2026', responsavel: '—' },
    { id: 'DEM-008', titulo: 'Contraste no sistema digital', tipo: 'Digital', local: 'TI - Geral', status: 'andamento', prioridade: 'baixa', data: '10/04/2026', responsavel: 'Lucas Pereira' },
    { id: 'DEM-009', titulo: 'Intérprete de Libras para evento', tipo: 'Auditiva', local: 'Auditório Bloco A', status: 'resolvido', prioridade: 'alta', data: '01/04/2026', responsavel: 'Fernanda Alves' },
    { id: 'DEM-010', titulo: 'Remoção de obstáculo no estacionamento', tipo: 'Física', local: 'Estacionamento Norte', status: 'aberto', prioridade: 'media', data: '13/04/2026', responsavel: '—' },
  ],

  render() {
    const filtered = this.currentFilter === 'todos'
      ? this.demandas
      : this.demandas.filter(d => d.status === this.currentFilter);

    const counts = {
      todos: this.demandas.length,
      aberto: this.demandas.filter(d => d.status === 'aberto').length,
      andamento: this.demandas.filter(d => d.status === 'andamento').length,
      resolvido: this.demandas.filter(d => d.status === 'resolvido').length,
    };

    return `
      <div class="page-header">
        <div>
          <h1>Gestão de Demandas</h1>
          <p>Acompanhe e gerencie todas as solicitações</p>
        </div>
        <button class="btn btn--accent btn--sm" onclick="window.location.hash='#registro'">
          <span class="material-icons-outlined">add</span>
          Nova Demanda
        </button>
      </div>

      <!-- Barra de ferramentas -->
      <div class="demandas-toolbar">
        <div class="demandas-toolbar__search">
          <span class="material-icons-outlined" style="color:var(--color-text-light);">search</span>
          <input type="text" id="searchDemandas" placeholder="Buscar demandas..." aria-label="Buscar demandas">
        </div>
        <div class="demandas-toolbar__filters">
          ${['todos', 'aberto', 'andamento', 'resolvido'].map(f => `
            <button class="filter-btn ${this.currentFilter === f ? 'active' : ''}" data-filter="${f}">
              ${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f]})
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Tabela -->
      <div class="card">
        <div class="card__body" style="padding:0; overflow-x:auto;">
          <table class="demandas-table" aria-label="Lista de demandas de acessibilidade">
            <thead>
              <tr>
                <th>ID</th>
                <th>Demanda</th>
                <th>Tipo</th>
                <th>Localização</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Responsável</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(d => `
                <tr>
                  <td data-label="ID"><span class="demanda-id">${d.id}</span></td>
                  <td data-label="Demanda">${d.titulo}</td>
                  <td data-label="Tipo">${d.tipo}</td>
                  <td data-label="Local">${d.local}</td>
                  <td data-label="Prioridade">
                    <span class="priority-indicator priority-indicator--${d.prioridade}">
                      <span class="material-icons-outlined" style="font-size:0.9rem;">
                        ${d.prioridade === 'alta' ? 'arrow_upward' : d.prioridade === 'media' ? 'remove' : 'arrow_downward'}
                      </span>
                      ${d.prioridade.charAt(0).toUpperCase() + d.prioridade.slice(1)}
                    </span>
                  </td>
                  <td data-label="Status">
                    <span class="status-badge status-badge--${d.status}">
                      <span class="status-badge__dot"></span>
                      ${d.status === 'aberto' ? 'Aberto' : d.status === 'andamento' ? 'Em andamento' : 'Resolvido'}
                    </span>
                  </td>
                  <td data-label="Responsável">${d.responsavel}</td>
                  <td data-label="Ações">
                    <div class="table-actions">
                      <button class="table-action-btn" title="Visualizar" data-action="view" data-id="${d.id}">
                        <span class="material-icons-outlined">visibility</span>
                      </button>
                      <button class="table-action-btn" title="Editar" data-action="edit" data-id="${d.id}">
                        <span class="material-icons-outlined">edit</span>
                      </button>
                      ${d.status !== 'resolvido' ? `
                        <button class="table-action-btn" title="Marcar como resolvido" data-action="resolve" data-id="${d.id}" style="color:var(--color-success);">
                          <span class="material-icons-outlined">check</span>
                        </button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  bind() {
    // Filtros
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.dataset.filter;
        App.renderPage('gestao');
      });
    });

    // Busca
    const searchInput = document.getElementById('searchDemandas');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase();
        document.querySelectorAll('.demandas-table tbody tr').forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(term) ? '' : 'none';
        });
      });
    }

    // Ações dos botões
    document.querySelectorAll('.table-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const id = btn.dataset.id;

        if (action === 'resolve') {
          const demanda = this.demandas.find(d => d.id === id);
          if (demanda) {
            demanda.status = 'resolvido';
            App.showToast(`Demanda ${id} marcada como resolvida!`);
            App.renderPage('gestao');
          }
        } else if (action === 'view') {
          App.showToast(`Visualizando detalhes de ${id}`);
        } else if (action === 'edit') {
          App.showToast(`Editando demanda ${id}`);
        }
      });
    });
  }
};
