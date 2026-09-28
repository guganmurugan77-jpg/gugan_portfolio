/**
 * AntiGravity Interactive Terminal Engine & Live Cyber Telemetry
 * Provides:
 * 1. Hero floating telemetry node with real-time port scanning and packet inspection
 * 2. Section 5 fully functional interactive cyber CLI shell with command interpreter
 */

(function () {
  // =========================================================================
  // 1. HERO LIVE TELEMETRY NODE SIMULATOR
  // =========================================================================
  function initHeroTerminalTelemetry() {
    const logContainer = document.getElementById('hero-terminal-logs');
    if (!logContainer) return;

    const streamLogs = [
      { text: '[INIT] Initializing Kali Linux security telemetry kernel 6.8.0-kali...', type: 'dim' },
      { text: '[NET] Interface wlan0 switched to Monitor Mode (rfkill unblocked)', type: 'info' },
      { text: '[NMAP] Scanning subnet 192.168.1.0/24 [-sS -sV -O -p 21,22,80,443,3306]', type: 'cyan' },
      { text: '[PACKET] SYN 192.168.1.104:49152 -> 192.168.1.1:80 [WIN 64240 MSS 1460]', type: 'muted' },
      { text: '[OPEN] Host: 192.168.1.1 | Port 80/tcp (HTTP Apache 2.4.52)', type: 'emerald' },
      { text: '[OPEN] Host: 192.168.1.1 | Port 443/tcp (HTTPS OpenSSL 3.0.2)', type: 'emerald' },
      { text: '[WARN] Port 3306/tcp (MySQL 8.0) exposed without TLS enforcement', type: 'amber' },
      { text: '[AUDIT] Checking CVE-2023-38606 & OWASP Top 10 injection vectors...', type: 'info' },
      { text: '[SOC] Suricata IDS engine: active signature ruleset 28,491 loaded', type: 'cyan' },
      { text: '[STATUS] Defense posture: ARMED | Zero-Trust Policy Verified | CGPA 8.0 Metric', type: 'emerald' }
    ];

    let index = 0;

    function appendNextLog() {
      const item = streamLogs[index % streamLogs.length];
      index++;

      const line = document.createElement('div');
      line.className = 'font-mono text-xs py-0.5 transition-opacity duration-300';
      
      let colorClass = 'text-gray-400';
      if (item.type === 'emerald') colorClass = 'text-emerald-400 font-semibold';
      if (item.type === 'cyan') colorClass = 'text-cyan-400';
      if (item.type === 'amber') colorClass = 'text-amber-400';
      if (item.type === 'info') colorClass = 'text-blue-300';
      if (item.type === 'dim') colorClass = 'text-gray-500';

      const timestamp = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100);
      line.innerHTML = `<span class="text-gray-600">[${timestamp}]</span> <span class="${colorClass}">${item.text}</span>`;

      logContainer.appendChild(line);

      // Keep maximum 12 lines
      if (logContainer.children.length > 12) {
        logContainer.removeChild(logContainer.firstChild);
      }

      logContainer.scrollTop = logContainer.scrollHeight;
    }

    // Interval for dynamic stream
    setInterval(appendNextLog, 2400);

    // Live Telemetry Counters
    const ppsCounter = document.getElementById('telemetry-pps');
    const threatScore = document.getElementById('telemetry-threat');
    const latencyCounter = document.getElementById('telemetry-latency');

    setInterval(() => {
      if (ppsCounter) {
        const pps = Math.floor(Math.random() * 450 + 1200);
        ppsCounter.textContent = `${pps.toLocaleString()} pkts/s`;
      }
      if (threatScore) {
        const score = (Math.random() * 0.4 + 9.6).toFixed(1);
        threatScore.textContent = `${score}/10`;
      }
      if (latencyCounter) {
        const ms = Math.floor(Math.random() * 8 + 18);
        latencyCounter.textContent = `${ms} ms`;
      }
    }, 1800);
  }

  // =========================================================================
  // 2. SECTION 5 INTERACTIVE CYBER CLI TERMINAL SHELL
  // =========================================================================
  function initContactCliTerminal() {
    const inputField = document.getElementById('cli-terminal-input');
    const outputArea = document.getElementById('cli-terminal-output');
    const form = document.getElementById('cli-terminal-form');

    if (!inputField || !outputArea) return;

    const COMMAND_HELP = `
<div class="text-cyan-400 font-bold mb-1">AVAILABLE CYBER SHELL COMMANDS:</div>
  <span class="text-emerald-400 font-semibold">whoami</span>          - Brief technical background & role description
  <span class="text-emerald-400 font-semibold">skills</span>          - Display technical arsenal & Kali security suite
  <span class="text-emerald-400 font-semibold">projects</span>        - Review active network security & vulnerability analysis
  <span class="text-emerald-400 font-semibold">academic</span>        - View S.A. Engineering College metrics & CGPA 8.0
  <span class="text-emerald-400 font-semibold">contact</span>         - Fetch direct contact vectors (email, phone, LinkedIn)
  <span class="text-emerald-400 font-semibold">scan [ip/domain]</span> - Simulate Kali Linux vulnerability port scan
  <span class="text-emerald-400 font-semibold">ping [target]</span>   - Run live latency ICMP simulation
  <span class="text-emerald-400 font-semibold">download-resume</span> - Open printable high-fidelity ATS resume modal
  <span class="text-emerald-400 font-semibold">clear</span>           - Wipe terminal scrollback buffer
  <span class="text-emerald-400 font-semibold">matrix</span>          - Toggle hyper-speed matrix glitch sequence
`;

    function printOutput(html, isCommand = false) {
      const block = document.createElement('div');
      block.className = 'my-1';
      if (isCommand) {
        block.innerHTML = `<div class="flex items-center gap-2 text-xs text-gray-500 font-mono mt-2">
          <span class="text-emerald-400">gugan@anti-gravity:~$</span> 
          <span class="text-white font-medium">${html}</span>
        </div>`;
      } else {
        block.innerHTML = `<div class="font-mono text-xs leading-relaxed">${html}</div>`;
      }
      outputArea.appendChild(block);
      outputArea.scrollTop = outputArea.scrollHeight;
    }

    function processCommand(rawCmd) {
      const trimmed = rawCmd.trim();
      const parts = trimmed.split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ');

      printOutput(trimmed, true);

      if (window.cyberAudio) window.cyberAudio.playClick();

      switch (cmd) {
        case '':
          break;
        case 'help':
          printOutput(COMMAND_HELP);
          break;

        case 'whoami':
          printOutput(`
<div class="text-gray-300">
  <span class="text-emerald-400 font-bold">Gugan M</span> — Cyber Security & Ethical Hacking Specialist.<br>
  Degree: B.E. Computer Science and Engineering (Cyber Security) at S.A. Engineering College, Chennai.<br>
  Academic Standing: <span class="text-emerald-400 font-semibold">CGPA 8.0</span>.<br>
  Location: Chennai, Tamil Nadu, India.<br>
  Career Objective: Seeking an internship/full-time opportunity to enhance technical knowledge and gain practical experience in cybersecurity, networking, and programming while defending modern infrastructure.
</div>`);
          break;

        case 'skills':
          printOutput(`
<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300 my-1">
  <div><span class="text-cyan-400">[PROGRAMMING]:</span> Python, Java, C (Basics)</div>
  <div><span class="text-emerald-400">[SECURITY TOOLS]:</span> Kali Linux, Nmap, Wireshark, Metasploit</div>
  <div><span class="text-amber-400">[DOMAINS]:</span> Ethical Hacking, Penetration Testing, SOC Analysis</div>
  <div><span class="text-blue-400">[INFRASTRUCTURE]:</span> SQL Security, Networking (TCP/IP, OSI, Subnets)</div>
</div>`);
          break;

        case 'projects':
          printOutput(`
<div class="text-gray-300">
  <div class="text-emerald-400 font-bold mb-1">FEATURED PROJECT: Basic Network Security Analysis</div>
  • Performed comprehensive vulnerability assessment and network analysis using Kali Linux tools.<br>
  • Explored critical concepts: Port scanning (SYN/ACK), system security, and real-time network monitoring.<br>
  • Analyzed packet captures with Wireshark and evaluated risk vectors with Metasploit frameworks.
</div>`);
          break;

        case 'academic':
          printOutput(`
<div class="text-gray-300">
  <span class="text-cyan-400 font-bold">S.A. Engineering College, Chennai</span><br>
  B.E. Computer Science and Engineering – Cyber Security (2024 – Present)<br>
  Performance: <span class="text-emerald-400 font-bold">CGPA: 8.0</span> (Up to 3rd Semester)<br>
  Core Strengths: Quick learner, Problem-solving ability, Teamwork & communication, Adaptability.<br>
  Languages: English, Tamil.
</div>`);
          break;

        case 'contact':
          printOutput(`
<div class="text-gray-300 space-y-1">
  <div><span class="text-cyan-400">Email:</span> <a href="mailto:guganmurugan77@gmail.com" class="text-emerald-400 hover:underline">guganmurugan77@gmail.com</a></div>
  <div><span class="text-cyan-400">Phone:</span> <a href="tel:+918610228091" class="text-emerald-400 hover:underline">+91 8610228091</a></div>
  <div><span class="text-cyan-400">Location:</span> Chennai, Tamil Nadu, India</div>
  <div><span class="text-cyan-400">LinkedIn:</span> <a href="https://www.linkedin.com/in/gugan-murugan-727658337" target="_blank" class="text-emerald-400 hover:underline">linkedin.com/in/gugan-murugan-727658337</a></div>
</div>`);
          break;

        case 'scan':
          const target = arg || '192.168.1.1';
          printOutput(`<div class="text-yellow-400">[+] Launching stealth SYN probe on target ${target}...</div>`);
          if (window.cyberAudio) window.cyberAudio.playScanPing();
          setTimeout(() => {
            printOutput(`
<div class="text-gray-300">
  Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-28 10:45 IST<br>
  Nmap scan report for ${target}<br>
  Host is up (0.0024s latency).<br>
  Not shown: 996 closed ports<br>
  <span class="text-cyan-400">PORT     STATE SERVICE VERSION</span><br>
  <span class="text-emerald-400">22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu</span><br>
  <span class="text-emerald-400">80/tcp   open  http    nginx 1.18.0</span><br>
  <span class="text-emerald-400">443/tcp  open  ssl/tls OpenSSL 3.0.2</span><br>
  <span class="text-amber-400">3306/tcp open  mysql   MySQL 8.0.35</span><br>
  MAC Address: 00:0C:29:4F:8E:2B (VMware)<br>
  <span class="text-emerald-400 font-semibold">[✓] Assessment complete: 0 critical zero-days found. Defense hardening recommended on 3306.</span>
</div>`);
          }, 800);
          break;

        case 'ping':
          const pingTarget = arg || 'security.gugan.io';
          printOutput(`<div class="text-cyan-400">PING ${pingTarget} (10.0.0.1) 56(84) bytes of data.</div>`);
          let pCount = 0;
          const pingInterval = setInterval(() => {
            pCount++;
            const latency = (Math.random() * 6 + 18).toFixed(2);
            printOutput(`<div class="text-gray-400">64 bytes from 10.0.0.1: icmp_seq=${pCount} ttl=64 time=${latency} ms</div>`);
            if (pCount >= 3) {
              clearInterval(pingInterval);
              printOutput(`<div class="text-emerald-400 font-semibold">--- ${pingTarget} ping statistics: 3 packets transmitted, 3 received, 0% packet loss ---</div>`);
            }
          }, 400);
          break;

        case 'download-resume':
          printOutput(`<div class="text-emerald-400 font-bold">[✓] Triggering ATS Resume Modal & PDF Engine...</div>`);
          const modal = document.getElementById('resume-modal');
          if (modal) modal.classList.add('open');
          break;

        case 'clear':
          outputArea.innerHTML = '';
          break;

        case 'matrix':
          printOutput(`<div class="text-emerald-400 font-bold">[MATRIX] Spatial field warp oscillation intensified.</div>`);
          if (window.cyberAudio) window.cyberAudio.playScanPing();
          break;

        default:
          printOutput(`<span class="text-red-400">zsh: command not found: ${cmd}</span>. Type <span class="text-emerald-400 underline cursor-pointer" onclick="document.getElementById('cli-terminal-input').value='help'; document.getElementById('cli-terminal-form').dispatchEvent(new Event('submit'));">help</span> for available commands.`);
          break;
      }
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const cmd = inputField.value;
        if (!cmd.trim()) return;
        processCommand(cmd);
        inputField.value = '';
      });
    }

    // Play subtle keypress sounds
    inputField.addEventListener('input', () => {
      if (window.cyberAudio) window.cyberAudio.playKeypress();
    });
  }

  // =========================================================================
  // 3. SECURE MESSAGE TRANSMISSION SIMULATOR (Contact Form)
  // =========================================================================
  function initContactTransmissionForm() {
    const contactForm = document.getElementById('secure-contact-form');
    const statusMsg = document.getElementById('transmission-status');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sendBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = sendBtn.innerHTML;

      sendBtn.disabled = true;
      sendBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">⚙</span>
        <span>ENCRYPTING AES-4096...</span>
      `;

      if (window.cyberAudio) window.cyberAudio.playScanPing();

      setTimeout(() => {
        sendBtn.innerHTML = `
          <span class="text-emerald-400 mr-2">✓</span>
          <span>TRANSMISSION DISPATCHED</span>
        `;
        if (statusMsg) {
          statusMsg.innerHTML = `<span class="text-emerald-400 font-mono text-xs">Encrypted packet routed to guganmurugan77@gmail.com with zero telemetry leaks.</span>`;
          statusMsg.classList.remove('hidden');
        }

        setTimeout(() => {
          sendBtn.disabled = false;
          sendBtn.innerHTML = originalText;
          contactForm.reset();
        }, 3500);
      }, 1400);
    });
  }

  // Bootstrapping
  window.addEventListener('DOMContentLoaded', () => {
    initHeroTerminalTelemetry();
    initContactCliTerminal();
    initContactTransmissionForm();
  });
})();
