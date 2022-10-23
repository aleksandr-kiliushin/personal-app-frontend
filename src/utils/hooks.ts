import { useDispatch } from "react-redux"

import type { AppDispatch } from "#models/store"

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
