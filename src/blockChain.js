import Block from "./block.js";
import Transactions from './transactions.js'

class BlockChain{
  constructor() {
    this.chain = [this.createOriginBlock()]
    this.difficulty = 3
    this.pendingTransactions = []
    this.miningReward = 10
  }
  createOriginBlock(){
    return new Block(['创世区块'], new Date().getTime(), 0)
  }
  getLastBlock(){
    return this.chain[this.chain.length - 1]
  }

  addBlock(mainAddress){
    const block = new Block(this.pendingTransactions, new Date().getTime(), this.getLastBlock().Hash)
    block.proofOfWork(this.difficulty)
    this.chain.push(block)
    console.log('区块hash：' + block.Hash)
    this.pendingTransactions = [ new Transactions(null, mainAddress, this.miningReward)]
  }

  createTransactions(transactions){
    this.pendingTransactions.push(transactions)
  }

  getBalanceOfAddress(address){
    let balance = 0
    // 挖矿收益
    this.chain.forEach(n=>{
      n.Transactions.forEach(m=>{
        if(m.fromAddress === address){
          balance -= m.amount
        }
        if(m.toAddress === address){
          balance += m.amount
        }
      })
    })
    // 模拟交易
    this.pendingTransactions.forEach(m=>{
      if(m.fromAddress === address){
        balance -= m.amount
      }
      if(m.toAddress === address){
        balance += m.amount
      }
    })

    return balance
  }

  isChainVaild(){
    for (let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i]
      const prevBlock = this.chain[i - 1]

      if(currentBlock.Hash !== currentBlock.createHash()){
        return false
      }

      if(currentBlock.PrevBlockHash !== prevBlock.Hash){
        return false
      }
    }

    return true
  }

}

export default BlockChain
