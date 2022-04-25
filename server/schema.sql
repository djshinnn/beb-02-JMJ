DROP DATABASE IF EXISTS JMJ_NftMarket_DB;
CREATE DATABASE JMJ_NftMarket_DB;
USE JMJ_NftMarket_DB;

CREATE TABLE nftMetadata (
  id INT AUTO_INCREMENT,
  type VARCHAR(255),
  account VARCHAR(255),
  tokenId INT,
  sale boolean,
  metadeta JSON,
  PRIMARY KEY(id)
);
