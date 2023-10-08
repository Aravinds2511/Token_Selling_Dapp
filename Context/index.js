import React, { createContext, useContext } from "react";
import { ethers } from "ethers";

import {
  CheckIfWalletConnected,
  ConnectWallet,
  connectingTOKENCONTRACT,
  getBalance,
  connectingTOKENSALECONTRACT,
} from "../Utils/index";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const TOKEN_ICO = "Token Sell Dapp";
  return (
    <StateContext.Provider value={{ TOKEN_ICO }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
