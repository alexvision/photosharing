import PhotoSharing from "./../build/contracts/PhotoSharing.json";

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545"
    }
  },
  contracts: [PhotoSharing],
  events: {
    PhotoSharing: ["NewPost", "NewUser"],
  },
  polls: {
    accounts: 1500
  }
};

export default drizzleOptions;
