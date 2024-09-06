import React from "react";
import Topheader from "./components/topheader/Topheader";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/footer/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import EbcyclePage from "./components/pages/EbcyclePage";
import BcyclePage from "./components/pages/Bcyclepage";
import WhyRidePage from "./components/pages/WhyRidePage";
import BlogPage from "./components/pages/BlogPage";
import InnerBlog from "./components/pages/blogpageuitils/InnerBlog";
import AboutPage from "./components/pages/AboutPage";
import BePartnerPage from "./components/pages/BePartnerPage";
import ContactPage from "./components/pages/ContactPage";
import { useMobile } from "./context/MobilMenu";
import ToggleMenu from "./components/header/ToggleMenu";
import { useQR } from "./context/QrContext";
import QrModal from "./QrModal";
import "./styles/qrmodal.scss";
import InnerLatestNews from "./components/pages/blogpageuitils/InnerLatestNews";
import { ToastContainer, Zoom } from "react-toastify";

const App = () => {

  const { mobileMenu } = useMobile();

  const { qrModal, setQrModal } = useQR();

  //if user clicked ESC close QR modal;
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setQrModal(false);
    }
  };

  React.useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [mobileMenu]);

  const location = useLocation();
  const appref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if(location.pathname === '/whyride'){ 
      appref.current!.style.background = '#FFFBF9'
    } else {
      appref.current!.style.background = '#ffffff'
    }
  }, [location]);


  return (
    <div className="app" ref={appref}>
      <ToastContainer transition={Zoom} autoClose={2000}/>
      {/* QR MODAL */}
      {qrModal && (
        <div className="provider-modal" onKeyDown={handleKey} tabIndex={0}>
          <QrModal />
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenu && <ToggleMenu />}
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <Homepage />
              <Footer />
            </React.Fragment>
          }
        />

        <Route
          path="/e-bcycle"
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <EbcyclePage />
              <Footer />
            </React.Fragment>
          }
        />
        <Route
          path="/bcycle"
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <BcyclePage />
              <Footer />
            </React.Fragment>
          }
        />

        <Route
          path="/whyride"
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <WhyRidePage />
              <Footer />
            </React.Fragment>
          }
        />

        <Route
          path="/blog"
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <BlogPage />
              <Footer />
            </React.Fragment>
          }
        />
        <Route
          path="/blog_single/:blogid"
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <InnerBlog />
              <Footer />
            </React.Fragment>
          }
        />

        <Route
          path="/news_single/:latestid"
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <InnerLatestNews />
              <Footer />
            </React.Fragment>
          }
        />
        <Route
          path="/winner_single/:wthmid"
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              {/* <WinsOfTheMounthInner /> */}
              <Footer />
            </React.Fragment>
          }
        />

        <Route
          path="/about"
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <AboutPage />
              <Footer />
            </React.Fragment>
          }
        />

        <Route
          path="/bepartner"
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <BePartnerPage />
              <Footer />
            </React.Fragment>
          }
        />

        <Route
          path="/contact"
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <ContactPage />
              <Footer />
            </React.Fragment>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
