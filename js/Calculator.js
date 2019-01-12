
class Calculator {

  constructor() {

    // Declarar atributos e seus valores padrões
    this._time = document.querySelector('#hora')
    this._date = document.querySelector('#data')
    this._operationElements = [0]
    this._display = document.querySelector('#display')
    this._withAudio = true

    // Configurar som de clique
    this._audio = new Audio('./assets/click.mp3')

    // Executar método de inicialização da aplicação
    this.initialize()
  }

  initialize() {

    // Criar constante apontando para o objeto 'this'
    const self = this

    // Exibir conteúdo inicial no display
    self.refreshDateTime()      // Data e hora atuais
    self.refreshDisplay()       // '0' (zero)

    // Executar 'refresh' do relógio
    setInterval(function() {
      self.refreshDateTime()    
    }, 1000)

    // Configurar eventos de clique e teclado
    self.initAudioEvent()
    self.initButtonsEvents()
    self.initKeyboardEvents()
  }

  refreshDateTime() {

    // Chamar data e hora atuais e formatá-las
    this.displayTime = this.currentDate.toLocaleTimeString(LOCALE)
    this.displayDate = this.currentDate.toLocaleDateString(LOCALE, { day: '2-digit', month: 'long', year: 'numeric' })
  }

  refreshDisplay(value = null) {

    // Validar se foi passado parâmetro
    let number = value
    if (number === null) {

      // Salvar valor para exibição
      number = this.lastOperation.toString() // TODO 'lastOperation' ???
    }

    // Verificar se o valor é numérico e ajustar separador decimal
    if (!isNaN(number) && !this.hasDecimals(number)) {
      number = number + DECIMAL_SEP
    }
    this.display = number
  }

  initAudioEvent() {

    // Criar constante apontando para o objeto 'this'
    const self = this

    // Criar evento para ligar e desligar o som das teclas
    document.getElementById('toggle-audio').addEventListener('click', event => {
      self._withAudio = !self._withAudio

      // Alternar ícone de som
      if (self._withAudio) {
        // TODO
        // Imagem 'sound-on.png'
      } else {
        // TODO
        // Imagem 'sound-off.png'
      }
    })
  }

  initButtonsEvents() {

    // Definir função privada para configuração múltipla de eventos
    const addMultiEventListeners = (element, eventsList, func) => {
  
      // Iterar sobre lista de eventos e configurar evento
      eventsList.forEach(event => {
        element.addEventListener(event, func, false)
      })
    }

    // Criar constante apontando para o objeto 'this'
    const self = this

    // Capturar todos os elementos HTML relacionados aos botões
    const buttons = document.querySelectorAll('#buttons > g, #parts > g')
    
    // Iterar sobre os elementos, configurando os eventos
    buttons.forEach(button => {
      
      // Definir evento para cliques simples e longos
      addMultiEventListeners(button, ['click', 'drag'], event => {
        
        // Caputrar valor do elemento clicado
        const textButton = button.className.baseVal.replace('btn-', '')
        self.pressButton(textButton)
      })

      // Definir evento de cursor de mouse 
      addMultiEventListeners(button, ['mouseover', 'mouseup', 'mousedown'], function() {
        button.style.cursor = 'pointer'
      })
    })
  }

  initKeyboardEvents() {

    // Criar constante apontando para o objeto 'this'
    const self = this

    // Definir evento de teclas pressionada do teclado
    document.addEventListener('keyup', event => {

      // Chamar botão equivalente (ver constante 'KEYS_MAP')
      const key = event.key.toLowerCase()
      if (event.ctrlKey && key == 'c') {
        self.copyFromDisplay()
      } else {
        self.pressButton(KEYS_MAP[key])
      }
    })

    // Definir evento de colagem de texto da Área de Transferência
    document.addEventListener('paste', event => {
      const content = event.clipboardData.getData('Text')

      // Validar texto colado como número
      if (isNaN(content)) {
        alert(`Você está tentando colar conteúdo que não é numérico:\n"${content}"`)
      } else {
        self.display = parseFloat(content)
        console.log('Conteúdo colado com sucesso!')
      }
    })
  }

  copyFromDisplay() {

    // Criar um elemento HTML para armazenar o valor do display
    const input = document.createElement('input')
    document.body.appendChild(input)
    
    // Copiar conteúdo do display para o 'input'
    input.value = parseFloat(this.display)

    // Selecionar conteúdo e copiar para a Área de Transferência
    input.select()
    document.execCommand('Copy')

    // Excluir elemento HTML
    input.remove()
    console.log('Conteúdo copiado com sucesso!')
  }

