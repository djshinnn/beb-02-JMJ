import Header from "../components/MypageHeader";
import Contents from "../components/Mypagecontents";
import getAccount from "../components/getAccount";

// test
function Mypage({ account, setAccount}) {

  getAccount().then((el) => {
    setAccount(el);
  });
  //console.log("mypage_account : ", account);

  return (
    <div id="cont_mypage">
      <Header account={account} setAccount={setAccount}/>
      <div className="nftList">
        <Contents account={account} setAccount={setAccount}/>
      </div>
    </div>
  );
}

export default Mypage;
