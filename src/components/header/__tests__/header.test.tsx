import { render, screen } from "@testing-library/react"
import { ProviderWrapper } from "../../../testUtils/wrapper"
import { Header } from "../header"
describe("Header", () => {
  it("Renders the header", async () => {
    render(<Header />, { wrapper: ProviderWrapper })
    expect(screen.getByText("Weather Forecast")).toBeInTheDocument()
  })
})
