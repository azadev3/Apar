import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import "./styles/global.scss";
import { ScrollContextProvider } from "./context/ScrollHeader.tsx";
import { MobilMenuContextProvider } from "./context/MobilMenu.tsx";
import "./styles/responsive.scss";
import "./styles/pages/pageresponsive.scss";
import { SelectedLanguageContextProvider } from "./context/SelectedLanguage.tsx";
import { GetTranslateContextProvider } from "./context/GetTranslateContext.tsx";
import ScrollToTop from "./ScrollToTop.tsx";
import { QrContextProvider } from "./context/QrContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogoContextProvider } from "./context/GetLogoContext.tsx";
import { ViewportContextProvider } from "./context/WindowHeight.tsx";

const query = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <QueryClientProvider client={query}>
      <ScrollContextProvider>
        <MobilMenuContextProvider>
          <SelectedLanguageContextProvider>
            <GetTranslateContextProvider>
              <QrContextProvider>
                <LogoContextProvider>
                  <ViewportContextProvider>
                  <ScrollToTop>
                    <App />
                  </ScrollToTop>
                  </ViewportContextProvider>
                </LogoContextProvider>
              </QrContextProvider>
            </GetTranslateContextProvider>
          </SelectedLanguageContextProvider>
        </MobilMenuContextProvider>
      </ScrollContextProvider>
    </QueryClientProvider>
  </HashRouter>
);
