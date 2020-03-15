import opt from './constants'
import clickAudio from '../assets/audio/click.mp3'
import soundOnIcon from '../assets/images/sound-on.png'
import soundOffIcon from '../assets/images/sound-off.png'

export default class Calculator {

  constructor() {

    // Declarar atributos e seus valores padrões
    this._time = document.querySelector('#hora')
    this._date = document.querySelector('#data')
    this._operationElements = [0]
    this._display = document.querySelector('#display')
    this._withAudio = true

    // Configurar som de clique
    this._audio = new Audio(clickAudio)

    // Executar método de inicialização da aplicação
    this.initialize()

    // Iniciar atributos que retem histórico de operações
    this._lastOperator = undefined
    this._lastOperated = undefined
    this._lastButtonPressed = undefined
  }

  initialize() {

    // Criar constante apontando para o objeto 'this'
    const self = this

    // Exibir conteúdo inicial no display
    self.refreshDateTime()
    self.refreshDisplay()

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
    this.displayTime = this.currentDate.toLocaleTimeString(opt.LOCALE)
    this.displayDate = this.currentDate.toLocaleDateString(opt.LOCALE, { day: '2-digit', month: 'long', year: 'numeric' })
  }

  refreshDisplay(value = undefined) {

    // Validar se foi passado parâmetro
    value = value || this.lastNumber.toString()

    // Tratar valor se ele for numérico
    if (!isNaN(value)) {

      // Converter valor em 'string'
      value = value.toString()

      // Verificar se o valor é numérico e ajustar separador decimal
      value = this.addDecimalSep(value)

      // Salvar propriedades do valor
      const integerLen = value.indexOf(opt.DECIMAL_SEP)
      const decimalLen = value.substr(integerLen + 1, opt.MAX_LENGTH - integerLen).length

      // Retornar erro se número de casas inteiras forem superior ao máximo
      if (integerLen > opt.MAX_LENGTH) {
        this.throwError(opt.ErrorMsg.OVERFLOW)
        return

      // Arredondar casas decimais para caber na tela
      } else if (decimalLen >= 0) {

        value = parseFloat(parseFloat(value).toFixed(decimalLen))
      }

      // Verificar se o valor é numérico e ajustar separador decimal
      value = this.addDecimalSep(value)
    }

    // Exibir valor na tela
    this.display = value
  }

  addDecimalSep(value) {

    // Verificar se o valor é numérico e ajustar separador decimal
    if (!this.hasDecimals(value)) {
      value = value + opt.DECIMAL_SEP
    }
    return value
  }

  hasDecimals(string) {

    // Contar o número de separadores decimais do parâmetro
    return (string.toString().indexOf(opt.DECIMAL_SEP) > -1)
  }

  initAudioEvent() {

    // Criar constante apontando para o objeto 'this'
    const self = this

    // Criar evento para ligar e desligar o som das teclas
    const img = document.getElementById('toggle-audio')
    img.addEventListener('click', event => {
      self._withAudio = !self._withAudio

      // Alternar ícone de som
      if (self._withAudio) {
        self.playAudio()
        img.src = soundOnIcon
      } else {
        img.src = soundOffIcon
      }
    })
  }

