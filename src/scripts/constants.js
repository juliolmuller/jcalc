/*
 * Definir constantes globais
 */
export default {
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
    'ac': 'ac',
    'ce': 'ce',
    'ponto': '.',
    'soma': '+',
    'subtracao': '-',
    'multiplicacao': '*',
    'divisao': '/',
    'igual': '=',
    'porcento': '%'
  }
}
