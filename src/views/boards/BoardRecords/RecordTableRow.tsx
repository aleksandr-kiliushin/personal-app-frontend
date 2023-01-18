import {
  DeleteOutline as DeleteOutlineIcon,
  EditOutlined as EditOutlinedIcon,
  Restore as RestoreIcon,
} from "@mui/icons-material"
import { Button, TableCell, TableRow } from "@mui/material"
import React from "react"
import { Link, useLocation, useParams } from "react-router-dom"

import { useDeleteBudgetRecordMutation, useUpdateBudgetRecordMutation } from "#api/budget"
import { Board, BudgetCategory, BudgetRecord, Currency } from "#api/types"
import { theme } from "#styles/theme"

import { RecordFormDialog } from "./RecordFormDialog"

const amountSignByCategoryTypeId = new Map([
  [1, "-"],
  [2, "+"],
])

const amountColorByBudgetCategoryType = new Map([
  [1, theme.palette.error.main],
  [2, theme.palette.success.main],
])

interface IRecordTableRowProps {
  isTrash: boolean
  record: {
    amount: BudgetRecord["amount"]
    category: {
      board: Pick<Board, "id" | "name">
      id: BudgetCategory["id"]
      name: BudgetCategory["name"]
      type: BudgetCategory["type"]
    }
    currency: Currency
    date: BudgetRecord["date"]
    id: BudgetRecord["id"]
    isTrashed: BudgetRecord["isTrashed"]
  }
}

export const RecordTableRow: React.FC<IRecordTableRowProps> = ({ isTrash, record }) => {
  const location = useLocation()
  const params = useParams<{ boardId: string; recordId: string }>()

  const [deleteBudgetRecord] = useDeleteBudgetRecordMutation({
    update: (cache) => cache.modify({ fields: { budgetRecords() {} } }),
  })
  const [updateBudgetRecord] = useUpdateBudgetRecordMutation({
    update: (cache) => cache.modify({ fields: { budgetRecords() {} } }),
  })

  const mapIsTrashToActionCell = new Map([
    [
      false,
      // eslint-disable-next-line react/jsx-key
      <TableCell>
        <Button
          component={Link}
          id={`${record.date}-${record.category.type.name}-${record.category.name}-${record.amount}-edit-button`}
          size="small"
          startIcon={<EditOutlinedIcon />}
          to={`/boards/${params.boardId}/records/edit/${record.id}${location.search}`}
        />
      </TableCell>,
    ],
    [
      true,
      // eslint-disable-next-line react/jsx-key
      <TableCell>
        <Button
          color="success"
          id={`${record.date}-${record.category.type.name}-${record.category.name}-${record.amount}-restore-button`}
          onClick={() => updateBudgetRecord({ variables: { id: record.id, isTrashed: false } })}
          size="small"
          startIcon={<RestoreIcon />}
        />
      </TableCell>,
    ],
  ])

  return (
    <>
      <TableRow>
        <TableCell
          sx={{
            color: amountColorByBudgetCategoryType.get(record.category.type.id),
            "&::before": {
              content: `"${amountSignByCategoryTypeId.get(record.category.type.id)}${record.currency.symbol} "`,
            },
          }}
        >
          {record.amount}
        </TableCell>
        <TableCell>{record.category.name}</TableCell>
        <TableCell>{record.date.slice(2)}</TableCell>
        {mapIsTrashToActionCell.get(isTrash)}
        <TableCell>
          <Button
            color="error"
            id={`${record.date}-${record.category.type.name}-${record.category.name}-${record.amount}-delete-button`}
            onClick={() => {
              // TODO: Replace recordId with id.
              if (record.isTrashed) {
                deleteBudgetRecord({ variables: { recordId: record.id } })
              } else {
                updateBudgetRecord({ variables: { id: record.id, isTrashed: true } })
              }
            }}
            size="small"
            startIcon={<DeleteOutlineIcon />}
          />
        </TableCell>
      </TableRow>
      {location.pathname.endsWith(`/edit/${record.id}`) && <RecordFormDialog record={record} />}
    </>
  )
}
