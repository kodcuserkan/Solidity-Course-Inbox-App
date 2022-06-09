const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { bytecode, interface } = require('../compile');

const INITIAL_MESSAGE = 'Hi there!';
let accounts;
let inbox;

beforeEach(async ()=> {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Test Inbox', () => {
  it ('should deploy a contract', () => {
    console.log('iinbox.options.address====> ', inbox?.options?.address);
    assert.ok(inbox.options.address);
  });

  it ('should have a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);
  });

  it ('should set a new message', async () => {
    const newMessage = 'Bye bye!';
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});