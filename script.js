document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('prompt-input');
    const sendBtn = document.getElementById('send-btn');
    const responseContainer = document.getElementById('response-container');
    const riskValue = document.getElementById('risk-value');
    const responseBox = document.getElementById('response-box');

    // List of malicious keywords indicating prompt injection or jailbreak
    const maliciousKeywords = [
        // Prompt Injection & Jailbreaks
        "ignore previous instructions",
        "jailbreak",
        "bypass",
        "reveal",
        "system prompt",
        "act as",
        "developer mode",
        "do anything now",
        "hypothetical scenario",
        "let's play a game",
        "you are now",
        "pretend to be",
        "new rules",
        "override",
        "ignore all",
        
        // System & Command Execution
        "sudo ",
        "cmd.exe",
        "powershell",
        "rm -rf",
        "format c:",
        "exec(",
        "system(",
        "eval(",
        
        // Injection Attacks (SQL, XSS)
        "drop table",
        "select * from",
        "union select",
        "<script>",
        "javascript:",
        "document.cookie",
        "onload=",
        "onerror=",
        
        // Harmful & Illegal Content
        "make a bomb",
        "build a bomb",
        "how to hack",
        "hack account",
        "steal password",
        "explosive",
        "weapon",
        "kill",
        "attack",
        "illegal",
        "murder",
        "terrorism",
        "dark web",
        "credit card",
        "phishing",
        "malware",
        "ransomware",
        "trojan",
        "keylogger"
    ];

    function checkPrompt() {
        const text = promptInput.value.trim();

        if (!text) {
            resetUI();
            return;
        }

        const lowerText = text.toLowerCase();

        // Check for malicious keywords
        const isMalicious = maliciousKeywords.some(keyword => lowerText.includes(keyword));

        // Remove previous state classes
        responseContainer.classList.remove('state-safe', 'state-malicious');

        if (isMalicious) {
            // Malicious state
            responseContainer.classList.add('state-malicious');
            riskValue.textContent = 'Suspicious ⚠️';
            responseBox.innerHTML = '<p>🚫 Blocked: Malicious prompt detected!</p>';
        } else {
            // Safe state
            responseContainer.classList.add('state-safe');
            riskValue.textContent = 'Safe ✅';
            // Escaping HTML to prevent XSS in the demo
            const escapedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            responseBox.innerHTML = `<p>✅ Safe Response: ${escapedText}</p>`;
        }
    }

    function resetUI() {
        responseContainer.classList.remove('state-safe', 'state-malicious');
        riskValue.textContent = 'Waiting for input...';
        responseBox.innerHTML = '<p class="placeholder-text">AI response will appear here...</p>';
    }

    sendBtn.addEventListener('click', checkPrompt);

    // Allow sending with Ctrl+Enter or Cmd+Enter
    promptInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            checkPrompt();
        }
    });
});
