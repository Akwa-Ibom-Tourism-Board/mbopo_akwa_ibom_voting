import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";
import { ScrollRestoration } from "./ScrollRestoration";
import { ErrorBoundary } from "./ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <BrowserRouter>
          <ScrollRestoration />
          <AppRoutes />
        </BrowserRouter>
      </AppProviders>
    </ErrorBoundary>
  );
}
