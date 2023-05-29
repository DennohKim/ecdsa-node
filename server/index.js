const express = require("express");
const app = express();
const cors = require("cors");
const { keccak256 } = require("ethereum-cryptography/keccak")
const port = 3042;


app.use(cors());
app.use(express.json());

const address1 =
  "02213e5fd1800206fc689676ae40577484e64cfe5726d4c05bddf37eb1b7d98437";
  
const address2 =
  "030d303938d5299cd5612019af5c2e9890da82f4af15413b7df786db9ddd47ec9a";
  
const address3 =
  "030d303938d5299cd5612019af5c2e9890da82f4af15413b7df786db9ddd47ec9a";

function getAddress(publicKey){
  const slicedByte = publicKey.slice(1)
  const hashedByte = keccak256(slicedByte);
  return hashedByte.slice(-20);
}

//const shortenedAddress1 = getAddress(address1);


const balances = {
  "02213e5fd1800206fc689676ae40577484e64cfe5726d4c05bddf37eb1b7d98437": 100,
  "030d303938d5299cd5612019af5c2e9890da82f4af15413b7df786db9ddd47ec9a": 50,
  "030d303938d5299cd5612019af5c2e9890da82f4af15413b7df786db9ddd47ec9a": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  // get signature from clientside application

  // recover the public address


  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
