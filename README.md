# Tech.Care Patient Dashboard

Production-quality React implementation of the Adobe XD-inspired patient dashboard UI.

## Features

- React functional components with hooks
- Chart.js line chart for blood pressure (systolic and diastolic)
- Fetch API integration with Coalition Technologies endpoint
- Filters and displays only Jessica Taylor
- Loading state + error state
- Reusable component architecture
- Responsive layout for desktop and tablet (mobile-friendly fallback)
- Static HTML review version included in `static/`

## Project Structure

```text
src/
	components/
	pages/
	services/
	styles/
public/
static/
```

## API

- Endpoint: `https://fedskillstest.coalitiontechnologies.workers.dev`
- Method: `GET`
- Auth: Basic Authentication

The app supports environment-variable overrides:

- `REACT_APP_API_USERNAME`
- `REACT_APP_API_PASSWORD`

If not set, it falls back to the coding-test credentials.

## Run Locally

```bash
npm install
npm start
```

App runs on the default CRA dev server (usually `http://localhost:3000`).

## Build

```bash
npm run build
```

## Static HTML Review Version

For a non-React review copy:

- Open `static/index.html`
- It includes a lightweight vanilla implementation with the same API and Chart.js rendering

## Notes

- Patient data is fetched from API (not hardcoded)
- Only Jessica Taylor is rendered
- Search/dropdown/sidebar interactions are intentionally not implemented per constraints