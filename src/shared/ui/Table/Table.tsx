import type { ReactNode } from 'react'

import * as styles from './Table.css'

export type TableAlign = 'left' | 'center' | 'right'

export type TableColumn<T> = {
  key: string
  header: ReactNode
  render: (row: T) => ReactNode
  align?: TableAlign
  width?: string
}

export type TableProps<T> = {
  columns: TableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  emptyMessage?: string
  className?: string
}

export function Table<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = '데이터가 없습니다.',
  className,
}: TableProps<T>) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(({ key, header, align = 'left', width }) => (
              <th
                key={key}
                className={styles.headerCell[align]}
                style={width ? { width } : undefined}
                scope="col"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className={styles.emptyCell} colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={rowKey(row)} className={styles.row}>
                {columns.map(({ key, render, align = 'left' }) => (
                  <td key={key} className={styles.cell[align]}>
                    {render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
