import { useState, useEffect } from "react";
import "../views/mypage.css";
import "../reset.css";
import Card from "../components/_test_card";
import axios from "axios";
import getAccount from "../components/getAccount";
import { Redirect } from "react-router-dom";



function Mypagecontents({ account, setAccount }) {
  const [NFTList, setNFTList] = useState([]);

  console.log("mypage_account : ", account);

  useEffect(async () => {
    if (typeof window.ethereum !== "undefined") {
      // window.ethereum이 있다면
      try {
        const account_ = getAccount();
        await account_.then((el) => {
          setAccount(el);
          if(el){
            axios
            .post("http://localhost:3838/mypage", {
              account: el,
            })
            .then((res) => {
             const nftData = res.data;            
              console.log(nftData);
              setNFTList(nftData.map((el) => {
                el.metadeta = JSON.parse(el.metadeta);
                 return el
               }))

            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  

  console.log(NFTList);

  const sale = (tokenId_, sale) => {
    if(sale === 0){
      console.log(sale);
      axios
      .post("http://localhost:3838/sale", {
        tokenId : tokenId_,
      })
      .then((res) => {
        console.log(res);
         setTimeout(() => {
          alert('판매등록이 완료되었습니다');
          <Redirect to="/explore"></Redirect>
        }, 1000);
      });
    } else {
      alert('이미 판매등록 하였습니다');
    }
  };

  return (
    <div id="MypageContents">
      {NFTList.length === 0 ? 
        <h1>No items to display</h1>
       : 
       NFTList.map((nft, idx) => {
          if (idx < 5)
            return <Card nft={nft} key={idx} action={sale} text="Sale"/>;
        })
      }
    </div>
  );
}

export default Mypagecontents;
