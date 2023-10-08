import { ethers } from "hardhat";
import Web3Modal from "web3modal";

import { TOKEN_ABI, TOKEN_SALE_ABI } from "../Context/constants";

import { TokenContractAddress, TokenSaleAddress } from "../config";

export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const ConnectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstAccount = accounts[0];
    window.location.reload();
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//TokenContract
const fetchTokenContract = (signerOrProvider) =>
  new ethers.Contract(TokenContractAddress, TOKEN_ABI, signerOrProvider);

export const connectingTOKENCONTRACT = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchTokenContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//Get Balance
export const getBalance = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    return await signer.getBalance();
  } catch (error) {
    console.log(error);
  }
};

//Token Sale Contract
const fetchTokenSaleContract = (signerOrProvider) =>
  new ethers.Contract(TokenSaleAddress, TOKEN_SALE_ABI, signerOrProvider);

export const connectingTOKENSALECONTRACT = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchTokenSaleContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
