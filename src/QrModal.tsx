import React from "react";
import { useQR } from "./context/QrContext";
import { useLogo } from "./context/GetLogoContext";
import { HeaderLogoType } from "./components/header/Header";
import { useTranslateApi } from "./context/GetTranslateContext";

const QrModal = () => {
  const { setQrModal } = useQR();

  const qrModalRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const outsideClickedQrModal = (e: React.MouseEvent | MouseEvent) => {
      if (qrModalRef.current && !qrModalRef.current.contains(e.target as Node)) {
        setQrModal(false); // if oustide clicked on the modal close modal
      }
    };

    document.addEventListener("mousedown", outsideClickedQrModal);

    return () => document.removeEventListener("mousedown", outsideClickedQrModal);
  }, []);

  const { logo } = useLogo();
  const { translatesWord } = useTranslateApi();

  return (
    <div className="qr-modal" style={{ position: "relative" }} ref={qrModalRef}>
      <h1>{translatesWord['get_the_ride_app_qr_title']}</h1>
      <div className="qr-area">
        {logo.slice(2, 3).map((logo: HeaderLogoType, i: number) => (
          <img src={logo.qr_code} key={i} />
        ))}
      </div>
      <span>{translatesWord['qr_title_bottom_text']}</span>
    </div>
  );
};

export default QrModal;
