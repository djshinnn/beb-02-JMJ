import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div id="cont_home">
      <div id="home_title">
        <h2>Discover, collect, and sell extraordinary NFTs</h2>
        <span>JMJ is the world's first and largest NFT marketplace</span>
      </div>
      <div className="home_button">
          <div className="home_button__div--ExploreBtn">
            <Link to="/Explore">Explore</Link>
          </div>
          <div className="home_button__div--CreateBtn">
            <Link to="/Create">Create</Link>
          </div>
      </div>
      <div className="home__div--NftImg">
        <div className="NftImg_IcoFrom">
          <span class="NftImg_Ico ir_pm">아이콘</span><span class="NftImg_tit">CryptoPunks</span><br/><span class="NftImg_SubTit">CryptoPunks #1042</span>
        </div>
        <span className="NftImg ir_pm">nft이미지</span>
      </div>
    </div>
  );
}
export default Home;
