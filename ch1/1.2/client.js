const EthCrypto = require('eth-crypto');

// The client that end-users will use to interact with our central payment processor
class Client {
  // Initializes a public/private key pair for the user
  constructor() {
    this.wallet = EthCrypto.createIdentity();
  }

  // Creates a keccak256/SHA3 hash of some data
  hash(data) {
    const dataStr = JSON.stringify(data);
    return EthCrypto.hash.keccak256(data);
  }

  // Signs a hash of data with the client's private key
  sign(message) {
    const messageHash = this.hash(message);
    return EthCrypto.sign(this.wallet.privateKey, messageHash);
  }

  // Verifies that a messageHash is signed by a certain address
  verify(signature, messageHash, address) {
    const signer = EthCrypto.recover(signature, messageHash);
    return signer === address;
  }

  // Buys tokens from Paypal
  buy(amount) {
    // Let the user know that they just exchanged off-network goods for network tokens
    console.log('AN INTERESTING MESSAGE');
  }

  // Generates new transactions
  generateTx(to, amount, type) {
    // create an unsigned transaction
    const rawTx = {
      type,
      amount,
      from: this.wallet.address, // sender address
      to // reciever address
    };

    // create a signature of the transaction
    const signedTx = this.sign(rawTx, this.wallet.privateKey);
    console.log(signedTx);

    // return a Javascript object with the unsigned transaction and transaction signature
    return { raw: rawTx, sig: signedTx };
  }
}

module.exports = Client;
