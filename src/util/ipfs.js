// Vendor
import ipfsApi from "ipfs-api";

// Internal
import parser from "./parser";

const ipfs = ipfsApi({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https"
});

const getFromIPFS = async hash => {
  const getRes = await ipfs.get(hash);
  const [val] = getRes;
  return parser(val.content.toString());
};
const pushToIPFS = async buffer => {
  const res = await ipfs.add(buffer);
  const [cid] = res;
  return cid.path;
};

export { ipfs as default, getFromIPFS, pushToIPFS };
