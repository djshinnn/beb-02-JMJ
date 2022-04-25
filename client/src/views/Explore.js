import {React,useState, useEffect} from "react";
import Card from "../components/_test_card";
import "./explore.css";
import getAccount from "../components/getAccount";
import axios from "axios";
//import "../components/NftList.css";


function Explore() {
  const [account, setAccount] = useState('');
  const [NFTList, setNFTList] = useState([]);


  const buy = () => {
    getAccount().then(el =>{
      setAccount(el);
    })
    console.log("explore_account : ",account)

    {console.log("buy 버튼이 눌렸습니다.")}
    
  }
  useEffect(async () => {
    if (typeof window.ethereum !== "undefined") {
      // window.ethereum이 있다면
      try {
            axios
            .get("http://localhost:3838/explore")
            .then((res) => {
             const nftData = res.data;            
              console.log(nftData);
              setNFTList(nftData.map((el) => {
                el.metadeta = JSON.parse(el.metadeta);
                 return el
               }))
            });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  
  console.log(NFTList)
  return(
    <div className = "cont_explore">
      <div className = "cont_explore__header">
        <h1>Explore</h1>
        <h3>All NFTs</h3>
      </div>
      <div className = "cont_explore__content">
        { NFTList.length === 0 ? <h1>No items to display</h1> : NFTList.map((nft,idx) => { if(idx < 5) return <Card nft={nft} key={idx} action={()=>buy} text='Buy'/>} )}
      </div>
    </div>
  );
}

export default Explore;
