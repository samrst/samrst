/* ================================================================
   MAPA DE ACESSIBILIDADE
   Simulação visual com pins e filtros
   ================================================================ */

const MapaPage = {
  /** Estado dos filtros */
  filters: {
    rampas: true,
    elevadores: true,
    obstaculos: true,
    banheiros: true,
  },

  /** Dados dos pins no mapa */
  pins: [
    { id: 1, type: 'rampa',     label: 'Rampa A1',       row: 1, col: 1, status: 'ok' },
    { id: 2, type: 'rampa',     label: 'Rampa B2',       row: 3, col: 5, status: 'ok' },
    { id: 3, type: 'rampa',     label: 'Rampa C1',       row: 5, col: 2, status: 'manutencao' },
    { id: 4, type: 'elevador',  label: 'Elevador E-01',  row: 1, col: 4, status: 'ok' },
    { id: 5, type: 'elevador',  label: 'Elevador E-02',  row: 2, col: 7, status: 'manutencao' },
    { id: 6, type: 'elevador',  label: 'Elevador E-03',  row: 4, col: 3, status: 'inativo' },
    { id: 7, type: 'obstaculo', label: 'Degrau s/ rampa', row: 2, col: 2, status: 'alerta' },
    { id: 8, type: 'obstaculo', label: 'Piso irregular',  row: 4, col: 6, status: 'alerta' },
    { id: 9, type: 'obstaculo', label: 'Passagem estreita',row: 5, col: 5, status: 'alerta' },
    { id: 10, type: 'banheiro', label: 'Banh. Acess. A',  row: 1, col: 6, status: 'ok' },
    { id: 11, type: 'banheiro', label: 'Banh. Acess. B',  row: 3, col: 1, status: 'ok' },
    { id: 12, type: 'banheiro', label: 'Banh. Acess. C',  row: 5, col: 7, status: 'reforma' },
  ],

  /** Ícones para cada tipo */
  icons: {
    rampa: 'ramp_left',
    elevador: 'elevator',
    obstaculo: 'report_problem',
    banheiro: 'wc',
  },

  render() {
    return `
      <div class="page-header">
        <div>
          <h1>Mapa de Acessibilidade</h1>
          <p>Visualize os recursos e barreiras de acessibilidade na empresa</p>
        </div>
      </div>

      <div class="map-container">
        <!-- Painel de filtros -->
        <div class="map-filters">
          <div class="card">
            <div class="card__header">
              <h3>Filtros</h3>
            </div>
            <div class="card__body">
              ${this._renderFilter('rampas', 'ramp_left', 'Rampas', '#10B981', 3)}
              ${this._renderFilter('elevadores', 'elevator', 'Elevadores', '#3B82F6', 3)}
              ${this._renderFilter('obstaculos', 'report_problem', 'Obstáculos', '#EF4444', 3)}
              ${this._renderFilter('banheiros', 'wc', 'Banh. Acessíveis', '#8B5CF6', 3)}
            </div>
          </div>

          <!-- Legenda de status -->
          <div class="card" style="margin-top:1rem;">
            <div class="card__header">
              <h3>Status</h3>
            </div>
            <div class="card__body" style="font-size:0.8rem;">
              <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
                <span style="width:10px;height:10px;border-radius:50%;background:#10B981;"></span>
                Funcionando
              </div>
              <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
                <span style="width:10px;height:10px;border-radius:50%;background:#F59E0B;"></span>
                Em manutenção
              </div>
              <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
                <span style="width:10px;height:10px;border-radius:50%;background:#EF4444;"></span>
                Inativo / Alerta
              </div>
              <div style="display:flex;align-items:center;gap:0.5rem;">
                <span style="width:10px;height:10px;border-radius:50%;background:#6B7280;"></span>
                Em reforma
              </div>
            </div>
          </div>
        </div>

        <!-- Mapa visual -->
        <div>
          <div class="map-visual">
            <div class="map-visual__grid" id="mapGrid">
              ${this._renderPins()}
            </div>
          </div>
          <div class="map-legend">
            <div class="map-legend__item">
              <div class="filter-dot" style="background:#10B981;"></div> Rampas
            </div>
            <div class="map-legend__item">
              <div class="filter-dot" style="background:#3B82F6;"></div> Elevadores
            </div>
            <div class="map-legend__item">
              <div class="filter-dot" style="background:#EF4444;"></div> Obstáculos
            </div>
            <div class="map-legend__item">
              <div class="filter-dot" style="background:#8B5CF6;"></div> Banh. Acessíveis
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /** Renderiza um filtro individual */
  _renderFilter(key, icon, label, color, count) {
    return `
      <div class="filter-option">
        <input type="checkbox" id="filter-${key}" 
               ${this.filters[key] ? 'checked' : ''}
               data-filter="${key}">
        <div class="filter-dot" style="background:${color};"></div>
        <label for="filter-${key}" style="flex:1;cursor:pointer;">${label}</label>
        <span style="font-size:0.75rem;color:var(--color-text-light);">${count}</span>
      </div>
    `;
  },

  /** Renderiza os pins no mapa */
  _renderPins() {
    const typeMap = {
      rampa: 'rampas',
      elevador: 'elevadores',
      obstaculo: 'obstaculos',
      banheiro: 'banheiros',
    };

    // Cria grid 8x6 com pins posicionados
    let cells = '';
    for (let r = 1; r <= 6; r++) {
      for (let c = 1; c <= 8; c++) {
        const pin = this.pins.find(p => p.row === r && p.col === c);
        if (pin && this.filters[typeMap[pin.type]]) {
          const cssClass = `map-pin map-pin--${pin.type === 'rampa' ? 'rampa' : pin.type === 'elevador' ? 'elevador' : pin.type === 'obstaculo' ? 'obstaculo' : 'banheiro'}`;
          cells += `
            <div class="${cssClass}" title="${pin.label} — ${pin.status}" data-pin-id="${pin.id}">
              <div class="map-pin__icon">
                <span class="material-icons-outlined">${this.icons[pin.type]}</span>
              </div>
              <span class="map-pin__label">${pin.label}</span>
            </div>
          `;
        } else {
          cells += '<div></div>';
        }
      }
    }
    return cells;
  },

  bind() {
    // Filtros
    document.querySelectorAll('[data-filter]').forEach(cb => {
      cb.addEventListener('change', () => {
        this.filters[cb.dataset.filter] = cb.checked;
        const grid = document.getElementById('mapGrid');
        if (grid) grid.innerHTML = this._renderPins();
      });
    });

    // Click nos pins
    document.querySelectorAll('.map-pin').forEach(pin => {
      pin.addEventListener('click', () => {
        const pinData = this.pins.find(p => p.id === parseInt(pin.dataset.pinId));
        if (pinData) {
          App.showToast(`${pinData.label} — Status: ${pinData.status}`);
        }
      });
    });
  }
};
