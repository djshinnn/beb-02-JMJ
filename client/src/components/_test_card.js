import { useState } from "react";
import eth from "../assets/eth.png";
import "./Card.css";
import Modal from "./modal";

const Card = ({ nft,action,text }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    
    <div className="Card">
      <img src={nft.metadeta.imgURI} alt="" width='30px'height='230'/>
      <div className="Card__details">
        <div className="Card__name">
          <div className="Card__id">{nft.metadeta.name}</div>
        </div>
        <div className="Card__priceContainer">
          <img src={eth} className="Card__ethImage" alt="" />
          <div className="Card__price">{nft.metadeta.price}</div>
        </div>
        <div className="Card__button">
        <button className="Card__button__detail" onClick={openModal}>Details</button>
          <Modal open={modalOpen} close={closeModal} header="Detail">
           Owner : {nft.account}<br></br>
           description : {nft.metadeta.description}<br></br>
           tokenID : {nft.tokenId}<br></br>
           Token Standard : {nft.type}<br></br>
          </Modal>
        <button className="Card__button__action" onClick={() => {action(nft.tokenId, nft.sale);}}>{text}</button>
        </div>
      </div>
    </div>
  );
};






export default Card;
