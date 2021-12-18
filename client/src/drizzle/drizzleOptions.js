import MyStringStore from "../contracts/MyStringStore.json";
const options = {
  contracts: [MyStringStore],
  events: {
    MyStringStore: ["DataChanged"],
  },
};

// const options = {
//   contracts: [MyStringStore],
//   web3: {
//     fallback: {
//       type: "ws",
//       url: "ws://127.0.0.1:9545",
//     },
//   },
// };

export default options;
