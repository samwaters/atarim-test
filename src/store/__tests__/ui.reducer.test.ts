import { store } from "../../store"
import { darkMode, lightMode } from "../ui.reducer"

describe("UI Reducer", () => {
  it("Handles light mode", () => {
    expect(store.getState().ui.mode).toEqual("light")
    store.dispatch(lightMode())
    expect(store.getState().ui.mode).toEqual("light")
  })

  it("Handles dark mode", () => {
    expect(store.getState().ui.mode).toEqual("light")
    store.dispatch(darkMode())
    expect(store.getState().ui.mode).toEqual("dark")
  })
})
