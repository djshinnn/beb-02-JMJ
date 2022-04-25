import eth from "../assets/eth.png";
import "../views/mypage.css";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import getAccount from "./getAccount";


const MypageHeader  = ({ account}) => {

  return (
    <div className="header">
      <div className="header__content">
      {
        account !== false ?   // 주소값이 있으면
          <div className="header__owner">
            <div className="header__ownerImage">
              <img
                src={
                  "https://lh3.googleusercontent.com/wNENwT5R7oLF6NkNtYolSklvi_BykLPegPm5vOd1JeSn7Atagudj6-p3BfkPIyBAQNvjWwcl62WkJCYhf0UL4WI7-3yGM0TVAJrE=w303"
                }
                alt=""
              />
            </div>
            <div className="header__ownerDetails">
              <div className="header__ownerName">Unnamed</div>
              <div className="header__accountContainer">
                <img src={eth} className="header__ethImage" alt="" />
                <div className="header__ownerAccount">{account}</div>
                <CopyToClipboard text={account} className="header__copyBtn"><button>copy</button></CopyToClipboard>
              </div>
            </div>
          </div>
        : <div />  //주소값이 없으면 빈화면.
      }
      </div>
    </div>
  );
};

export default MypageHeader;
