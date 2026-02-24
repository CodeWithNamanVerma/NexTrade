import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => { },
  closeBuyWindow: () => { },
  openSellWindow: (uid) => { },
});

export const GeneralContextProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("BUY");  // "BUY" | "SELL"
  const [stockUID, setStockUID] = useState("");

  const handleOpenBuy = (uid) => { setMode("BUY"); setStockUID(uid); setIsOpen(true); };
  const handleOpenSell = (uid) => { setMode("SELL"); setStockUID(uid); setIsOpen(true); };
  const handleClose = () => { setIsOpen(false); setStockUID(""); };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuy,
        closeBuyWindow: handleClose,
        openSellWindow: handleOpenSell,
      }}
    >
      {props.children}
      {isOpen && (
        <BuyActionWindow uid={stockUID} initialMode={mode} onClose={handleClose} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
