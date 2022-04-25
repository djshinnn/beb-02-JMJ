// 연결 요청이 보류 중인 동안에는 항상 "연결" 버튼을 비활성화 해야 합니다 . 
// 페이지 로드 시 연결 요청을 시작 해서는 안 됩니다.
const getAccount = async() => {
  if(typeof window.ethereum !== 'undefined') {  // 브라우저에서 metaMask 실행여부 확인
    //window.ethereum이 있다면
    try {
      const accounts = await window.ethereum.request({  // metaMask 연결
        method: "eth_requestAccounts",
    });
      return accounts[0];
    } catch(err){
      return false;
    }
  }
  return false;
}

export default getAccount;
