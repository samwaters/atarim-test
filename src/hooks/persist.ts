import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchResults } from "../api/types.ts"
import { getCities, hydrateCities } from "../store/dashboard.reducer.ts"

const DASHBOARD_KEY = "DASHBOARD"

export const usePersist = () => {
  const cities = useSelector(getCities)
  const dispatch = useDispatch()
  const [persistEnabled, setPersistEnabled] = useState(false)

  useEffect(() => {
    if (persistEnabled) {
      window.localStorage.setItem(DASHBOARD_KEY, JSON.stringify(cities))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities])

  const disablePersist = () => {
    setPersistEnabled(false)
  }

  const enablePersist = () => {
    setPersistEnabled(true)
  }

  const hydrate = () => {
    const storedDashboard = window.localStorage.getItem(DASHBOARD_KEY)
    try {
      const parsed: SearchResults[] = JSON.parse(storedDashboard ?? "[]")
      if (!parsed) return
      dispatch(hydrateCities(parsed))
    } catch {
      console.warn("Could not parse persisted state, clearing")
      window.localStorage.setItem(DASHBOARD_KEY, JSON.stringify([]))
    }
  }

  return {
    disablePersist,
    enablePersist,
    hydrate,
  }
}
