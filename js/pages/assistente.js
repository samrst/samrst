/* ================================================================
   ASSISTENTE VIRTUAL
   Chat simulado com respostas mockadas
   ================================================================ */

const AssistentePage = {
  /** Mensagens do chat */
  messages: [
    {
      type: 'bot',
      text: 'Olá! Sou o assistente virtual da Plataforma de Acessibilidade. Como posso ajudar você hoje?'
    }
  ],

  /** Sugestões de perguntas rápidas */
  suggestions: [
    'Onde fica a rampa mais próxima?',
    'Como registrar uma demanda?',
    'Status do elevador E-03',
    'Preciso de ajuda com acessibilidade',
  ],

  /** Respostas mockadas baseadas em palavras-chave */
  responses: {
    'rampa': 'As rampas de acesso estão localizadas nos Blocos A, B e C. A rampa mais próxima da entrada principal fica no Bloco A, térreo. Você pode verificar todas as rampas no Mapa de Acessibilidade.',
    'demanda': 'Para registrar uma demanda, acesse o menu "Registrar Demanda" na barra lateral. Preencha o tipo de acessibilidade, descrição, localização e, se desejar, anexe uma foto. Sua demanda será encaminhada automaticamente ao setor responsável.',
    'elevador': 'O elevador E-03 está atualmente fora de operação desde 12/04. A equipe de manutenção está trabalhando na resolução e a previsão de retorno é para 16/04. Enquanto isso, utilize o elevador E-01 no Bloco A.',
    'ajuda': 'Posso ajudar com: localização de recursos de acessibilidade, registro de demandas, informações sobre status de equipamentos e orientações sobre rotas acessíveis. Qual sua necessidade específica?',
    'banheiro': 'Os banheiros acessíveis estão nos Blocos A (térreo), B (1º andar) e C (térreo). O banheiro do Bloco C está temporariamente em reforma, com previsão de conclusão em 18/04.',
    'rota': 'Para encontrar a melhor rota acessível, acesse o Mapa de Acessibilidade. Lá você pode filtrar por tipo de recurso (rampas, elevadores) e identificar obstáculos no caminho.',
    'horario': 'O horário de funcionamento dos elevadores é de 7h às 22h. Rampas e acessos estão disponíveis 24h. Para solicitar assistência fora do horário, ligue para a portaria: ramal 5555.',
    'treinamento': 'O próximo treinamento de acessibilidade está agendado para 20/04/2026, das 9h às 12h, no auditório do Bloco A. As inscrições podem ser feitas pelo portal do RH.',
  },

  render() {
    return `
      <div class="page-header">
        <div>
          <h1>Assistente Virtual</h1>
          <p>Tire suas dúvidas sobre acessibilidade</p>
        </div>
      </div>

      <div class="chat-container">
        <div class="chat-box" role="log" aria-label="Conversa com assistente virtual">
          <!-- Mensagens -->
          <div class="chat-box__messages" id="chatMessages">
            ${this._renderMessages()}
          </div>

          <!-- Sugestões -->
          <div class="chat-box__suggestions" id="chatSuggestions">
            ${this.suggestions.map(s => `
              <button class="chat-suggestion" data-suggestion="${s}">${s}</button>
            `).join('')}
          </div>

          <!-- Input -->
          <div class="chat-box__input">
            <input type="text" id="chatInput" 
                   placeholder="Digite sua pergunta..." 
                   aria-label="Campo de mensagem"
                   autocomplete="off">
            <button class="chat-box__send" id="chatSend" aria-label="Enviar mensagem">
              <span class="material-icons-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /** Renderiza as mensagens do chat */
  _renderMessages() {
    return this.messages.map(msg => `
      <div class="chat-msg chat-msg--${msg.type}">
        <div class="chat-msg__avatar">
          <span class="material-icons-outlined">
            ${msg.type === 'bot' ? 'smart_toy' : 'person'}
          </span>
        </div>
        <div class="chat-msg__bubble">${msg.text}</div>
      </div>
    `).join('');
  },

  /** Processa a mensagem do usuário e gera resposta */
  _processMessage(text) {
    // Adiciona mensagem do usuário
    this.messages.push({ type: 'user', text });

    // Busca resposta por palavra-chave
    const lowerText = text.toLowerCase();
    let response = 'Desculpe, não encontrei uma resposta específica para sua pergunta. Posso ajudar com informações sobre rampas, elevadores, banheiros acessíveis, rotas, demandas e treinamentos. Poderia reformular sua pergunta?';

    for (const [keyword, reply] of Object.entries(this.responses)) {
      if (lowerText.includes(keyword)) {
        response = reply;
        break;
      }
    }

    // Adiciona resposta do bot (com delay simulado)
    setTimeout(() => {
      this.messages.push({ type: 'bot', text: response });
      this._updateChat();
    }, 600);
  },

  /** Atualiza a área de mensagens */
  _updateChat() {
    const container = document.getElementById('chatMessages');
    if (container) {
      container.innerHTML = this._renderMessages();
      container.scrollTop = container.scrollHeight;
    }
  },

  bind() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');

    // Enviar mensagem ao clicar no botão
    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        this._sendFromInput(input);
      });
    }

    // Enviar mensagem ao pressionar Enter
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this._sendFromInput(input);
        }
      });
    }

    // Sugestões rápidas
    document.querySelectorAll('.chat-suggestion').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.suggestion;
        this._processMessage(text);
        this._updateChat();
        // Remove sugestões após uso
        const suggestions = document.getElementById('chatSuggestions');
        if (suggestions) suggestions.style.display = 'none';
      });
    });
  },

  /** Envia mensagem do input */
  _sendFromInput(input) {
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    this._processMessage(text);
    this._updateChat();
    input.value = '';
    input.focus();
  }
};
