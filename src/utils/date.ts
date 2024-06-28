const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const getDayTime = (timestamp: number, timeZone: string) => {
  return new Date(timestamp * 1000).toLocaleString("en-GB", { timeZone, weekday: "long", hour: "numeric", minute: "numeric" })
}

export const getShortDay = (d: Date) => {
  return days[d.getUTCDay()].substring(0, 3)
}
