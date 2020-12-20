import opt from './constants'
import clickAudio from './assets/audio/click.mp3'
import soundOnIcon from './assets/images/sound-on.png'
import soundOffIcon from './assets/images/sound-off.png'

class Calculator {
  constructor() {
    this.timeElement = document.getElementById('hora')
    this.dateElement = document.getElementById('data')
    this.displayElement = document.getElementById('display')
    this.operationParts = [0]
    this.lastPressedButton = undefined
    this.lastOperator = undefined
    this.lastOperated = undefined
    this.sound = new Audio(clickAudio)
    this.soundEnabled = true

    this.initialize()
  }

  initialize() {
    this.refreshDateTime()
    this.refreshDisplay()

    setInterval(() => this.refreshDateTime(), 1000)

    this.initAudioEvent()
    this.initButtonsEvents()
    this.initKeyboardEvents()
  }

  refreshDateTime() {
    const now = new Date()

    this.timeElement.innerHTML = now.toLocaleTimeString(opt.LOCALE)
    this.dateElement.innerHTML = now.toLocaleDateString(opt.LOCALE, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  refreshDisplay(value) {
    value = value || this.lastNumber.toString()

    if (!isNaN(value)) {
      value = value.toString()
      value = this.addDecimalSep(value)

      const integerLen = value.indexOf(opt.DECIMAL_SEP)
      const decimalLen = value.substr(integerLen + 1, opt.MAX_LENGTH - integerLen).length

      if (integerLen > opt.MAX_LENGTH) {
        this.throwError(opt.ErrorMsg.OVERFLOW)
        return
      }
      if (decimalLen >= 0) {
        value = parseFloat(parseFloat(value).toFixed(decimalLen))
      }

      value = this.addDecimalSep(value)
    }

    this.display = value
  }

  addDecimalSep(value) {
    if (!this.hasDecimals(value)) {
      value += opt.DECIMAL_SEP
    }

    return value
  }

  hasDecimals(string) {
    return (string.toString().indexOf(opt.DECIMAL_SEP) > -1)
  }

  initAudioEvent() {
    const imgElement = document.getElementById('toggle-audio')

    imgElement.onclick = () => {
      this.soundEnabled = !this.soundEnabled

      if (this.soundEnabled) {
        this.playAudio()
        imgElement.src = soundOnIcon
      } else {
        imgElement.src = soundOffIcon
      }
    }
  }

  initButtonsEvents() {
    const buttons = document.querySelectorAll('#buttons > g, #parts > g')
    const mouseEvents = ['onmouseover', 'onmouseup', 'onmousedown']
    const actionEvents = ['onclick', 'ondrag']

    buttons.forEach((button) => {
      mouseEvents.forEach((eventType) => {
        button[eventType] = () => {
          button.style.cursor = 'pointer'
        }
      })

      actionEvents.forEach((eventType) => {
        button[eventType] = () => {
          const textButton = button.className.baseVal.replace('btn-', '')

          this.pressButton(textButton)
        }
      })
    })
  }

  initKeyboardEvents() {
    document.onkeyup = (event) => {
      const key = event.key.toLowerCase()

      if (event.ctrlKey && key === 'c') {
        this.playAudio()
        this.copyFromDisplay()
      } else {
        this.pressButton(opt.KEYS_MAP[key])
      }
    }

    document.onpaste = (event) => {
      const content = event.clipboardData.getData('Text')

      if (isNaN(content)) {
        alert(`Você está tentando colar um conteúdo não-numérico: "${content}"`)
      } else {
        this.playAudio()
        this.captureOperation(content)
        this.refreshDisplay()

        // eslint-disable-next-line no-console
        console.log('Conteúdo colado com sucesso!')
      }
    }
  }

  copyFromDisplay() {
    const input = document.createElement('input')

    document.body.appendChild(input)
    input.value = parseFloat(this.display)
    input.select()
    document.execCommand('Copy')
    input.remove()

    // eslint-disable-next-line no-console
    console.log('Conteúdo copiado com sucesso!')
  }

  pressButton(buttonText) {
    if (buttonText in opt.BUTTONS_MAP) {
      this.playAudio()

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

      this.lastPressedButton = opt.BUTTONS_MAP[buttonText]
      this.refreshDisplay()
    }
  }

  playAudio() {
    if (this.soundEnabled) {
      this.sound.currentTime = 0
      this.sound.play()
    }
  }

  clearAll() {
    this.operationParts = [0]
    this.lastOperator = undefined
    this.lastOperated = undefined
  }

  clearEntry() {
    if (this.operationParts.length === 1) {
      this.clearAll()
    } else if (this.operationParts.length === 3) {
      this.operationParts[2] = 0
    }
  }

  calculate(operation) {
    if (opt.OP_TRIGGERS.indexOf(operation) === -1) {
      return
    }

    const isDividingByZero = () => {
      // eslint-disable-next-line eqeqeq
      if (this.operationParts[1] === '/' && this.operationParts[2] == 0) {
        this.operationParts = [0]
        this.throwError(opt.ErrorMsg.DIV_0)
        return true
      }

      return false
    }

    if (opt.OP_TRIGGERS.indexOf(this.lastPressedButton) > -1 && operation === '=') {
      this.pushOperation(this.lastOperator)
      this.pushOperation(this.lastOperated)
    }

    let result
    const len = this.operationParts.length

    switch (len) {
      case 1:
        if (operation === '%') {
          result = this.operationParts[0] / 100
        } else if (operation === '=') {
          [result] = this.operationParts
        }
        break

      case 2:
        this.operationParts.push(this.operationParts[0])
        /* falls through */

      case 3:
        if (isDividingByZero()) {
          return
        }
        if (operation === '%') {
          if (opt.ADD_SUB.indexOf(this.operationParts[1]) > -1) {
            this.operationParts[2] = (this.operationParts[0] * this.operationParts[2]) / 100
          } else {
            this.operationParts[2] /= 100
          }
        }

        [, this.lastOperator, this.lastOperated] = this.operationParts
        // eslint-disable-next-line no-eval
        result = eval(this.operationParts.join(''))
        break

      default:
        /* do nothing */
    }

    this.operationParts = [result]
  }

  throwError(errorMessage = undefined) {
    errorMessage = errorMessage || opt.ErrorMsg.GENERAL
    this.refreshDisplay(errorMessage)
  }

  captureOperation(value) {
    if (this.isOperator(this.lastOperation)) {
      if (this.isOperator(value)) {
        this.lastOperation = value
      } else if (value === opt.DECIMAL_SEP) {
        this.pushOperation(`0${opt.DECIMAL_SEP}`)
      } else if (!isNaN(value)) {
        this.pushOperation(parseInt(value, 10))
      }
    } else if (!isNaN(this.lastOperation)) {
      if (this.isOperator(value)) {
        this.pushOperation(value)
      } else if (this.lastPressedButton === '=' && !isNaN(value)) {
        if (value === opt.DECIMAL_SEP) {
          this.operationParts = [`0${opt.DECIMAL_SEP}`]
        } else if (!isNaN(value)) {
          this.operationParts = [parseInt(value, 10)]
        }
      } else if (value === opt.DECIMAL_SEP && !this.hasDecimals(this.lastOperation)) {
        this.lastOperation += value
      } else if (!isNaN(value)) {
        // eslint-disable-next-line eqeqeq
        if (value == 0 && this.hasDecimals(this.lastOperation)) {
          this.lastOperation += value
        } else {
          this.lastOperation = parseFloat(this.lastOperation + value)
        }
      }
    }
  }

  isOperator(value) {
    return (opt.OP_SYMBOLS.indexOf(value) > -1)
  }

  pushOperation(value) {
    if (this.operationParts.length === 3) {
      this.calculate('=')
    }
    this.operationParts.push(value)
  }

  get lastNumber() {
    if (2 in this.operationParts) {
      return this.operationParts[2]
    }

    return this.operationParts[0]
  }

  get lastOperation() {
    return this.operationParts[this.operationParts.length - 1].toString()
  }

  set lastOperation(value) {
    this.operationParts[this.operationParts.length - 1] = value
  }

  get display() {
    return this.displayElement.innerHTML
  }

  set display(value) {
    this.displayElement.innerHTML = value
  }
}

export default Calculator
