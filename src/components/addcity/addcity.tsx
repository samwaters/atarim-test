import { Alert, Box, CircularProgress, TextField, Typography } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import { weatherApi } from "../../api/weather.ts"
import { useDebounce } from "../../hooks/debounce.ts"
import { CityItem } from "./city-item.tsx"

export const AddCity = () => {
  const [query, setQuery] = useState("")
  const [search, { data, isError, isLoading, isSuccess }] = weatherApi.useLazySearchQuery()

  const fetchSearchResults = () => {
    if (query === "") return
    search(query)
  }

  const debouncedFetch = useDebounce(fetchSearchResults, 500)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    debouncedFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
      {isError && !isLoading && <Alert severity="warning">Something went wrong, please try again</Alert>}
      <TextField autoFocus onChange={handleSearchChange} fullWidth placeholder="Start typing city name" size="small" value={query} />
      <Box sx={{ alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
        {isLoading && <CircularProgress size={25} />}
        <Box sx={{ width: "100%" }}>
          {!isLoading && (data ?? []).map((d) => <CityItem city={d} key={d.id} />)}
          {!isLoading && isSuccess && data.length === 0 && (
            <Typography variant="body2" component="div">
              No results found, try a different search term
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
