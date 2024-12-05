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

document.getElementById('loginBtn').addEventListener('click', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.classList.toggle('hidden');
});

document.getElementById('submitLogin').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "1234") {
        alert("Login successful!");
    } else {
        alert("Invalid username or password.");
    }
});

document.getElementById('tamperBlock').addEventListener('click', () => {
    if (supplyChain.chain.length > 1) {
        // Tamper with the second block's data
        supplyChain.chain[1].data = "Tampered Data";

        // Tamper with its hash to simulate an attack
        supplyChain.chain[1].hash = "1234567890abcdef";

        displayChain();
        alert("Block has been tampered with.");
    } else {
        alert("Not enough blocks to tamper.");
    }
});
