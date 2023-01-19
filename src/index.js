import BlockChain from "./blockChain.js";
import Transactions from "./transactions.js";

const chain = new BlockChain()

chain.addBlock('address1')
console.log(chain.getBalanceOfAddress('address1'))
chain.addBlock('address1')
console.log(chain.getBalanceOfAddress('address1'))
chain.addBlock('address1')
console.log(chain.getBalanceOfAddress('address1'))

chain.addBlock('address2')
console.log(chain.getBalanceOfAddress('address2'))
chain.addBlock('address2')
console.log(chain.getBalanceOfAddress('address2'))

chain.createTransactions( new Transactions('address1', 'address2', 3))
chain.createTransactions( new Transactions('address2', 'address1', 8))
console.log(chain.getBalanceOfAddress('address2'))