  pressButton(buttonText) {

    // Executar son de clique (se ativado)
    this.playAudio()

    // Executar ação a partir de tecla selecionada
    switch (buttonText) {
      case 'ac':
        this.clearAll()
        break
      case 'ce':
        this.clearEntry()
        break
      case 'igual':
        this.calculate()
        break
      case 'soma':
      case 'subtracao':
      case 'divisao':
      case 'multiplicacao':
      case 'porcento':
      case 'ponto':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.captureOperation(BUTTONS_MAP[buttonText])
        break
    }
  }

  playAudio() {

    // Verificar se o interruptor de aúdio está ligado
    if (this._withAudio) {

      // Colocar 'agulha' de áudio na posição zero
      this._audio.currentTime = 0
      this._audio.play()
    }
  }

  clearAll() {
    // Apaga todos os registros de operações
    this._operationElements = [0]
    
    // Refletir mudanças no display
    this.refreshDisplay()
  }

  clearEntry() {
    // Apaga o último registro de operações
    if (this._operationElements.length == 1) {
      this.clearAll()
    } else if (this._operationElements.length == 3) {
      this._operationElements.pop()
      this.refreshDisplay(0)
    }
  }
  
  calculate() {
    // Fazer o parse dos itens do array e executar cálculo
    const result = eval(this._operationElements.join(''))
    
    // Substituir primeiro número e remover último
    this._operationElements[0] = result
    this._operationElements.pop()

    // Exibir resultado no display
    this.refreshDisplay()
  }

  isOperator(value) {
    // Avalia se o parâmetro é um operador aritmético
    return (['+', '-', '*', '/', '%'].indexOf(value) > -1)
  }

  pushOperation(value) {
    // Validar número de itens
    if (this._operationElements.length == 3) {
      // Executar cálculo de par
      this.calculate()
    }

      // Adicionar operação ao array
    this._operationElements.push(value)
  }

  hasDecimals(string) {
    return (string.toString().indexOf(DECIMAL_SEP) > -1)
  }

  captureOperation(value) {
    // Tratar dado se a ýltima operação for uma 'string'
    if (isNaN(this.lastOperation)) {
      // Substituir operador aritmético
      if (this.isOperator(value)) {
        this.lastOperation = value
      } else {
      
        // Validar se o valor digitado é o separador decimal
        if (value == DECIMAL_SEP) {
          this.pushOperation('0' + DECIMAL_SEP)

        // Adicionar uma nova operação com valor numérico
        } else {
          this.pushOperation(parseInt(value))
        }
        this.refreshDisplay()
      }

    // Tratar dado se a ýltima operação for um 'number'
    } else {
      // Substituir operador aritmético
      if (this.isOperator(value)) {
        this.pushOperation(value)
      } else {
      
        // Validar se o valor digitado é o separador decimal
        if (value == DECIMAL_SEP) {
          if (!this.hasDecimals(this.lastOperation)) {
            this.lastOperation += value
          }

        // Adicionar uma nova operação com valor numérico
        } else {
          if (this.hasDecimals(this.lastOperation) && value == 0) {
            this.lastOperation += value
          } else {
            this.lastOperation = parseFloat(this.lastOperation + value)
          }
        }
        this.refreshDisplay()
      }
    }
  }

  showError(errorMessage) {

    // Verificar se houve parâmetro informado
    errorMessage = errorMessage || ErrorMsg.GENERAL

    // Exibi mensagem de rro na tela
    this.refreshDisplay(errorMessage)
  }

  get lastOperation() {
    return this._operationElements[this._operationElements.length - 1].toString()
  }

  set lastOperation(value) {
    this._operationElements[this._operationElements.length - 1] = value
  }

  get display() {
    return this._display.innerHTML
  }

  set display(value) {
    console.log(value.toString().replace('.', '').length)
    if (value.toString().replace('.', '').length > 10) {
      this.showError(ErrorMsg.OVERFLOW)
    } else {
      this._display.innerHTML = value
    }
  }

  get displayTime() {
    return this._time.innerHTML
  }

  set displayTime(time) {
    this._time.innerHTML = time
  }

  get displayDate() {
    return this._date.innerHTML
  }

  set displayDate(date) {
    this._date.innerHTML = date
  }

  get currentDate() {
    return new Date()
  }

}
