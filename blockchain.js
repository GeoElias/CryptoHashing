class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return CryptoJS.SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2023", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash() || currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

class CompanyVerification {
    static signData(data, privateKey) {
        const sign = forge.md.sha256.create();
        sign.update(data, "utf8");
        const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
        return forge.util.encode64(privateKeyObj.sign(sign));
    }

    static verifySignature(data, signature, publicKey) {
        const verify = forge.md.sha256.create();
        verify.update(data, "utf8");
        const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
        return publicKeyObj.verify(verify.digest().bytes(), forge.util.decode64(signature));
    }
}

