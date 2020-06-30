// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * Definir constantes globais
 */
var _default = {
  LOCALE: 'PT-BR',
  DECIMAL_SEP: '.',
  MAX_LENGTH: 10,
  ErrorMsg: {
    GENERAL: '#ERROR#',
    DIV_0: '#DIV 0#',
    OVERFLOW: '#OVERFLOW#'
  },
  ADD_SUB: ['+', '-'],
  MUL_DIV: ['*', '/'],
  OP_SYMBOLS: ['+', '-', '*', '/'],
  OP_TRIGGERS: ['=', '%'],
  KEYS_MAP: {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '.': 'ponto',
    ',': 'ponto',
    '+': 'soma',
    '-': 'subtracao',
    '*': 'multiplicacao',
    '/': 'divisao',
    '=': 'igual',
    'enter': 'igual',
    '%': 'porcento',
    'escape': 'ac',
    'backspace': 'ce',
    'delete': 'ce',
    'c': 'copy'
  },
  BUTTONS_MAP: {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    ac: 'ac',
    ce: 'ce',
    ponto: '.',
    soma: '+',
    subtracao: '-',
    multiplicacao: '*',
    divisao: '/',
    igual: '=',
    porcento: '%'
  }
};
exports.default = _default;
},{}],"assets/audio/click.mp3":[function(require,module,exports) {
module.exports = "/click.4df8a9c9.mp3";
},{}],"assets/images/sound-on.png":[function(require,module,exports) {
module.exports = "/sound-on.e7107450.png";
},{}],"assets/images/sound-off.png":[function(require,module,exports) {
module.exports = "/sound-off.df89678c.png";
},{}],"scripts/Calculator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = _interopRequireDefault(require("./constants"));

var _click = _interopRequireDefault(require("../assets/audio/click.mp3"));

var _soundOn = _interopRequireDefault(require("../assets/images/sound-on.png"));

