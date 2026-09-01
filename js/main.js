/* ==========================================================================
   SUMIT RAJENDRA GAWAI - PLACEMENT PORTFOLIO
   Interactive Engine, Terminal Simulation, Theme Switcher & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAmbientCanvas();
  initTypewriter();
  initMobileNav();
  initModals();
  initSkillTabs();
  initSmoothScroll();
});

/* ==========================================================================
   THEME SWITCHER
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check stored preference or default to dark
  const savedTheme = localStorage.getItem('sumit_portfolio_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('sumit_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* ==========================================================================
   TYPEWRITER ANIMATION
   ========================================================================== */
const typewriterPhrases = [
  "Python Programming Intern @ CodeAlpha",
  "B.Tech AI & Data Science Student",
  "Computer Vision & OpenCV Developer",
  "Full-Stack Python & React Engineer",
  "Problem Solver & Fast Learner"
];

function initTypewriter() {
  const textEl = document.getElementById('typewriterText');
  if (!textEl) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentPhrase = typewriterPhrases[phraseIndex];

    if (isDeleting) {
      textEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      textEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at full phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
      typingSpeed = 400; // Pause before new phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   AMBIENT PARTICLES BACKGROUND CANVAS
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const particleCount = Math.min(Math.floor(window.innerWidth / 25), 45);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(59, 130, 246, 0.45)' : 'rgba(37, 99, 235, 0.25)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / 120) * (isDark ? 0.15 : 0.08);
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }
}

/* ==========================================================================
   SKILLS FILTER TABS
   ========================================================================== */
function initSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   MODALS LOGIC (Resume & Architecture)
   ========================================================================== */
function initModals() {
  const resumeModal = document.getElementById('resumeModal');
  const archModal = document.getElementById('archModal');
  
  // Resume triggers
  document.querySelectorAll('.open-resume-trigger, #resumeModalBtn').forEach(btn => {
    btn.addEventListener('click', () => openModal(resumeModal));
  });

  const closeResumeBtn = document.getElementById('closeResumeModal');
  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', () => closeModal(resumeModal));
  }

  // Architecture modal triggers
  document.querySelectorAll('.open-arch-modal').forEach(btn => {
    btn.addEventListener('click', () => openModal(archModal));
  });

  const closeArchBtn = document.getElementById('closeArchModal');
  if (closeArchBtn) {
    closeArchBtn.addEventListener('click', () => closeModal(archModal));
  }

  // Close when clicking outside backdrop
  [resumeModal, archModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (resumeModal && resumeModal.classList.contains('show')) closeModal(resumeModal);
      if (archModal && archModal.classList.contains('show')) closeModal(archModal);
    }
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 250);
}

/* ==========================================================================
   INTERACTIVE TERMINAL SIMULATOR FOR BANKING SYSTEM
   ========================================================================== */
const bankState = {
  isLoggedIn: false,
  accountNo: "1001",
  accountName: "Sumit R. Gawai (Demo)",
  pin: "1234",
  balance: 15450.00,
  history: [
    { type: "Initial Deposit", amount: 10000.00, timestamp: "2026-02-15 10:20:00" },
    { type: "Interest Credit", amount: 450.00, timestamp: "2026-02-20 18:00:00" },
    { type: "Project Stipend", amount: 5000.00, timestamp: "2026-02-28 09:15:30" }
  ]
};

