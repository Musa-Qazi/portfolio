import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const LitePage = lazy(() => import("./components/LitePage"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  const clean = pathname.replace(/\/$/, "");

  if (clean === "/contact") {
    return (
      <Suspense fallback={null}>
        <ContactPage />
      </Suspense>
    );
  }

  if (clean === "/lite") {
    return (
      <Suspense fallback={null}>
        <LitePage />
      </Suspense>
    );
  }

  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
