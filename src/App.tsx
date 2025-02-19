import React from "react";
import Topheader from "./components/topheader/Topheader";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/footer/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import EbcyclePage from "./components/pages/EbcyclePage";
import BcyclePage from "./components/pages/Bcyclepage";
import WhyRidePage, { EnumLangType } from "./components/pages/WhyRidePage";
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
import { useLang } from "./context/SelectedLanguage";

export const paths = {
  whyride: {
    az: "/az/niyə-apar",
    en: "/en/why-ride",
    ru: "/ru/зачем-ездить"
  },
  blog: {
    az: "/az/bloq",
    en: "/en/blog",
    ru: "/ru/блог"
  },
  blog_single: {
    az: "/az/bloq",
    en: "/en/blog",
    ru: "/ru/блог"
  },
  news_single: {
    az: "yeniliklər",
    en: "news",
    ru: "новости"
  },
  winner_single: {
    az: "ayın-qalibi",
    en: "winner-of-the-mounth",
    ru: "победитель-месяца"
  },
  about: {
    az: "/az/haqqımızda",
    en: "/en/about-us",
    ru: "/ru/о-нас"
  },
  be_partner: {
    az: "/az/partnyor-ol",
    en: "/en/be-partner",
    ru: "/ru/быть-партнером"
  },
  contact: {
    az: "/az/əlaqə",
    en: "/en/contact",
    ru: "/ru/контакт"
  },
  e_bcycle: {
    az: "/az/e-velosiped",
    en: "/en/e-bike",
    ru: "/ru/е-велосипед"
  },
  bcycle: {
    az: "/az/velosiped",
    en: "/en/bike",
    ru: "/ru/велосипед"
  }
}

const App = () => {

  const { mobileMenu } = useMobile();

  const { selectedLanguage } = useLang();

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
    if (location.pathname === paths.whyride[selectedLanguage as EnumLangType]) {
      appref.current!.style.background = '#FFFBF9'
    } else {
      appref.current!.style.background = '#ffffff'
    }
  }, [location]);


  return (
    <div className="app" ref={appref}>
      <ToastContainer transition={Zoom} autoClose={2000} />
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
          path={paths.e_bcycle.az}
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
          path={paths.e_bcycle.en}
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
          path={paths.e_bcycle.ru}
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
          path={paths.bcycle.az}
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
          path={paths.bcycle.en}
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
          path={paths.bcycle.ru}
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
          path={paths.whyride.az}
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
          path={paths.whyride.en}
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
          path={paths.whyride.ru}
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
          path={paths.blog.az}
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
          path={paths.blog.en}
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
          path={paths.blog.ru}
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
          path={paths.about.az}
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
          path={paths.about.en}
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
          path={paths.about.ru}
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
          path={paths.be_partner.az}
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
          path={paths.be_partner.en}
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
          path={paths.be_partner.ru}
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
          path={paths.contact.az}
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <ContactPage />
              <Footer />
            </React.Fragment>
          }
        />

        <Route
          path={paths.contact.en}
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <ContactPage />
              <Footer />
            </React.Fragment>
          }
        />

        <Route
          path={paths.contact.ru}
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              <ContactPage />
              <Footer />
            </React.Fragment>
          }
        />

        <Route
          path={`/:lang/:blogid`}
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
          path={`/${paths.news_single.az}/:lang/:latestid`}
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
          path={`/${paths.news_single.en}/:lang/:latestid`}
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
          path={`/${paths.news_single.ru}/:lang/:latestid`}
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
          path={`/${paths.winner_single.az}/:lang/:wthmid`}
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
          path={`/${paths.winner_single.en}/:lang/:wthmid`}
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
          path={`/${paths.winner_single.ru}/:lang/:wthmid`}
          element={
            <React.Fragment>
              <Topheader />
              <Header />
              {/* <WinsOfTheMounthInner /> */}
              <Footer />
            </React.Fragment>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
