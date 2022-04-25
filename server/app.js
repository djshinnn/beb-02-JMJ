import express from "express";
import cors from "cors";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const password = process.env.DATABASE_SPRINT_PASSWORD;

const app = express();
const port = 3838;
const con = mysql.createConnection({
  // mysql 연결
  host: "localhost",
  user: "root",
  password: password,
  database: "JMJ_NftMarket_DB",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

con.connect(function (err) {
  if (err) throw err;
  app.listen(port, () => {
    console.log(`DB연결성공 and port:${port} 구동중!`);
  });
});

// nft 민팅 메타데이터 저장구현
app.post("/create", (req, res) => {
  const { name, external_url, description, chain, type, imgURI, sale, price } =
    req.body;
  const account = req.body.account;
  const tokenId = req.body.tokenId;
  console.log(
    account,
    tokenId,
    req.body.name,
    req.body.external_url,
    req.body.description,
    req.body.chain,
    req.body.type,
    req.body.imgURI,
    req.body.sale,
    req.body.price
  );
  con.query(
    `INSERT INTO nftMetadata( type, account, tokenId, sale, metadeta) VALUES( "${type}", "${account}", "${tokenId}", ${sale}, '{ "name":"${name}", "external_url":"${external_url}", "description":"${description}", "imgURI":"${imgURI}", "price":${price} }')`,
    function (err, result) {
      if (err) throw err;
      console.log("NFT created");
      res.send("NFT created");
    }
  );
});
// mypage nft 메타데이터 조회 구현

app.post("/mypage", (req, res) => {
  const account = req.body.account;
  console.log(req.body.account);
  con.query(
    `select * from nftMetadata where account = "${account}"`,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

// explore nft 메타데이터 조회 구현

app.get("/explore", (req, res) => {
  con.query(
    `select * from nftMetadata where sale = ${true}`,
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

// sale nft 메타데이터 업데이트 구현

app.post("/sale", (req, res) => {
  const tokenId = req.body.tokenId;
  console.log(tokenId);
  con.query(
    `update nftMetadata SET sale = ${true} WHERE tokenId = ${tokenId}`,
    function (err, result) {
      if (err) throw err;
      res.send("update success");
    }
  );
});
