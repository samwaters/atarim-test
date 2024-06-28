import { getDayTime, getShortDay } from "../date.ts"

describe("Date Utils", () => {
  it("Gets a day/time string", () => {
    expect(getDayTime(1719521100, "Europe/London")).toEqual("Thursday 21:45")
    expect(getDayTime(1719521100, "Europe/Paris")).toEqual("Thursday 22:45")
  })

  it("Gets a short day string", () => {
    expect(getShortDay(new Date(1719521100 * 1000))).toEqual("Thu")
  })
})
