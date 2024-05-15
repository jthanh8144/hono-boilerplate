import crypto from 'crypto'
import {
  DefaultNamingStrategy,
  type NamingStrategyInterface,
  type Table,
} from 'typeorm'

class CustomNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _referencedColumnNames?: string[],
  ): string {
    tableOrName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name

    const name = columnNames.reduce(
      (name, column) => `${name}_${column}`,
      `public.${tableOrName}_${referencedTablePath}`,
    )

    return `fk_${crypto.createHash('md5').update(name).digest('hex')}`
  }
}

const customNamingStrategy = new CustomNamingStrategy()

export default customNamingStrategy
