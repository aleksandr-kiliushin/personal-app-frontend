import React, { useState } from 'react'
import cx from 'classnames'

import { useAppDispatch } from '#utils/hooks'
import { deleteRecordTc } from '#models/finance'
import { restoreRecordTc } from '#models/finance'
import { Svg } from '#components/Svg'
import { TableRow } from '#components/Table/TableRow'
import { TableCell } from '#components/Table/TableCell'
import { RecordModal } from '#views/records/RecordModal'
import s from './index.module.css'
import { IFinanceCategory, IFinanceRecord } from '#interfaces/finance'

export const RecordTableRow = ({ categories, isTrash, record }: IProps) => {
  const dispatch = useAppDispatch()

  const [isRecordEditingModalShown, setIsRecordEditingModalShown] = useState(false)

  const { amount, date, category } = record

  const editOrRestoreTableCell = isTrash ? (
    <TableCell onClick={() => dispatch(restoreRecordTc({ recordId: record.id }))}>
      <Svg name="reply" />
    </TableCell>
  ) : (
    <TableCell onClick={() => setIsRecordEditingModalShown(true)}>
      <Svg name="pencil" />
    </TableCell>
  )

  const cxAmountTableCell = cx({
    [s.ExpenseTableCell]: category.type.id === 1,
    [s.IncomeTableCell]: category.type.id === 2,
  })

  return (
    <>
      <TableRow cnTableRow={s.TableRow}>
        <TableCell cnTableCell={cxAmountTableCell}>{amount}</TableCell>
        <TableCell>{category.name}</TableCell>
        <TableCell>{date.slice(2)}</TableCell>
        {editOrRestoreTableCell}
        <TableCell onClick={() => dispatch(deleteRecordTc(record))}>
          <Svg name="trash-can" />
        </TableCell>
      </TableRow>

      {isRecordEditingModalShown && (
        <RecordModal
          categories={categories}
          closeModal={() => setIsRecordEditingModalShown(false)}
          record={record}
        />
      )}
    </>
  )
}

interface IProps {
  categories: IFinanceCategory[]
  isTrash: boolean
  record: IFinanceRecord
}
