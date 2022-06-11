const HDwalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDwalletProvider(
  'salon laugh patient car organ pattern visual carry nominee crack gun never',
  'https://rinkeby.infura.io/v3/8ef9f7daa01448b597a33f8bfd70caad'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const selectedAccount = accounts[0];
  console.log('selected account ===> ', selectedAccount);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['First message!']
    })
    .send({
      gas: '1000000',
      from: selectedAccount
    });
  
  console.log('Deployed contract ressult address ====>> ', result.options.address);

  provider.engine.stop();
};

deploy();