// Initialize blockchain
const supplyChain = new Blockchain();

// Add block functionality
document.getElementById('addBlock').addEventListener('click', () => {
    const data = prompt("Enter block data:");
    if (data) {
        const newBlock = new Block(supplyChain.chain.length, new Date().toISOString(), data);
        supplyChain.addBlock(newBlock);
        displayChain();
    }
});

// Validate chain functionality
document.getElementById('validateChain').addEventListener('click', () => {
    const isValid = supplyChain.isChainValid();
    const output = isValid ? "Blockchain is valid." : "Blockchain is NOT valid!";
    alert(output);
});

// Tamper with block functionality
document.getElementById('tamperBlock').addEventListener('click', () => {
    if (supplyChain.chain.length > 1) {
        // Tamper with the second block's data and hash
        supplyChain.chain[1].data = "Tampered Data";
        supplyChain.chain[1].hash = "1234567890abcdef"; // Fake hash
        displayChain();
        alert("Block has been tampered with.");
    } else {
        alert("Not enough blocks to tamper with.");
    }
});

// Display blockchain in DOM
function displayChain() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = supplyChain.chain.map(block => `
        <div>
            <p><strong>Index:</strong> ${block.index}</p>
            <p><strong>Timestamp:</strong> ${block.timestamp}</p>
            <p><strong>Data:</strong> ${block.data}</p>
            <p><strong>Hash:</strong> ${block.hash}</p>
            <p><strong>Previous Hash:</strong> ${block.previousHash}</p>
        </div>
    `).join('<hr>');
}

// Initial display of the blockchain
displayChain();
