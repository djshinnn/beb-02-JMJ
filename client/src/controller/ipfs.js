const ipfsApi = require("ipfs-api");
const ipfs = ipfsApi("ipfs.infura.io", "5001", { protocol: "https" });

export default ipfs;
