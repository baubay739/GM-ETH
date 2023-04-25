const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/<your_infura_project_id>');

const account = '<your_ethereum_wallet_address>';
const privateKey = '<your_ethereum_wallet_private_key>';

const receiverAddress = '<recipient_ethereum_wallet_address>';
const txValueWei = web3.utils.toWei('0.0001', 'ether');
const message = 'GM';

web3.eth.getTransactionCount(account, (err, txCount) => {
  if (err) {
    console.error(err);
  } else {
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      to: receiverAddress,
      value: web3.utils.toHex(txValueWei),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      data: web3.utils.asciiToHex(message)
    };

    const signedTx = web3.eth.accounts.signTransaction(txObject, privateKey);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, txHash) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Transaction Hash:', txHash);
      }
    });
  }
});
