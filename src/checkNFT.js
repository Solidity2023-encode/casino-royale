import { useState } from "react";
import "./marketplace.scss";
import sampleNFTImage from "../images/ennj-artwork-1080x675.png";
import algoIcon from "../images/algoIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { buyItem, sellItem, decUserBalance } from "../storeSlice.js";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk from "algosdk";
import walletshs from "../images/001-wallet.svg";
import { useHistory } from "react-router-dom";
import SellModal from "./sellModal";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

export default function CheckNFT() {
  const [sellModalOpen, setSellModalOpen] = useState(false);
  let history = useHistory();
  let match = useRouteMatch();
  console.log(match);
  const myBoughtItems = useSelector((state) => state.store.myItems);
  const marketplaceItem = useSelector((state) => state.store.marketplaceItems);
  const dispatch = useDispatch();

  const sendTx = async () => {
    try {
      const algoConnect = new MyAlgoConnect();
      const accountsSharedByUser = await algoConnect.connect();
      console.log(accountsSharedByUser[0].address);

      const appIndex = 1;
      const algodClient = new algosdk.Algodv2(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "http://localhost",
        "4001"
      );
      const suggestedParams = await algodClient.getTransactionParams().do();
    } catch (err) {
      console.log(err);
    }
  };

  const buyItemHTML = async (item, index) => {
    await sendTx();
    dispatch(buyItem(index));
    dispatch(decUserBalance(item.price));
  };

  return (
    <div className="marketplace" id="market">
      <a href="https://cr-marketplace-self.vercel.app/">Go to Marketplace</a>
    </div>
  );
}