window.executeTermCommand = function(cmd) {
  const terminal = document.getElementById('interactiveTerminal');
  const liveText = document.getElementById('termLiveText');
  if (!terminal) return;

  const parts = cmd.trim().split(' ');
  const action = parts[0].toLowerCase();

  // Add command prompt line
  appendTermLine(`bank_cli> ${cmd}`, 'prompt-user');

  if (action === 'help') {
    appendTermLine(`Available commands:`, 'info-term');
    appendTermLine(`  login <acc_no> <4-digit-pin>  - Authenticate user session`, 'output');
    appendTermLine(`  balance                       - View current account balance`, 'output');
    appendTermLine(`  deposit <amount>              - Deposit atomic amount to balance`, 'output');
    appendTermLine(`  withdraw <amount>             - Safe withdrawal with balance guard`, 'output');
    appendTermLine(`  history                       - View timestamped audit logs`, 'output');
    appendTermLine(`  logout                        - End current session`, 'output');
    appendTermLine(`  clear                         - Clear terminal screen`, 'output');
  } 
  else if (action === 'login') {
    const acc = parts[1];
    const pin = parts[2];
    if (!acc || !pin) {
      appendTermLine(`[!] Syntax Error: Use 'login <acc_no> <pin>' (e.g. login 1001 1234)`, 'err-term');
    } else if (acc === bankState.accountNo && pin === bankState.pin) {
      bankState.isLoggedIn = true;
      appendTermLine(`[✓] SUCCESS: Welcome ${bankState.accountName}!`, 'info-term');
      appendTermLine(`[i] Session authenticated. PIN verification passed.`, 'output');
    } else {
      appendTermLine(`[✕] AUTH ERROR: Invalid Account or PIN! Demo is 1001 / 1234`, 'err-term');
    }
  } 
  else if (action === 'balance') {
    if (!bankState.isLoggedIn) {
      appendTermLine(`[!] ACCESS DENIED: Please login first (run: login 1001 1234)`, 'warn-term');
    } else {
      appendTermLine(`--------------------------------------------------`, 'output');
      appendTermLine(`Account Number : ${bankState.accountNo}`, 'output');
      appendTermLine(`Account Holder : ${bankState.accountName}`, 'output');
      appendTermLine(`Current Balance: ₹${bankState.balance.toLocaleString('en-IN', {minimumFractionDigits: 2})}`, 'highlight-term');
      appendTermLine(`--------------------------------------------------`, 'output');
    }
  } 
  else if (action === 'deposit') {
    if (!bankState.isLoggedIn) {
      appendTermLine(`[!] ACCESS DENIED: Please login first (run: login 1001 1234)`, 'warn-term');
    } else {
      const amount = parseFloat(parts[1]);
      if (isNaN(amount) || amount <= 0) {
        appendTermLine(`[!] INVALID AMOUNT: Enter positive numeric amount (e.g. deposit 2500)`, 'err-term');
      } else {
        bankState.balance += amount;
        const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
        bankState.history.push({ type: "Deposit", amount: amount, timestamp: now });
        appendTermLine(`[✓] ₹${amount.toFixed(2)} deposited successfully!`, 'info-term');
        appendTermLine(`[i] Persistent state saved to 'file_storage.json'. New Balance: ₹${bankState.balance.toFixed(2)}`, 'output');
      }
    }
  } 
  else if (action === 'withdraw') {
    if (!bankState.isLoggedIn) {
      appendTermLine(`[!] ACCESS DENIED: Please login first (run: login 1001 1234)`, 'warn-term');
    } else {
      const amount = parseFloat(parts[1]);
      if (isNaN(amount) || amount <= 0) {
        appendTermLine(`[!] INVALID AMOUNT: Enter positive numeric amount (e.g. withdraw 1000)`, 'err-term');
      } else if (amount > bankState.balance) {
        appendTermLine(`[✕] INSUFFICIENT FUNDS: Requested ₹${amount}, Available ₹${bankState.balance}`, 'err-term');
      } else {
        bankState.balance -= amount;
        const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
        bankState.history.push({ type: "Withdrawal", amount: -amount, timestamp: now });
        appendTermLine(`[✓] ₹${amount.toFixed(2)} withdrawn successfully!`, 'info-term');
        appendTermLine(`[i] Audit log recorded. Remaining Balance: ₹${bankState.balance.toFixed(2)}`, 'output');
      }
    }
  } 
  else if (action === 'history') {
    if (!bankState.isLoggedIn) {
      appendTermLine(`[!] ACCESS DENIED: Please login first (run: login 1001 1234)`, 'warn-term');
    } else {
      appendTermLine(`=== AUDIT TRAIL / TRANSACTION HISTORY ===`, 'highlight-term');
      bankState.history.forEach((item, idx) => {
        const sign = item.amount >= 0 ? '+' : '';
        appendTermLine(`[#${idx+1}] ${item.timestamp} | ${item.type.padEnd(16)} | ${sign}₹${Math.abs(item.amount).toFixed(2)}`, 'output');
      });
      appendTermLine(`=========================================`, 'output');
    }
  }
  else if (action === 'logout') {
    bankState.isLoggedIn = false;
    appendTermLine(`[✓] User logged out securely. Session ended.`, 'info-term');
  }
  else if (action === 'clear') {
    terminal.innerHTML = '';
    appendTermLine(`===========================================`, 'output');
    appendTermLine(`  SUMIT'S SECURE BANKING SYSTEM v2.0  `, 'highlight-term');
    appendTermLine(`===========================================`, 'output');
    appendTermLine(`[*] Storage backend: file_storage.json (ONLINE)`, 'info-term');
    appendTermLine(`[*] Default Demo Account: 1001 | PIN: 1234`, 'info-term');
  }
  else {
    appendTermLine(`[!] Unknown command '${cmd}'. Type 'help' for available actions.`, 'err-term');
  }

  terminal.scrollTop = terminal.scrollHeight;
};

