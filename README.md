# Weather Forecast
## Installing
Install the dependencies with `yarn`
## Running
Start the dev server with `yarn dev` and open [localhost:5173](http://localhost:5173)  
Build a production release with `yarn build`

## Testing
Run `yarn test` to run the unit tests

## Tech Stack
- React + Typescript
- Redux + RTKQ
- Material UI and Icons
- Jest + RTL

# Notes
- Bootstrapped with Vite
- APIs are handled by RTKQ for caching and optimisation
- Calls to the search API are debounced using the `useDebounce` hook
- The dashboard is automatically persisted to LocalStorage and loaded when the page is refreshed, using the `usePersist` hook
- The add cities modal allows for adding and removing multiple cities without closing it
  - Cities can be toggled on and off, and active ones are indicated with a coloured icon and tick
- Clicking the C and F units will toggle between temperatures
- The `useResponsive` hook defines breakpoints for screen sizes and whether the user is on a touch device
- The dashboard tiles make use of this to determine whether to show the menu or hover to access the refresh and remove buttons
- The tiles will make use of the full width if there is only 1, the screen is small or they are on a row of their own
  - Otherwise they will use 50%
- Each dashboard tile has an error boundary to catch any issues without impacting the page functionality
- Code formatting is handled by Prettier
- Git hooks are managed by Husky to run linting and tests on precommit

## Future Improvements
- More tests (a fair few components are not currently covered)
- E2E / integration tests with Playwright or Cypress
- The API provides hourly data for temperatues, wind and precipitation - this could be shown in a graph
- Allow re-ordering of the tiles
- Refresh all button
- Internationalisation with `react-i18next`