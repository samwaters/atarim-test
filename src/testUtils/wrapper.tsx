import { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

const mockStore = configureStore([])
const store = mockStore({
  dashboard: {
    cities: [],
  },
  ui: {
    cityModalOpen: false,
    mode: "light",
  },
})

export const ProviderWrapper = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>
}
