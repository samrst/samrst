/* ================================================================
   REGISTRO DE DEMANDA
   Formulário completo com upload simulado
   ================================================================ */

const RegistroPage = {
  render() {
    return `
      <div class="page-header">
        <div>
          <h1>Registrar Demanda</h1>
          <p>Cadastre uma nova solicitação de acessibilidade</p>
        </div>
      </div>

      <div class="form-page">
        <!-- Informações da demanda -->
        <div class="card">
          <div class="card__header">
            <h3>Informações da Demanda</h3>
          </div>
          <div class="card__body">
            <form id="demandaForm" aria-label="Formulário de registro de demanda">
              <div class="form-group">
                <label for="tipoAcessibilidade">Tipo de Acessibilidade</label>
                <select id="tipoAcessibilidade" required>
                  <option value="">Selecione o tipo</option>
                  <option value="fisica">Física / Mobilidade</option>
                  <option value="visual">Visual</option>
                  <option value="auditiva">Auditiva</option>
                  <option value="cognitiva">Cognitiva</option>
                  <option value="digital">Digital / Tecnológica</option>
                  <option value="sinalizacao">Sinalização</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="prioridade">Prioridade</label>
                  <select id="prioridade" required>
                    <option value="baixa">Baixa</option>
                    <option value="media" selected>Média</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="categoria">Categoria</label>
                  <select id="categoria">
                    <option value="instalacao">Nova instalação</option>
                    <option value="manutencao">Manutenção</option>
                    <option value="remocao">Remoção de barreira</option>
                    <option value="adequacao">Adequação</option>
                    <option value="sugestao">Sugestão de melhoria</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="descricao">Descrição detalhada</label>
                <textarea id="descricao" 
                          placeholder="Descreva a necessidade de acessibilidade, incluindo detalhes sobre o problema e o impacto para os usuários..." 
                          required></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="bloco">Bloco / Edifício</label>
                  <select id="bloco">
                    <option value="">Selecione</option>
                    <option value="bloco-a">Bloco A - Administrativo</option>
                    <option value="bloco-b">Bloco B - Engenharia</option>
                    <option value="bloco-c">Bloco C - Operações</option>
                    <option value="bloco-d">Bloco D - Laboratórios</option>
                    <option value="externo">Área externa</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="andar">Andar / Localização</label>
                  <input type="text" id="andar" placeholder="Ex: 3º andar, sala 302">
                </div>
              </div>

              <div class="form-group">
                <label for="referencia">Ponto de referência</label>
                <input type="text" id="referencia" placeholder="Ex: próximo à recepção principal">
              </div>

              <!-- Upload simulado -->
              <div class="form-group">
                <label>Anexar foto ou documento</label>
                <div class="upload-area" id="uploadArea" role="button" tabindex="0" aria-label="Clique para anexar arquivo">
                  <span class="material-icons-outlined">cloud_upload</span>
                  <p>Clique para selecionar ou arraste um arquivo</p>
                  <span>PNG, JPG ou PDF (máx. 10MB)</span>
                </div>
                <div id="uploadFeedback" style="margin-top:0.5rem; font-size:0.8rem; color:var(--color-success); display:none;">
                  <span class="material-icons-outlined" style="font-size:1rem; vertical-align:middle;">attach_file</span>
                  <span id="uploadFileName"></span>
                </div>
              </div>

              <div style="display:flex; gap:0.75rem; margin-top:1.5rem;">
                <button type="submit" class="btn btn--primary" style="flex:1;">
                  <span class="material-icons-outlined">send</span>
                  Enviar Demanda
                </button>
                <button type="reset" class="btn btn--outline">
                  <span class="material-icons-outlined">refresh</span>
                  Limpar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  bind() {
    // Upload simulado
    const uploadArea = document.getElementById('uploadArea');
    const feedback = document.getElementById('uploadFeedback');
    const fileName = document.getElementById('uploadFileName');

    if (uploadArea) {
      uploadArea.addEventListener('click', () => {
        // Simula seleção de arquivo
        const nomes = ['foto_rampa.jpg', 'relatorio_acesso.pdf', 'planta_bloco_c.png'];
        const nome = nomes[Math.floor(Math.random() * nomes.length)];
        if (fileName) fileName.textContent = nome;
        if (feedback) feedback.style.display = 'block';
        uploadArea.style.borderColor = 'var(--color-success)';
        App.showToast('Arquivo selecionado: ' + nome);
      });

      // Suporte a teclado
      uploadArea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          uploadArea.click();
        }
      });
    }

    // Submit do formulário
    const form = document.getElementById('demandaForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        App.showToast('Demanda registrada com sucesso! ID: #DEM-' + Math.floor(Math.random() * 900 + 100));
        // Redireciona para gestão
        setTimeout(() => { window.location.hash = '#gestao'; }, 1500);
      });
    }
  }
};