  initButtonsEvents() {

    // Criar constante apontando para o objeto 'this'
    const self = this

    // Capturar todos os elementos HTML relacionados aos botões
    const buttons = document.querySelectorAll('#buttons > g, #parts > g')

    // Iterar sobre tipos de evento de clique do mouse
    ;['click', 'drag'].forEach(event => {

      // Iterar sobre os elementos, configurando o evento
      buttons.forEach(button => {

        // Definir evento para cliques simples e longos
        button.addEventListener(event, function() {

          // Retornar valor de elemento clicado
          const textButton = button.className.baseVal.replace('btn-', '')
          self.pressButton(textButton)
        })
      })
    })

    // Iterar sobre tipos de evento de ponteiro do mouse
    ;['mouseover', 'mouseup', 'mousedown'].forEach(event => {

      // Iterar sobre os elementos, configurando o evento
      buttons.forEach(button => {

        // Exibir ponteiro de 'clicável' quando mouse passar sobre botões
        button.addEventListener(event, function() {
          button.style.cursor = 'pointer'
        })
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
      if (event.ctrlKey && key === 'c') {
        self.playAudio()
        self.copyFromDisplay()
      } else {
        self.pressButton(opt.KEYS_MAP[key])
      }
    })

    // Definir evento de colagem de texto da Área de Transferência
    document.addEventListener('paste', event => {
      const content = event.clipboardData.getData('Text')

      // Validar texto colado como número
      if (isNaN(content)) {
        alert(`Você está tentando colar conteúdo que não é numérico:\n"${content}"`)
      } else {
        self.playAudio()
        self.captureOperation(content)
        self.refreshDisplay()
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

    // Verificar se foi pressionada uma tecla válida
    if (buttonText in opt.BUTTONS_MAP) {

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
        case 'porcento':
          this.calculate(opt.BUTTONS_MAP[buttonText])
          break
        default:
          this.captureOperation(opt.BUTTONS_MAP[buttonText])
      }

      // Registrar ultimo botão pressionado e atualizar display
      this._lastButtonPressed = opt.BUTTONS_MAP[buttonText]
      this.refreshDisplay()
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
    this._lastOperator = undefined
    this._lastOperated = undefined
  }

  clearEntry() {

    // Apaga o último registro de operações
    if (this._operationElements.length === 1) {
      this.clearAll()
    } else if (this._operationElements.length === 3) {
      this._operationElements[2] = 0
    }
  }

  calculate(operation) {

    // Verificar se parâmetro contém valor aceitável
    if (opt.OP_TRIGGERS.indexOf(operation) === -1) {
      return
    }

    // Declarar função para avaliar se a operação realizará divisão por 0 (zero)
    const isDividingByZero = () => {
      // eslint-disable-next-line eqeqeq
      if (this._operationElements[1] === '/' && this._operationElements[2] == 0) {
        this._operationElements = [0]
        this.throwError(opt.ErrorMsg.DIV_0)
        return true
      }
      return false
    }

    // Avaliar se trata-se de repetição da última operação
    if (opt.OP_TRIGGERS.indexOf(this._lastButtonPressed) > -1 && operation === '=') {
      this.pushOperation(this._lastOperator)
      this.pushOperation(this._lastOperated)
    }

    // Declarar variáveis locais
    const len = this._operationElements.length
    let result
    switch (len) {

      case 1:
        if (operation === '%') {
          result = this._operationElements[0] / 100
        } else if (operation === '=') {
          result = this._operationElements[0]
        }
        break

      case 2:
        this._operationElements.push(this._operationElements[0])
        // falls through

      case 3:
        if (isDividingByZero()) {
          return
        }

        if (operation === '%') {
          if (opt.ADD_SUB.indexOf(this._operationElements[1]) > -1) {
            this._operationElements[2] = this._operationElements[0] * this._operationElements[2] / 100
          } else {
            this._operationElements[2] = this._operationElements[2] / 100
          }
        }

        // Salvar últimas operações
        this._lastOperator = this._operationElements[1]
        this._lastOperated = this._operationElements[2]

        // Fazer o parse dos dos elementos da operação e executar cálculo
        result = eval(this._operationElements.join(''))
    }

    // Salvar resultado como elemento de operações
    this._operationElements = [result]
  }

  throwError(errorMessage = undefined) {

    // Verificar se houve parâmetro informado
    errorMessage = errorMessage || opt.ErrorMsg.GENERAL

    // Exibi mensagem de rro na tela
    this.refreshDisplay(errorMessage)
  }

  captureOperation(value) {

    // Se o último elemento da operação for um operador aritmético
    if (this.isOperator(this.lastOperationElement)) {

      // Substituir operador aritmético se input for também um operador aritmético
      if (this.isOperator(value)) {
        this.lastOperationElement = value

      // Inserir '0.' como novo elemento da operação se o input for o separador decimal
      } else if (value === opt.DECIMAL_SEP) {
        this.pushOperation('0' + opt.DECIMAL_SEP)

      // Adicionar novo elemento à operação como número, se um número foi digitado
      } else if (!isNaN(value)) {
        this.pushOperation(parseInt(value))
      }

    // Se o último elemento da operação for um 'number'
    } else if (!isNaN(this.lastOperationElement)) {

      // Adicionar input operador como novo elemento da operação
      if (this.isOperator(value)) {
        this.pushOperation(value)

      // Reiniciar operação se o último valor é resultado de outra operação
      } else if (this._lastButtonPressed === '=' && !isNaN(value)) {

        // Inserir '0.' como novo elemento da operação se o input for o separador decimal
        if (value === opt.DECIMAL_SEP) {
          this._operationElements = ['0' + opt.DECIMAL_SEP]

        // Adicionar novo elemento à operação como número, se um número foi digitado
        } else if (!isNaN(value)) {
          this._operationElements = [parseInt(value)]
        }

      // Concatenar input separador decimal se ainda não há separadores no valor atual
      } else if (value === opt.DECIMAL_SEP && !this.hasDecimals(this.lastOperationElement)) {
        this.lastOperationElement += value

      // Concatenar input numérico ao valor atual
      } else if (!isNaN(value)) {

        // Se o input já tem valores decimais, simplesmente concatenar
        // eslint-disable-next-line eqeqeq
        if (value == 0 && this.hasDecimals(this.lastOperationElement)) {
          this.lastOperationElement += value

        // Caso contrário, fazer o parse para 'string' e concatenar
        } else {
          this.lastOperationElement = parseFloat(this.lastOperationElement + value)
        }
      }
    }
  }

  isOperator(value) {

    // Avaliar se o parâmetro é um operador aritmético
    return (opt.OP_SYMBOLS.indexOf(value) > -1)
  }

  pushOperation(value) {

    // Dr já há 3 elementos na operação, calculá-la antes
    if (this._operationElements.length === 3) {
      this.calculate('=')
    }

    // Adicionar elemento à operação
    this._operationElements.push(value)
  }

  get lastNumber() {

    // Retornar último elemento numérico
    if (2 in this._operationElements) {
      return this._operationElements[2]
    }
    return this._operationElements[0]
  }

  get lastOperationElement() {

    // Retornar valor do último elemento da operação
    return this._operationElements[this._operationElements.length - 1].toString()
  }

  set lastOperationElement(value) {

    // Definir valor do último elemento da operação
    this._operationElements[this._operationElements.length - 1] = value
  }

  get display() {

    // Retornar valor impresso no display
    return this._display.innerHTML
  }

  set display(value) {

    // Inserir valor no elemento HTML
    this._display.innerHTML = value
  }

  set displayTime(time) {

    // ColocarPosicionar hora em elemento HTML
    this._time.innerHTML = time
  }

  set displayDate(date) {

    // ColocarPosicionar data em elemento HTML
    this._date.innerHTML = date
  }

  // Retornar objeto 'Date' com a data e hora atuais
  get currentDate() {
    return new Date()
  }
}
