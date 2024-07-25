import React, { SetStateAction } from 'react'

type QrContextType = {
     qrModal: boolean,
     setQrModal: React.Dispatch<SetStateAction<boolean>>;
     handleQrModal: () => void;
}

type Children = {
     children: React.ReactNode,
}

export const QrContext = React.createContext<QrContextType | undefined>(undefined);

export const QrContextProvider:React.FC<Children> = ({children}) => {

  const [qrModal, setQrModal] = React.useState<boolean>(false);
  
  const handleQrModal = () => {
     setQrModal(true);
  }


     return (
          <QrContext.Provider value={{
               qrModal, setQrModal, handleQrModal
          }}>
               {children}
          </QrContext.Provider>
     )
}

export const useQR = () => {
     const context = React.useContext(QrContext);

     if(context === undefined) {
          throw new Error('undefined QRCONTEXTMODAL');
     } else {
          return context
     }
}