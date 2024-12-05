const supplyChain = new Blockchain();

document.getElementById('addBlock').addEventListener('click', () => {
    const data = prompt("Enter block data:");
    if (data) {
        const newBlock = new Block(supplyChain.chain.length, new Date().toISOString(), data);
        supplyChain.addBlock(newBlock);
        displayChain();
    }
});

document.getElementById('validateChain').addEventListener('click', () => {
    const output = supplyChain.isChainValid() ? "Blockchain is valid." : "Blockchain is not valid!";
    alert(output);
});

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
displayChain();
