import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import getAccount from "./getAccount";

function Nav({ account, setAccount}) {
  const [ viewPoint, setViewPoint ] = useState(0); 
  // useEffect hook을 사용해서 로그인 로그아웃 감지, 바로 아이콘 변경구현할려했는데 사용자가 메타마스크 팝업창에서 로그인 로그아웃 action이 실행됐다는 것을 감지하는 법을 모르겠음. 
  // useEffect(() => {
  //   console.log('change!!')
  // }, [account])
  
  return (
    <div id="nav">
      <div id="nav_title">
        <span className="ico_img ir_pm">로고</span>
        <Link to="/" onClick={() => { setViewPoint(0); }}>
         <span id="name">JMJ NFT Market</span>
        </Link>
      </div>
      <div id="menu">
        <Link to="/Create" onClick={() => { setViewPoint(1); }} className={ viewPoint === 1 ? "navTitColorBlack navTit" : "navTit" }>Create</Link>
        <Link to="/Mypage" onClick={() => { setViewPoint(2); }} className={ viewPoint === 2 ? "navTitColorBlack navTit" : "navTit" }>Mypage</Link>
        <Link to="/Explore" onClick={() => { setViewPoint(3); }} className={ viewPoint === 3 ? "navTitColorBlack navTit navTitLast" : "navTit navTitLast" }>Explore</Link>
        { account === false 
        ?  <span className="menu__a--walletIco ir_pm" onClick={()=>{getAccount()}}>wallet ico</span> 
        : <span className="header__ownerImage loginWalletImg">
            <img
              src={
              "../assets/loginWalletIMG.pmg"
              }
              alt=""
            />
          </span>}
      </div>
    </div>
  );
}

export default Nav;
