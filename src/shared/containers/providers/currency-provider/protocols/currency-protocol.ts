interface CurrencyProtocol {
  add: (values: number[]) => number
  subtract: (values: number[]) => number
  getValue: (value: number | string) => number
}

export { CurrencyProtocol }
