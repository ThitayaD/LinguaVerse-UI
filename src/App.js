import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Page1 from "./pages/Page1";
import Page3 from "./pages/Page3";
import Page2 from "./pages/Page2";
import Page4 from "./pages/Page4";
import Page41 from "./pages/Page41";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/page-3":
        title = "";
        metaDescription = "";
        break;
      case "/page-2":
        title = "";
        metaDescription = "";
        break;
      case "/page-5":
        title = "";
        metaDescription = "";
        break;
      case "/page-4":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/page-3" element={<Page3 />} />
      <Route path="/page-2" element={<Page2 />} />
      <Route path="/page-5" element={<Page4 />} />
      <Route path="/page-4" element={<Page41 />} />
    </Routes>
  );
}
export default App;
