
const LOCALE = 'PT-BR'
const DECIMAL_SEP = '.'
const ErrorMsg = {
  GENERAL: '#ERROR#',
  DIV_0: '#DIV 0',
  OVERFLOW: '#OVERFLOW#'
}
const OP_SYMBOLS = ['+', '-', '*', '/']
const OP_TRIGGERS = ['=', '%']
const KEYS_MAP = {
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
  'c': 'copy',
}
const BUTTONS_MAP = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'ponto': '.',
  'soma': '+',
  'subtracao': '-',
  'multiplicacao': '*',
  'divisao': '/',
  'igual': '=',
  'porcento': '%'
}
