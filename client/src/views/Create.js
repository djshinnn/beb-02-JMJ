import React from "react";
import { useRef, useState } from "react";
import getAccount from "../components/getAccount";
import ipfs from "../controller/ipfs";
import axios from "axios";

function Create({ account, setAccount }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const blockChainList = ["Ethereum"];
  const ethereumTypeList = ["erc-721", "erc-1155"];
  const [chain, setChain] = useState("");
  const [type, setType] = useState("");

  const fileUploader = useRef(null);
  // const handleClick = (e) => {
  //   fileUploader.current.click
  // };

  const handleChange = (e) => {
    const maxSize = 100 * 1024 * 1024;

    if (e.target.files[0].size > maxSize) {
      alert("첨부파일 사이즈는 100MB 이내로 등록 가능합니다.");
    } else {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  getAccount().then((el) => {
    setAccount(el);
    console.log("account : ", el);
  });
  // console.log("creat_account : ", account);

  const checkElement = () => {
    if (file && name && chain && type) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (checkElement()) {
      const account = await getAccount();
      try {
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
          const buffer = Buffer.from(reader.result);
          ipfs.add(buffer, (err, ipfsHash) => {
            try {
              axios
                .post("http://localhost:3838/create", {
                  name: name,
                  external_url: link,
                  description: description,
                  chain: chain,
                  type: type,
                  imgURI: `https://ipfs.io/ipfs/${ipfsHash[0].hash}`,
                  sale: "false",
                  price: "1",
                  account: account,
                  tokenId: 1,
                })
                .then((res) => {
                  alert("성공적으로 발행되었습니다");
                  setFile(null);
                  setName("");
                  setLink("");
                  setDescription("");
                  setType("");
                  setChain("");
                })
                .catch((err) => {
                  console.log(err);
                });
            } catch (error) {
              return console.log(error);
            }
            console.log(
              `이미지 URI주소 https://ipfs.io/ipfs/${ipfsHash[0].hash}`
            );
          });
        };
      } catch (error) {
        return console.log(error);
      }
    } else {
      alert("필수항목 채워주세요");
    }
  };

  return (
    <div id="cont_create">
      <div id="create_component">
        <div className="create__div--createHeader">
          <h1>Create New NFT</h1>
        </div>
        <form className="create__form--createForm">
          <div className="createForm__div--inputDataFile">
            <span>Image Uplode</span>
            <br />
            <img />
            <input
              type="file"
              accept="image/*"
              ref={fileUploader}
              onChange={handleChange}
            />
          </div>
          <div className="createForm__div--inputElement">
            <div className="inputElement__div--elementLabel">Name</div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="inputElement__div--element-input"
            />
          </div>
          <div className="createForm__div--inputElement">
            <div className="inputElement__div--elementLabel">External Link</div>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="inputElement__div--element-input"
            />
          </div>
          <div className="createForm__div--inputElement">
            <div className="inputElement__div--elementLabel">Description</div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="inputElement__div--element-input inputElement__div--element-textarea"
            ></textarea>
          </div>
          <div className="createForm__div--inputElement">
            <div className="inputElement__div--elementLabel">Block chain</div>
            <select
              name="blockchain"
              value={chain}
              onChange={(e) => setChain(e.target.value)}
              className="inputElement__div--element-input"
            >
              <option value=""> </option>
              {blockChainList.map((el, index) => {
                return (
                  <option key={index} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="createForm__div--inputElement">
            <div className="inputElement__div--elementLabel">Type</div>
            <select
              name="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="inputElement__div--element-input"
            >
              <option value=""> </option>
              {ethereumTypeList.map((el, index) => {
                return (
                  <option key={index} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="createForm__div--inputElement">
            <input
              type="button"
              value="create"
              className="inputElement__input--elementBtn"
              onClick={onSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
