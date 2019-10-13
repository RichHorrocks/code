const EthCrypto = require('eth-crypto');
const Client = require('./client.js');

// Our naive implementation of a centralized payment processor
class Paypal extends Client {
  constructor() {
    super();
    // the state of the network (accounts and balances)
    this.state = {
      [this.wallet.address]: {
        balance: 1000000
      }
    };
    // the history of transactions
    this.txHistory = [];
  }

  // Checks that the sender of a transaction is the same as the signer
  checkTxSignature(tx) {
    // get the signature from the transaction
    const signature = tx.sig;
    const sender = tx.raw.from;
    const hash = this.hash(tx.raw);

    if (!this.verify(signature, hash, sender)) {
      console.log('TX signature is invalid');
      return false;
    }
    return true;
  }

  // Checks if the user's address is already in the state, and if not, adds
  // the user's address to the state
  checkUserAddress(tx) {
    // check if the sender is in the state
    // if the sender is not in the state, create an account for them
    const { from } = tx.raw;
    if (!(from in this.state)) {
      this.state.from = 0;
    }

    // check if the receiver is in the state
    // if the receiver is not in the state, create an account for them
    const { to } = tx.raw;
    if (!(to in this.state)) {
      this.state.to = 0;
    }

    // once the checks on both accounts pass, return true
    return true;
  }

  // Checks the transaction type and ensures that the transaction is valid based on that type
  checkTxType(tx) {
    switch (tx.raw.type) {
      case 'mint':
        // if the transaction type is 'mint'
        // check that the sender is PayPal
        // if the check fails, print an error to the concole stating why and
        // return false so'mint'the transaction is not processed

        if (tx.raw.sender !== 'Paypal') {
          console.log('TX is MINT but sender is not PAYPAL');
          return false;
        }
        break;
      case 'check':
        // if the transaction type is 'check'
        // print the balance of the sender to the console
        // return false so that the stateTransitionFunction does not process the tx
        console.log(this.wallet[tx.raw.from]);
        return false;
      case 'send':
        // if the transaction type is 'send'
        // check that the transaction amount is positive and the sender has an
        // account balance greater than or equal to the transaction amount
        if (tx.raw.amount < 0) {
          console.log('TX amount is negative');
        } else if (!(tx.raw.from in this.wallet)) {
          console.log('Sender does not have an account');
        }
      // if a check fails, print an error to the console stating why and return false
      // if the check passes, return true
      default:
        return false;
    }

    return true;
  }

  // Checks if a transaction is valid, adds it to the transaction history, and updates the state of accounts and balances
  static checkTx(tx) {
    // check that the transaction signature is valid
    // check that the transaction sender and receiver are in the state
    // check that the transaction type is valid
    // if all checks pass return true
    // if any checks fail return false
    return (
      this.checkTxSignature(tx) &&
      this.checkUserAddress(tx) &&
      this.checkTxType(tx)
    );
  }

  // Updates account balances according to a transaction and adds the transaction to the history
  applyTx(tx) {
    // decrease the balance of the transaction sender/signer
    // TODO
    // increase the balance of the transaction receiver
    // TODO
    // add the transaction to the transaction history
    // TODO
    // return true once the transaction is processed
    // TODO
  }

  // Process a transaction
  processTx(tx) {
    // check the transaction is valid
    if (this.checkTx(tx)) {
    }

    // apply the transaction to Paypal's state
    if (this.applyTx(tx)) {
    }
  }
}

module.exports = Paypal;
