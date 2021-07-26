import currency from 'currency.js'

import { CurrencyProtocol } from '../protocols/currency-protocol'

class CurrencyJsProvider implements CurrencyProtocol {
  public add (values: number[]): number {
    const result = values.reduce((accumulator, value) => currency(accumulator).add(value).value, 0)

    return result
  }

  public subtract (values: number[]): number {
    const result = values.reduce((accumulator, value) => currency(accumulator).subtract(value).value)

    return result
  }

  public getValue (value: number | string): number {
    const result = currency(value).value

    return result
  }
}

export { CurrencyJsProvider }
