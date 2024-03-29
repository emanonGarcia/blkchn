const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, prevHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    
    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join(0)) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        
        console.log("Block mined:", this.hash);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2019','Genesis Block', 'genesis');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length -1; i++){
            const currentBlock = this.chain[i],
                  prevBlock = this.chain[i-1];
            if (currentBlock.hash !== currentBlock.calculateHash()) return false;
            if (currentBlock.prevHash !== prevBlock.hash) return false;
        }
        return true;
    }
}

let luCoin = new BlockChain();

console.log('mining block 1...')
luCoin.addBlock(new Block(1, '05/10/2019', { amount: 4 } ))

console.log('mining block 2...')
luCoin.addBlock(new Block(2, '05/10/2019'), { amount: 10 })