var _soundOff = _interopRequireDefault(require("../assets/images/sound-off.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator = /*#__PURE__*/function () {
  function Calculator() {
    _classCallCheck(this, Calculator);

    // Declarar atributos e seus valores padrões
    this._time = document.querySelector('#hora');
    this._date = document.querySelector('#data');
    this._operationElements = [0];
    this._display = document.querySelector('#display');
    this._withAudio = true; // Configurar som de clique

    this._audio = new Audio(_click.default); // Executar método de inicialização da aplicação

    this.initialize(); // Iniciar atributos que retem histórico de operações

    this._lastOperator = undefined;
    this._lastOperated = undefined;
    this._lastButtonPressed = undefined;
  }

  _createClass(Calculator, [{
    key: "initialize",
    value: function initialize() {
      // Criar constante apontando para o objeto 'this'
      var self = this; // Exibir conteúdo inicial no display

      self.refreshDateTime();
      self.refreshDisplay(); // Executar 'refresh' do relógio

      setInterval(function () {
        return self.refreshDateTime();
      }, 1000); // Configurar eventos de clique e teclado

      self.initAudioEvent();
      self.initButtonsEvents();
      self.initKeyboardEvents();
    }
  }, {
    key: "refreshDateTime",
    value: function refreshDateTime() {
      // Chamar data e hora atuais e formatá-las
      this.displayTime = this.currentDate.toLocaleTimeString(_constants.default.LOCALE);
      this.displayDate = this.currentDate.toLocaleDateString(_constants.default.LOCALE, {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
  }, {
    key: "refreshDisplay",
    value: function refreshDisplay(value) {
      // Validar se foi passado parâmetro
      value = value || this.lastNumber.toString(); // Tratar valor se ele for numérico

      if (!Number.isNaN(value)) {
        // Converter valor em 'string'
        value = value.toString(); // Verificar se o valor é numérico e ajustar separador decimal

        value = this.addDecimalSep(value); // Salvar propriedades do valor

        var integerLen = value.indexOf(_constants.default.DECIMAL_SEP);
        var decimalLen = value.substr(integerLen + 1, _constants.default.MAX_LENGTH - integerLen).length; // Retornar erro se número de casas inteiras forem superior ao máximo

        if (integerLen > _constants.default.MAX_LENGTH) {
          this.throwError(_constants.default.ErrorMsg.OVERFLOW);
          return; // Arredondar casas decimais para caber na tela
        }

        if (decimalLen >= 0) {
          value = parseFloat(parseFloat(value).toFixed(decimalLen));
        } // Verificar se o valor é numérico e ajustar separador decimal


        value = this.addDecimalSep(value);
      } // Exibir valor na tela


      this.display = value;
    }
  }, {
    key: "addDecimalSep",
    value: function addDecimalSep(value) {
      // Verificar se o valor é numérico e ajustar separador decimal
      if (!this.hasDecimals(value)) {
        value += _constants.default.DECIMAL_SEP;
      }

      return value;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "hasDecimals",
    value: function hasDecimals(string) {
      // Contar o número de separadores decimais do parâmetro
      return string.toString().indexOf(_constants.default.DECIMAL_SEP) > -1;
    }
  }, {
    key: "initAudioEvent",
    value: function initAudioEvent() {
      // Criar constante apontando para o objeto 'this'
      var self = this; // Criar evento para ligar e desligar o som das teclas

      var img = document.getElementById('toggle-audio');
      img.addEventListener('click', function () {
        self._withAudio = !self._withAudio; // Alternar ícone de som

        if (self._withAudio) {
          self.playAudio();
          img.src = _soundOn.default;
        } else {
          img.src = _soundOff.default;
        }
      });
    }
  }, {
    key: "initButtonsEvents",
    value: function initButtonsEvents() {
      // Criar constante apontando para o objeto 'this'
      var self = this; // Capturar todos os elementos HTML relacionados aos botões

      var buttons = document.querySelectorAll('#buttons > g, #parts > g') // Iterar sobre tipos de evento de clique do mouse
      ;
      ['click', 'drag'].forEach(function (event) {
        // Iterar sobre os elementos, configurando o evento
        buttons.forEach(function (button) {
          // Definir evento para cliques simples e longos
          button.addEventListener(event, function () {
            // Retornar valor de elemento clicado
            var textButton = button.className.baseVal.replace('btn-', '');
            self.pressButton(textButton);
          });
        });
      }) // Iterar sobre tipos de evento de ponteiro do mouse
      ;
      ['mouseover', 'mouseup', 'mousedown'].forEach(function (event) {
        // Iterar sobre os elementos, configurando o evento
        buttons.forEach(function (button) {
          // Exibir ponteiro de 'clicável' quando mouse passar sobre botões
          button.addEventListener(event, function () {
            button.style.cursor = 'pointer';
          });
        });
      });
    }
  }, {
    key: "initKeyboardEvents",
    value: function initKeyboardEvents() {
      // Criar constante apontando para o objeto 'this'
      var self = this; // Definir evento de teclas pressionada do teclado

      document.addEventListener('keyup', function (event) {
        // Chamar botão equivalente (ver constante 'KEYS_MAP')
        var key = event.key.toLowerCase();

        if (event.ctrlKey && key === 'c') {
          self.playAudio();
          self.copyFromDisplay();
        } else {
          self.pressButton(_constants.default.KEYS_MAP[key]);
        }
      }); // Definir evento de colagem de texto da Área de Transferência

      document.addEventListener('paste', function (event) {
        var content = event.clipboardData.getData('Text'); // Validar texto colado como número

        if (Number.isNaN(content)) {
          // eslint-disable-next-line no-alert
          alert("Voc\xEA est\xE1 tentando colar conte\xFAdo que n\xE3o \xE9 num\xE9rico:\n\"".concat(content, "\""));
        } else {
          self.playAudio();
          self.captureOperation(content);
          self.refreshDisplay(); // eslint-disable-next-line no-console

          console.log('Conteúdo colado com sucesso!');
        }
      });
    }
  }, {
    key: "copyFromDisplay",
    value: function copyFromDisplay() {
      // Criar um elemento HTML para armazenar o valor do display
      var input = document.createElement('input');
      document.body.appendChild(input); // Copiar conteúdo do display para o 'input'

      input.value = parseFloat(this.display); // Selecionar conteúdo e copiar para a Área de Transferência

      input.select();
      document.execCommand('Copy'); // Excluir elemento HTML

      input.remove();
      console.log('Conteúdo copiado com sucesso!');
    }
  }, {
    key: "pressButton",
    value: function pressButton(buttonText) {
      // Verificar se foi pressionada uma tecla válida
      if (buttonText in _constants.default.BUTTONS_MAP) {
        // Executar son de clique (se ativado)
        this.playAudio(); // Executar ação a partir de tecla selecionada

        switch (buttonText) {
          case 'ac':
            this.clearAll();
            break;

          case 'ce':
            this.clearEntry();
            break;

          case 'igual':
          case 'porcento':
            this.calculate(_constants.default.BUTTONS_MAP[buttonText]);
            break;

          default:
            this.captureOperation(_constants.default.BUTTONS_MAP[buttonText]);
        } // Registrar ultimo botão pressionado e atualizar display


        this._lastButtonPressed = _constants.default.BUTTONS_MAP[buttonText];
        this.refreshDisplay();
      }
    }
  }, {
    key: "playAudio",
    value: function playAudio() {
      // Verificar se o interruptor de aúdio está ligado
      if (this._withAudio) {
        // Colocar 'agulha' de áudio na posição zero
        this._audio.currentTime = 0;

        this._audio.play();
      }
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      // Apaga todos os registros de operações
      this._operationElements = [0];
      this._lastOperator = undefined;
      this._lastOperated = undefined;
    }
  }, {
    key: "clearEntry",
    value: function clearEntry() {
      // Apaga o último registro de operações
      if (this._operationElements.length === 1) {
        this.clearAll();
      } else if (this._operationElements.length === 3) {
        this._operationElements[2] = 0;
      }
    }
  }, {
    key: "calculate",
    value: function calculate(operation) {
      var _this = this;

      // Verificar se parâmetro contém valor aceitável
      if (_constants.default.OP_TRIGGERS.indexOf(operation) === -1) {
        return;
      } // Declarar função para avaliar se a operação realizará divisão por 0 (zero)


      var isDividingByZero = function isDividingByZero() {
        // eslint-disable-next-line eqeqeq
        if (_this._operationElements[1] === '/' && _this._operationElements[2] == 0) {
          _this._operationElements = [0];

          _this.throwError(_constants.default.ErrorMsg.DIV_0);

          return true;
        }

        return false;
      }; // Avaliar se trata-se de repetição da última operação


      if (_constants.default.OP_TRIGGERS.indexOf(this._lastButtonPressed) > -1 && operation === '=') {
        this.pushOperation(this._lastOperator);
        this.pushOperation(this._lastOperated);
      } // Declarar variáveis locais


      var len = this._operationElements.length;
      var result;

      switch (len) {
        case 1:
          if (operation === '%') {
            result = this._operationElements[0] / 100;
          } else if (operation === '=') {
            var _this$_operationEleme = _slicedToArray(this._operationElements, 1);

            result = _this$_operationEleme[0];
          }

          break;

        case 2:
          this._operationElements.push(this._operationElements[0]);

        /* falls through */

        case 3:
          if (isDividingByZero()) {
            return;
          }

          if (operation === '%') {
            if (_constants.default.ADD_SUB.indexOf(this._operationElements[1]) > -1) {
              this._operationElements[2] = this._operationElements[0] * this._operationElements[2] / 100;
            } else {
              this._operationElements[2] /= 100;
            }
          } // Salvar últimas operações


          var _this$_operationEleme2 = _slicedToArray(this._operationElements, 3);

          this._lastOperator = _this$_operationEleme2[1];
          this._lastOperated = _this$_operationEleme2[2];
          // Fazer o parse dos dos elementos da operação e executar cálculo
          // eslint-disable-next-line no-eval
          result = eval(this._operationElements.join(''));
          break;

        default:
        /* do nothing */

      } // Salvar resultado como elemento de operações


      this._operationElements = [result];
    }
  }, {
    key: "throwError",
    value: function throwError() {
      var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      // Verificar se houve parâmetro informado
      errorMessage = errorMessage || _constants.default.ErrorMsg.GENERAL; // Exibi mensagem de rro na tela

      this.refreshDisplay(errorMessage);
    }
  }, {
    key: "captureOperation",
    value: function captureOperation(value) {
      // Se o último elemento da operação for um operador aritmético
      if (this.isOperator(this.lastOperationElement)) {
        // Substituir operador aritmético se input for também um operador aritmético
        if (this.isOperator(value)) {
          this.lastOperationElement = value; // Inserir '0.' como novo elemento da operação se o input for o separador decimal
        } else if (value === _constants.default.DECIMAL_SEP) {
          this.pushOperation("0".concat(_constants.default.DECIMAL_SEP)); // Adicionar novo elemento à operação como número, se um número foi digitado
        } else if (!Number.isNaN(value)) {
          this.pushOperation(parseInt(value, 10));
        } // Se o último elemento da operação for um 'number'

      } else if (!Number.isNaN(this.lastOperationElement)) {
        // Adicionar input operador como novo elemento da operação
        if (this.isOperator(value)) {
          this.pushOperation(value); // Reiniciar operação se o último valor é resultado de outra operação
        } else if (this._lastButtonPressed === '=' && !Number.isNaN(value)) {
          // Inserir '0.' como novo elemento da operação se o input for o separador decimal
          if (value === _constants.default.DECIMAL_SEP) {
            this._operationElements = ["0".concat(_constants.default.DECIMAL_SEP)]; // Adicionar novo elemento à operação como número, se um número foi digitado
          } else if (!Number.isNaN(value)) {
            this._operationElements = [parseInt(value, 10)];
          } // Concatenar input separador decimal se ainda não há separadores no valor atual

        } else if (value === _constants.default.DECIMAL_SEP && !this.hasDecimals(this.lastOperationElement)) {
          this.lastOperationElement += value; // Concatenar input numérico ao valor atual
        } else if (!Number.isNaN(value)) {
          // Se o input já tem valores decimais, simplesmente concatenar
          // eslint-disable-next-line eqeqeq
          if (value == 0 && this.hasDecimals(this.lastOperationElement)) {
            this.lastOperationElement += value; // Caso contrário, fazer o parse para 'string' e concatenar
          } else {
            this.lastOperationElement = parseFloat(this.lastOperationElement + value);
          }
        }
      }
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "isOperator",
    value: function isOperator(value) {
      // Avaliar se o parâmetro é um operador aritmético
      return _constants.default.OP_SYMBOLS.indexOf(value) > -1;
    }
  }, {
    key: "pushOperation",
    value: function pushOperation(value) {
      // Dr já há 3 elementos na operação, calculá-la antes
      if (this._operationElements.length === 3) {
        this.calculate('=');
      } // Adicionar elemento à operação


      this._operationElements.push(value);
    }
  }, {
    key: "lastNumber",
    get: function get() {
      // Retornar último elemento numérico
      if (2 in this._operationElements) {
        return this._operationElements[2];
      }

      return this._operationElements[0];
    }
  }, {
    key: "lastOperationElement",
    get: function get() {
      // Retornar valor do último elemento da operação
      return this._operationElements[this._operationElements.length - 1].toString();
    },
    set: function set(value) {
      // Definir valor do último elemento da operação
      this._operationElements[this._operationElements.length - 1] = value;
    }
  }, {
    key: "display",
    get: function get() {
      // Retornar valor impresso no display
      return this._display.innerHTML;
    },
    set: function set(value) {
      // Inserir valor no elemento HTML
      this._display.innerHTML = value;
    }
  }, {
    key: "displayTime",
    set: function set(time) {
      // ColocarPosicionar hora em elemento HTML
      this._time.innerHTML = time;
    }
  }, {
    key: "displayDate",
    set: function set(date) {
      // ColocarPosicionar data em elemento HTML
      this._date.innerHTML = date;
    } // Retornar objeto 'Date' com a data e hora atuais
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "currentDate",
    get: function get() {
      return new Date();
    }
  }]);

  return Calculator;
}();

exports.default = Calculator;
},{"./constants":"scripts/constants.js","../assets/audio/click.mp3":"assets/audio/click.mp3","../assets/images/sound-on.png":"assets/images/sound-on.png","../assets/images/sound-off.png":"assets/images/sound-off.png"}],"scripts/main.js":[function(require,module,exports) {
"use strict";

var _Calculator = _interopRequireDefault(require("./Calculator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _Calculator.default();
},{"./Calculator":"scripts/Calculator.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "22222" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/main.js"], null)
//# sourceMappingURL=/main.d8ebb8d6.js.map