function appendTermLine(text, typeClass) {
  const terminal = document.getElementById('interactiveTerminal');
  if (!terminal) return;
  const line = document.createElement('div');
  line.className = `term-line ${typeClass}`;
  line.textContent = text;
  
  // Insert before quick actions if exists
  const quickActions = terminal.querySelector('.terminal-quick-actions');
  if (quickActions) {
    terminal.insertBefore(line, quickActions);
  } else {
    terminal.appendChild(line);
  }
}

// Launch button scroll & focus
const launchTermBtn = document.getElementById('launchTerminalBtn');
if (launchTermBtn) {
  launchTermBtn.addEventListener('click', () => {
    const term = document.getElementById('interactiveTerminal');
    if (term) {
      term.scrollIntoView({ behavior: 'smooth', block: 'center' });
      executeTermCommand('login 1001 1234');
      setTimeout(() => executeTermCommand('balance'), 300);
    }
  });
}

/* ==========================================================================
   CLIPBOARD & TOAST NOTIFICATIONS
   ========================================================================== */
window.copyToClipboard = function(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg || 'Copied to clipboard!');
  }).catch(err => {
    console.error('Copy failed: ', err);
    showToast('Failed to copy. Please copy manually.');
  });
};

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   GUARANTEED DIRECT INBOX DISPATCH TO sumitgawai269@gmail.com
   ========================================================================== */
window.handleContactDispatch = function(e) {
  e.preventDefault();
  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const company = document.getElementById('senderCompany').value.trim() || 'Recruiter';
  const message = document.getElementById('senderMessage').value.trim();

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Opening Gmail...</span>`;
  }

  const subjectText = `Portfolio Opportunity: ${name} (${company})`;
  const bodyText = `Hi Sumit,

Name: ${name}
Work Email: ${email}
Organization: ${company}

Message:
${message}

---
Sent via Sumit Rajendra Gawai Portfolio Website`;

  // 1. Direct Gmail Web Compose URL (Opens Gmail in browser with To, Subject, Body pre-filled)
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sumitgawai269@gmail.com&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
  
  // 2. Standard Mailto Fallback
  const mailtoUrl = `mailto:sumitgawai269@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

  // Also send asynchronous payload to FormSubmit backup
  fetch("https://formsubmit.co/ajax/sumitgawai269@gmail.com", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      "Recruiter Name": name,
      "Email": email,
      "Company": company,
      "Message": message,
      "_subject": subjectText
    })
  }).catch(() => {});

  // Open Gmail web compose in a new tab
  const win = window.open(gmailUrl, '_blank');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    // If popup blocked, open via mailto
    window.location.href = mailtoUrl;
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Opened in Gmail!</span>`;
      setTimeout(() => {
        submitBtn.innerHTML = `<i class="fa-brands fa-google"></i> <span>Send via Gmail / Email</span>`;
      }, 3500);
    }
    showToast(`Redirecting to Gmail with pre-filled message for sumitgawai269@gmail.com!`);
  }, 400);
};

window.handleContactSubmit = async function(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const name = document.getElementById('senderName').value;
  const email = document.getElementById('senderEmail').value;
  const company = document.getElementById('senderCompany').value || 'Recruiter';
  const message = document.getElementById('senderMessage').value;

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending to sumitgawai269@gmail.com...</span>`;
  }

  const formData = {
    name: name,
    email: email,
    company: company,
    message: message,
    _subject: `New Placement Inquiry: ${name} (${company})`,
    _captcha: "false"
  };

  try {
    const res = await fetch("https://formsubmit.co/ajax/sumitgawai269@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (res.ok && (data.success === "true" || data.success === true || data.message)) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Message Sent Successfully!</span>`;
        setTimeout(() => {
          submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Send Direct Message</span>`;
        }, 4000);
      }
      showToast(`Thank you ${name}! Your message has been sent to Sumit.`);
      form.reset();
      return;
    }
  } catch (err) {
    console.warn("AJAX submission attempt logged: ", err);
  }

  // If AJAX is blocked by browser/network, submit natively or via mail client
  try {
    sendViaMailClient();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Email App Launched</span>`;
      setTimeout(() => {
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Send Direct Message</span>`;
      }, 3000);
    }
    showToast(`Launching your email app to send to sumitgawai269@gmail.com.`);
  } catch (err2) {
    form.submit();
  }
};

/* ==========================================================================
   SMOOTH SCROLL & ACTIVE NAV HIGHLIGHTING
   ========================================================================== */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
