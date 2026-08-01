(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isFinePointer = window.matchMedia("(pointer: fine)").matches;
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ========== Theme ========== */
  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var storedTheme = localStorage.getItem("portfolio-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    root.setAttribute("data-theme", storedTheme);
  }
  function updateThemeColor() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = root.getAttribute("data-theme") === "light" ? "#E8ECF4" : "#0A0C16";
  }
  updateThemeColor();
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("portfolio-theme", next);
      updateThemeColor();
    });
  }

 /* ========== HERO EYEBROW SMOOTH TYPING ANIMATION ========== */
  function initEyebrowTyping() {
    var lines = [
      { id: "typeLine1", text: "// BCA (Hons.) Student" },
      { id: "typeLine2", text: "// Networking Enthusiast" },
      { id: "typeLine3", text: "// Cybersecurity Learner" }
    ];

    var lineIndex = 0;

    function typeNextLine() {
      if (lineIndex >= lines.length) return;

      var lineObj = lines[lineIndex];
      var el = document.getElementById(lineObj.id);
      if (!el) return;

      var fullText = lineObj.text;
      var charIndex = 0;
      el.classList.add("typing-active");

      function typeChar() {
        if (charIndex < fullText.length) {
          el.textContent = fullText.substring(0, charIndex + 1);
          charIndex++;
          // Variable typing speed (between 35ms and 65ms per letter) for natural human feel
          var speed = 40 + Math.random() * 25; 
          setTimeout(typeChar, speed);
        } else {
          el.classList.remove("typing-active");
          lineIndex++;
          setTimeout(typeNextLine, 280); // Smooth 280ms pause before starting the next line
        }
      }

      typeChar();
    }

    if (reduceMotion) {
      lines.forEach(function (l) {
        var el = document.getElementById(l.id);
        if (el) el.textContent = l.text;
      });
    } else {
      setTimeout(typeNextLine, 500); // 500ms initial wait after page render
    }
  }

  initEyebrowTyping();

  /* ========== Learning Banner ========== */
  var learningBanner = document.getElementById("learning-banner");
  var closeLearning = document.getElementById("closeLearning");
  if (learningBanner && !sessionStorage.getItem("learning-dismissed")) {
    document.body.classList.add("has-learning-banner");
  } else if (learningBanner) {
    learningBanner.classList.add("hidden");
  }
  if (closeLearning) {
    closeLearning.addEventListener("click", function () {
      if (learningBanner) {
        learningBanner.classList.add("hidden");
        document.body.classList.remove("has-learning-banner");
        sessionStorage.setItem("learning-dismissed", "1");
      }
    });
  }

  /* ========== Footer year ========== */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ========== Custom cursor ========== */
  if (isFinePointer && !reduceMotion) {
    document.body.classList.add("has-fine-pointer");
    var dot = document.getElementById("cursorDot");
    var ring = document.getElementById("cursorRing");
    var rx = 0, ry = 0, mx = 0, my = 0;
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (dot) dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      if (ring) ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a, button, [data-magnetic], .skill-pill, .filter-btn").forEach(function (el) {
      el.addEventListener("mouseenter", function () { if (ring) ring.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { if (ring) ring.classList.remove("is-hover"); });
    });
  }

  /* ========== Mobile menu ========== */
  var menuBtn = document.getElementById("menuBtn");
  var closeMenuBtn = document.getElementById("closeMenuBtn");
  var mobileMenu = document.getElementById("mobile-menu");
  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (menuBtn) menuBtn.addEventListener("click", openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener("click", closeMenu);
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) closeMenu();
  });

  /* ========== Scroll progress ========== */
  var progressBar = document.getElementById("scroll-progress");
  function updateProgress() {
    if (!progressBar) return;
    var h = document.documentElement;
    var pct = (h.scrollTop) / Math.max(1, h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = pct + "%";
    progressBar.setAttribute("aria-valuenow", Math.round(pct));
  }
  window.addEventListener("scroll", updateProgress, { passive: true });

  /* ========== Scrollspy + pill ========== */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var navPill = document.getElementById("nav-pill");
  var sections = navLinks.map(function (l) { return document.getElementById(l.dataset.section); });
  function movePill(link) {
    if (!navPill) return;
    if (!link) { navPill.style.width = "0px"; return; }
    navPill.style.width = link.offsetWidth + "px";
    navPill.style.transform = "translateX(" + link.offsetLeft + "px)";
  }
  function onScrollSpy() {
    var active = null;
    var scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach(function (sec, i) {
      if (!sec) return;
      var top = sec.offsetTop, bottom = top + sec.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) active = navLinks[i];
    });
    navLinks.forEach(function (l) { l.classList.toggle("active", l === active); });
    movePill(active);
  }
  window.addEventListener("scroll", onScrollSpy, { passive: true });
  window.addEventListener("resize", onScrollSpy);
  onScrollSpy();

  /* ========== Back to top ========== */
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ========== Magnetic ========== */
  if (!reduceMotion && isFinePointer && window.gsap) {
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      var moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      var moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        moveX((e.clientX - r.left - r.width / 2) * 0.3);
        moveY((e.clientY - r.top - r.height / 2) * 0.3);
      });
      el.addEventListener("mouseleave", function () { moveX(0); moveY(0); });
    });
  }

  /* ========== Spotlight + tilt ========== */
  document.querySelectorAll(".spotlight").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });
  if (!reduceMotion && isFinePointer) {
    document.querySelectorAll(".project-card, .cert-card, .writeup-card, .platform-badge").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(600px) rotateX(" + (py * -5) + "deg) rotateY(" + (px * 7) + "deg) translateY(-2px)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  /* ========== Hero load ========== */
  if (window.gsap) {
    gsap.timeline()
      .from(".nav-inner", { y: -30, opacity: 0, duration: 0.6, ease: "power3.out" })
      .from(".hero-anim", { y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.2");
  }

  /* ========== GitHub Contribution Graph (mock realistic data) ========== */
  function buildContribGraph() {
    var weeksEl = document.getElementById("contribWeeks");
    if (!weeksEl) return;
    var weeks = 12;
    var levels = [0, 0, 1, 1, 2, 2, 3, 3, 4, 1, 0, 2, 3, 4, 2, 1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 4, 3, 2, 1, 0, 0, 1, 2, 3, 2, 1, 0, 2, 3, 4, 2, 1, 0, 1, 2, 3, 4, 2, 1, 0, 1, 2, 3, 1, 0, 0, 1, 2, 3, 4, 2, 1, 0, 1, 2, 3, 2, 1, 0, 2, 3, 4, 3, 1, 0, 1, 2, 3, 4, 2, 0, 1];
    var idx = 0;
    for (var w = 0; w < weeks; w++) {
      var week = document.createElement("div");
      week.className = "contrib-week";
      for (var d = 0; d < 7; d++) {
        var cell = document.createElement("span");
        var lvl = levels[idx % levels.length];
        cell.className = "contrib-cell l" + lvl;
        cell.title = lvl + " contributions";
        week.appendChild(cell);
        idx++;
      }
      weeksEl.appendChild(week);
    }
  }
  buildContribGraph();

  /* ========== Visitor Analytics (mocked) ========== */
  function initVisitorStats() {
    var countEl = document.getElementById("visitorCount");
    var liveEl = document.getElementById("liveCount");
    if (!countEl || !liveEl) return;
    var base = 1847 + Math.floor(Math.random() * 400);
    var live = 3 + Math.floor(Math.random() * 9);
    countEl.textContent = base.toLocaleString();
    liveEl.textContent = live;
    setInterval(function () {
      if (Math.random() > 0.6) {
        base += Math.random() > 0.5 ? 1 : 0;
        countEl.textContent = base.toLocaleString();
      }
      live = Math.max(1, live + (Math.random() > 0.5 ? 1 : -1));
      if (live > 14) live = 8;
      liveEl.textContent = live;
    }, 12000);
  }
  initVisitorStats();

  /* ========== Blog filters ========== */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var blogCards = document.querySelectorAll("#blogGrid .writeup-card");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.dataset.filter;
      filterBtns.forEach(function (b) {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      blogCards.forEach(function (card) {
        var cats = (card.dataset.category || "").split(/\s+/);
        var show = filter === "all" || cats.indexOf(filter) !== -1;
        card.classList.toggle("hidden-card", !show);
      });
    });
  });

  /* ========== ADVANCED INTERACTIVE TERMINAL ========== */
  var codeBody = document.getElementById("codeBody");
  var savedPill = document.getElementById("savedPill");
  var terminalCard = document.getElementById("terminalCard");
  var terminalInput = document.getElementById("terminalInput");
  var terminalCaret = document.getElementById("terminalCaret");
  var lineCounter = 0;
  var cmdHistory = [];
  var historyIndex = -1;
  var currentInput = "";
  var commands = ["help", "whoami", "skills", "projects", "certs", "about", "contact", "resume", "clear", "ls", "cat", "sudo", "matrix", "nmap", "ping", "ipconfig", "ifconfig"];

  function appendLine(tokens) {
    if (!codeBody) return;
    lineCounter++;
    var row = document.createElement("div");
    row.className = "code-line";
    var no = document.createElement("span");
    no.className = "line-no";
    no.textContent = lineCounter;
    row.appendChild(no);
    var span = document.createElement("span");
    tokens.forEach(function (tok) {
      var s = document.createElement("span");
      s.className = tok.c;
      s.textContent = tok.t;
      span.appendChild(s);
    });
    row.appendChild(span);
    codeBody.appendChild(row);
    codeBody.scrollTop = codeBody.scrollHeight;
  }

  function typeInitial() {
    var intro = [
      [{ t: "ashvin@portfolio", c: "tok-var" }, { t: ":", c: "tok-op" }, { t: "~", c: "tok-prop" }, { t: "$ ", c: "tok-op" }, { t: "whoami", c: "tok-cmd" }],
      [{ t: "ashvin", c: "tok-bool" }],
      [{ t: "ashvin@portfolio", c: "tok-var" }, { t: ":", c: "tok-op" }, { t: "~", c: "tok-prop" }, { t: "$ ", c: "tok-op" }, { t: "cat status.txt", c: "tok-cmd" }],
      [{ t: "BCA (Hons.) Student  |  Networking + Cybersecurity", c: "tok-str" }],
      [{ t: "Home lab active  ·  TryHackMe 50+  ·  HTB 20+", c: "tok-str" }],
      [{ t: "ashvin@portfolio", c: "tok-var" }, { t: ":", c: "tok-op" }, { t: "~", c: "tok-prop" }, { t: "$ ", c: "tok-op" }, { t: "help", c: "tok-cmd" }],
      [{ t: "Type a command and press Enter. Tab to autocomplete. ↑↓ for history.", c: "tok-prop" }]
    ];
    if (reduceMotion) {
      intro.forEach(function (line) { appendLine(line); });
      if (savedPill) savedPill.classList.add("show");
      return;
    }
    var i = 0;
    function next() {
      if (i >= intro.length) {
        if (savedPill) savedPill.classList.add("show");
        return;
      }
      appendLine(intro[i]);
      i++;
      setTimeout(next, 160 + Math.random() * 100);
    }
    setTimeout(next, 350);
  }

  function handleCommand(cmd) {
    cmd = (cmd || "").trim().toLowerCase();
    if (!cmd) return;
    cmdHistory.push(cmd);
    historyIndex = cmdHistory.length;
    appendLine([{ t: "ashvin@portfolio", c: "tok-var" }, { t: ":", c: "tok-op" }, { t: "~", c: "tok-prop" }, { t: "$ ", c: "tok-op" }, { t: cmd, c: "tok-cmd" }]);

    if (cmd === "whoami") {
      appendLine([{ t: "ashvin", c: "tok-bool" }]);
      appendLine([{ t: "Ashvin Chaudhary — BCA student, networking & cyber enthusiast", c: "tok-str" }]);
    } else if (cmd === "ipconfig" || cmd === "ifconfig") {
      appendLine([{ t: "Ethernet adapter LabNIC:", c: "tok-prop" }]);
      appendLine([{ t: "   IPv4 Address. . . . . . . . . . . : 192.168.56.10", c: "tok-str" }]);
      appendLine([{ t: "   Subnet Mask . . . . . . . . . . . : 255.255.255.0", c: "tok-str" }]);
      appendLine([{ t: "   Default Gateway . . . . . . . . . : 192.168.56.1", c: "tok-str" }]);
      appendLine([{ t: "   Status . . . . . . . . . . . . . . : Home Lab Online", c: "tok-bool" }]);
    } else if (cmd === "skills") {
      appendLine([{ t: "Networking   : TCP/IP, VLANs, OSPF, ACLs, VPN, Packet Tracer, GNS3, Wireshark", c: "tok-str" }]);
      appendLine([{ t: "Cybersecurity: Recon, Vuln Assessment, Web App Testing, Nmap, Burp Suite", c: "tok-str" }]);
      appendLine([{ t: "Programming  : Python, Bash, JavaScript basics, Linux (Kali/Ubuntu)", c: "tok-str" }]);
    } else if (cmd === "projects") {
      appendLine([{ t: "1. Enterprise Campus Network Design (Packet Tracer / GNS3)", c: "tok-str" }]);
      appendLine([{ t: "2. Secure Network with Firewall & IPsec VPN", c: "tok-str" }]);
      appendLine([{ t: "3. Vulnerability Assessment Lab", c: "tok-str" }]);
      appendLine([{ t: "4. Web Application Security Testing (DVWA / OWASP)", c: "tok-str" }]);
      appendLine([{ t: "5. Network Traffic Analysis (Wireshark)", c: "tok-str" }]);
      appendLine([{ t: "→ Scroll to Projects section for details", c: "tok-prop" }]);
    } else if (cmd === "certs" || cmd === "certifications") {
      appendLine([{ t: "• Cisco Networking Basics", c: "tok-str" }]);
      appendLine([{ t: "• Cisco Introduction to Cybersecurity", c: "tok-str" }]);
      appendLine([{ t: "• Cisco Cybersecurity Essentials", c: "tok-str" }]);
      appendLine([{ t: "• TryHackMe Pre-Security Learning Path", c: "tok-str" }]);
    } else if (cmd === "about") {
      appendLine([{ t: "First-year BCA (Hons.) @ Ganpat University", c: "tok-str" }]);
      appendLine([{ t: "Building practical networking + cybersecurity skills through", c: "tok-str" }]);
      appendLine([{ t: "home labs, Cisco NetAcad, TryHackMe (50+) and Hack The Box (20+).", c: "tok-str" }]);
    } else if (cmd === "contact") {
      appendLine([{ t: "Email : Archaudhari2003@proton.me", c: "tok-str" }]);
      appendLine([{ t: "GitHub: github.com/ashvinchaudhary2003", c: "tok-str" }]);
      appendLine([{ t: "LinkedIn: linkedin.com/in/ar-chaudhari2003", c: "tok-str" }]);
      appendLine([{ t: "→ Scroll to Contact section or type 'resume'", c: "tok-prop" }]);
    } else if (cmd === "resume") {
      appendLine([{ t: "Triggering resume download...", c: "tok-str" }]);
      var btn = document.querySelector("[data-download-resume]");
      if (btn) btn.click();
    } else if (cmd === "clear") {
      codeBody.innerHTML = "";
      lineCounter = 0;
      appendLine([{ t: "Terminal cleared. Type 'help' for commands.", c: "tok-prop" }]);
    } else if (cmd === "help") {
      appendLine([{ t: "Available commands:", c: "tok-prop" }]);
      appendLine([{ t: "  whoami, skills, projects, certs, about, contact, resume", c: "tok-str" }]);
      appendLine([{ t: "  clear, ls, cat, ipconfig, help", c: "tok-str" }]);
      appendLine([{ t: "  Easter eggs: sudo, matrix, nmap, ping", c: "tok-prop" }]);
    } else if (cmd === "ls") {
      appendLine([{ t: "about.txt  skills.md  projects/  certs/  resume.pdf  lab/", c: "tok-str" }]);
    } else if (cmd === "cat" || cmd.indexOf("cat ") === 0) {
      var file = cmd.slice(4).trim() || "status.txt";
      if (file === "status.txt" || file === "about.txt") {
        appendLine([{ t: "Ashvin Chaudhary — Networking & Cybersecurity learner", c: "tok-str" }]);
      } else if (file === "resume.pdf") {
        appendLine([{ t: "Binary file (PDF). Use 'resume' command to download.", c: "tok-prop" }]);
      } else {
        appendLine([{ t: "cat: " + file + ": No such file", c: "tok-kw" }]);
      }
    } else if (cmd === "sudo" || cmd.indexOf("sudo ") === 0) {
      appendLine([{ t: "ashvin is not in the sudoers file. This incident will be reported.", c: "tok-kw" }]);
      appendLine([{ t: "(Just kidding — this is a portfolio demo.)", c: "tok-prop" }]);
    } else if (cmd === "matrix") {
      appendLine([{ t: "Wake up, Neo...", c: "tok-str" }]);
      appendLine([{ t: "The Matrix has you...", c: "tok-str" }]);
      appendLine([{ t: "Follow the white rabbit. 🐇", c: "tok-bool" }]);
    } else if (cmd === "nmap" || cmd.indexOf("nmap ") === 0) {
      appendLine([{ t: "Starting Nmap 7.95 ( lab simulation )", c: "tok-str" }]);
      appendLine([{ t: "Note: Portfolio demo only. Real scanning only on authorized systems.", c: "tok-prop" }]);
      appendLine([{ t: "Scan complete — 0 hosts (sandbox mode)", c: "tok-bool" }]);
    } else if (cmd === "ping" || cmd.indexOf("ping ") === 0) {
      appendLine([{ t: "PING portfolio.local (127.0.0.1): 56 data bytes", c: "tok-str" }]);
      appendLine([{ t: "64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms", c: "tok-str" }]);
      appendLine([{ t: "64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms", c: "tok-str" }]);
      appendLine([{ t: "--- portfolio.local ping statistics ---", c: "tok-prop" }]);
      appendLine([{ t: "2 packets transmitted, 2 packets received, 0.0% packet loss", c: "tok-bool" }]);
    } else {
      appendLine([{ t: "Command not found: " + cmd + ". Type 'help' for available commands.", c: "tok-kw" }]);
    }
  }

  function focusTerminal() {
    if (!terminalCard || !terminalInput) return;
    terminalCard.classList.add("focused");
    terminalInput.focus();
  }

  if (terminalCard && terminalInput) {
    terminalCard.addEventListener("click", function (e) {
      if (e.target.closest("a, button")) return;
      focusTerminal();
    });
    terminalCard.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && document.activeElement !== terminalInput) {
        focusTerminal();
      }
    });

    terminalInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        var val = terminalInput.textContent || "";
        terminalInput.textContent = "";
        currentInput = "";
        handleCommand(val);
        historyIndex = cmdHistory.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (cmdHistory.length === 0) return;
        if (historyIndex === cmdHistory.length) currentInput = terminalInput.textContent || "";
        historyIndex = Math.max(0, historyIndex - 1);
        terminalInput.textContent = cmdHistory[historyIndex] || "";
        placeCaretAtEnd(terminalInput);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex < cmdHistory.length - 1) {
          historyIndex++;
          terminalInput.textContent = cmdHistory[historyIndex] || "";
        } else {
          historyIndex = cmdHistory.length;
          terminalInput.textContent = currentInput;
        }
        placeCaretAtEnd(terminalInput);
      } else if (e.key === "Tab") {
        e.preventDefault();
        var partial = (terminalInput.textContent || "").trim().toLowerCase();
        if (!partial) return;
        var matches = commands.filter(function (c) { return c.indexOf(partial) === 0; });
        if (matches.length === 1) {
          terminalInput.textContent = matches[0];
          placeCaretAtEnd(terminalInput);
        } else if (matches.length > 1) {
          appendLine([{ t: matches.join("  "), c: "tok-prop" }]);
        }
      }
    });

    terminalInput.addEventListener("input", function () {
      // keep caret visible
    });
  }

  function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  typeInitial();

  /* ========== Resume download ========== */
  function setupDownloadButtons() {
    document.querySelectorAll("[data-download-resume]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (btn.classList.contains("is-downloading") || btn.classList.contains("is-success")) return;
        btn.classList.add("is-downloading");
        var progress = btn.querySelector(".download-progress");
        var label = btn.querySelector(".btn-label");
        if (progress) progress.style.width = "100%";
        if (window.gsap && !reduceMotion) {
          gsap.fromTo(btn, { scale: 1, rotateX: 0 }, { scale: 0.96, rotateX: 8, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.inOut" });
        }
        setTimeout(function () {
          var a = document.createElement("a");
          a.href = "Ashvin_Chaudhary_Resume.pdf";
          a.download = "Ashvin_Chaudhary_Resume.pdf";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          btn.classList.remove("is-downloading");
          btn.classList.add("is-success");
          if (label) label.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Downloaded';
          if (progress) progress.style.width = "0%";
          setTimeout(function () {
            btn.classList.remove("is-success");
            if (label) label.innerHTML = '<i class="fa-solid fa-download" aria-hidden="true"></i> Download Resume';
          }, 2800);
        }, 1100);
      });
    });
  }
  setupDownloadButtons();

  /* ========== ENHANCED SKILL NETWORK ========== */
  function initSkillNetwork() {
    var container = document.getElementById("skill-network");
    if (!container) return;
    var popup = document.getElementById("skill-popup");
    var popupTitle = document.getElementById("skillPopupTitle");
    var popupLevel = document.getElementById("skillPopupLevel");
    var popupDesc = document.getElementById("skillPopupDesc");
    var popupProjects = document.getElementById("skillPopupProjects");
    var popupClose = document.getElementById("skillPopupClose");

    var skillData = {
      "TCP/IP": { level: "Strong", desc: "Core protocol suite, packet structure, OSI mapping.", projects: "Campus Network, Traffic Analysis" },
      "VLANs": { level: "Strong", desc: "Segmentation, trunking, inter-VLAN routing.", projects: "Enterprise Campus Design" },
      "OSPF": { level: "Intermediate", desc: "Basic multi-area routing configuration.", projects: "Campus Network" },
      "Wireshark": { level: "Strong", desc: "Capture, filter, and analyze traffic for anomalies.", projects: "Traffic Analysis Lab" },
      "Packet Tracer": { level: "Strong", desc: "Cisco topology design and simulation.", projects: "All networking labs" },
      "Nmap": { level: "Intermediate", desc: "Host discovery, port scanning, service detection.", projects: "Vuln Assessment Lab" },
      "Burp": { level: "Intermediate", desc: "Proxy, repeater, and basic Intruder usage.", projects: "Web App Security Testing" },
      "Kali": { level: "Strong", desc: "Daily driver for labs and CTF practice.", projects: "Home Lab, CTFs" },
      "Python": { level: "Intermediate", desc: "Scripting, automation, basic tooling.", projects: "Lab automation" },
      "Linux": { level: "Strong", desc: "Kali & Ubuntu administration, networking tools.", projects: "Home Lab" },
      "GNS3": { level: "Intermediate", desc: "Emulated multi-vendor network topologies.", projects: "Home Lab" },
      "ACLs": { level: "Intermediate", desc: "Standard & extended ACL design and verification.", projects: "Secure Network + VPN" },
      "VPN": { level: "Intermediate", desc: "IPsec site-to-site and basic remote access.", projects: "Secure Network + VPN" },
      "THM": { level: "Active", desc: "50+ rooms across Pre-Security and beyond.", projects: "CTF Write-ups" }
    };

    var nodes = [
      { label: "TCP/IP", group: 0 }, { label: "VLANs", group: 0 }, { label: "OSPF", group: 0 },
      { label: "Wireshark", group: 0 }, { label: "Packet Tracer", group: 0 }, { label: "Nmap", group: 1 },
      { label: "Burp", group: 1 }, { label: "Kali", group: 1 }, { label: "Python", group: 2 },
      { label: "Linux", group: 2 }, { label: "GNS3", group: 0 }, { label: "ACLs", group: 0 },
      { label: "VPN", group: 1 }, { label: "THM", group: 1 }
    ];
    var colors = ["#7C6FFF", "#34E4C8", "#FF7AA8"];
    var canvas = document.createElement("canvas");
    container.insertBefore(canvas, container.firstChild);
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W, H, mouse = { x: -999, y: -999 }, dragging = null, built = false;
    var packets = [];
    var edges = [];

    function resize() {
      W = container.clientWidth; H = container.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!built) {
        nodes.forEach(function (n, i) {
          var angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          var radius = Math.min(W, H) * 0.28;
          n.tx = W / 2 + Math.cos(angle) * radius;
          n.ty = H / 2 + Math.sin(angle) * radius;
          n.x = W / 2; n.y = H / 2;
          n.vx = 0; n.vy = 0;
          n.radius = 5 + Math.random() * 2;
        });
      } else {
        nodes.forEach(function (n) {
          n.x = Math.max(40, Math.min(W - 40, n.x));
          n.y = Math.max(30, Math.min(H - 30, n.y));
        });
      }
      edges = [];
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          if (nodes[i].group === nodes[j].group || Math.random() > 0.65) {
            edges.push({ a: i, b: j });
          }
        }
      }
    }

    function spawnPacket() {
      if (edges.length === 0 || reduceMotion) return;
      var e = edges[Math.floor(Math.random() * edges.length)];
      packets.push({
        a: e.a, b: e.b, t: 0,
        speed: 0.004 + Math.random() * 0.006,
        color: colors[nodes[e.a].group % 3]
      });
      if (packets.length > 18) packets.shift();
    }

    function showPopup(n, clientX, clientY) {
      if (!popup) return;
      var data = skillData[n.label] || { level: "Learning", desc: "Actively practiced in labs.", projects: "Home Lab" };
      popupTitle.textContent = n.label;
      popupLevel.textContent = data.level;
      popupDesc.textContent = data.desc;
      popupProjects.textContent = "Projects: " + data.projects;
      popup.hidden = false;
      var rect = container.getBoundingClientRect();
      var px = Math.min(Math.max(20, clientX - rect.left - 100), W - 220);
      var py = Math.min(Math.max(20, clientY - rect.top - 60), H - 140);
      popup.style.left = px + "px";
      popup.style.top = py + "px";
      popup.style.transform = "none";
    }

    function hidePopup() {
      if (popup) popup.hidden = true;
    }
    if (popupClose) popupClose.addEventListener("click", hidePopup);

    container.addEventListener("mousemove", function (e) {
      var r = container.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      if (dragging) {
        dragging.x = mouse.x; dragging.y = mouse.y;
        dragging.vx = 0; dragging.vy = 0;
      }
    });
    container.addEventListener("mouseleave", function () {
      mouse.x = -999; mouse.y = -999; dragging = null;
    });
    container.addEventListener("mousedown", function (e) {
      var r = container.getBoundingClientRect();
      var mx = e.clientX - r.left, my = e.clientY - r.top;
      for (var i = nodes.length - 1; i >= 0; i--) {
        var n = nodes[i];
        var dx = mx - n.x, dy = my - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < n.radius + 12) {
          dragging = n;
          showPopup(n, e.clientX, e.clientY);
          e.preventDefault();
          return;
        }
      }
      hidePopup();
    });
    window.addEventListener("mouseup", function () { dragging = null; });

    // Touch support
    container.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      var t = e.touches[0];
      var r = container.getBoundingClientRect();
      var mx = t.clientX - r.left, my = t.clientY - r.top;
      mouse.x = mx; mouse.y = my;
      for (var i = nodes.length - 1; i >= 0; i--) {
        var n = nodes[i];
        var dx = mx - n.x, dy = my - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < n.radius + 16) {
          dragging = n;
          showPopup(n, t.clientX, t.clientY);
          e.preventDefault();
          return;
        }
      }
    }, { passive: false });
    container.addEventListener("touchmove", function (e) {
      if (!dragging || e.touches.length !== 1) return;
      var t = e.touches[0];
      var r = container.getBoundingClientRect();
      mouse.x = t.clientX - r.left; mouse.y = t.clientY - r.top;
      dragging.x = mouse.x; dragging.y = mouse.y;
      e.preventDefault();
    }, { passive: false });
    container.addEventListener("touchend", function () { dragging = null; });

    function draw() {
      if (!W) return;
      ctx.clearRect(0, 0, W, H);

      // Build animation
      if (built) {
        nodes.forEach(function (n) {
          if (dragging === n) return;
          // gentle pull to target + repulsion
          n.vx += (n.tx - n.x) * 0.008;
          n.vy += (n.ty - n.y) * 0.008;
          // mouse attract
          var dx = mouse.x - n.x, dy = mouse.y - n.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            n.vx += (dx / dist) * 0.12;
            n.vy += (dy / dist) * 0.12;
          }
          // node repulsion
          nodes.forEach(function (o) {
            if (o === n) return;
            var ox = n.x - o.x, oy = n.y - o.y;
            var od = Math.sqrt(ox * ox + oy * oy) || 1;
            if (od < 70) {
              n.vx += (ox / od) * 0.4;
              n.vy += (oy / od) * 0.4;
            }
          });
          n.vx *= 0.88; n.vy *= 0.88;
          n.x += n.vx; n.y += n.vy;
          n.x = Math.max(36, Math.min(W - 36, n.x));
          n.y = Math.max(28, Math.min(H - 28, n.y));
        });
      } else {
        // animate into place
        var allArrived = true;
        nodes.forEach(function (n) {
          n.x += (n.tx - n.x) * 0.06;
          n.y += (n.ty - n.y) * 0.06;
          if (Math.abs(n.tx - n.x) > 2 || Math.abs(n.ty - n.y) > 2) allArrived = false;
        });
        if (allArrived) built = true;
      }

      // edges
      edges.forEach(function (e) {
        var a = nodes[e.a], b = nodes[e.b];
        var dx = a.x - b.x, dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 180) return;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(124, 111, 255, " + (0.14 * (1 - dist / 180)) + ")";
        ctx.lineWidth = 1;
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });

      // packets
      if (!reduceMotion) {
        packets.forEach(function (p) {
          p.t += p.speed;
          if (p.t > 1) p.t = 0;
          var a = nodes[p.a], b = nodes[p.b];
          var x = a.x + (b.x - a.x) * p.t;
          var y = a.y + (b.y - a.y) * p.t;
          ctx.beginPath();
          ctx.arc(x, y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.85;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
        if (Math.random() < 0.04) spawnPacket();
      }

      // nodes
      var hoverNode = null;
      nodes.forEach(function (n) {
        var dx = mouse.x - n.x, dy = mouse.y - n.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var col = colors[n.group % colors.length];
        if (dist < n.radius + 14) hoverNode = n;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + (dist < 80 ? 3 : 0), 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
        if (dist < 90) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.08)";
          ctx.fill();
        }
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(237, 239, 247, 0.8)";
        if (document.documentElement.getAttribute("data-theme") === "light") {
          ctx.fillStyle = "rgba(18, 20, 31, 0.85)";
        }
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x, n.y - n.radius - 6);
      });

      if (hoverNode && container.style.cursor !== "grabbing") container.style.cursor = "pointer";
      else if (!dragging) container.style.cursor = "default";

      requestAnimationFrame(draw);
    }

    // Start when in view
    function startNetwork() {
      resize();
      window.addEventListener("resize", function () {
        clearTimeout(startNetwork._t);
        startNetwork._t = setTimeout(resize, 120);
      });
      draw();
      if (!reduceMotion) {
        for (var i = 0; i < 6; i++) setTimeout(spawnPacket, i * 400);
      }
    }

    if (window.IntersectionObserver) {
      var obs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          startNetwork();
          obs.disconnect();
        }
      }, { threshold: 0.2 });
      obs.observe(container);
    } else {
      setTimeout(startNetwork, 400);
    }
  }
  setTimeout(initSkillNetwork, 200);

  /* ========== Ambient particles ========== */
/* ========== Ambient particles with Mouse Interaction ========== */
  function initAmbientParticles() {
    if (reduceMotion) return;
    var mesh = document.querySelector(".mesh-bg");
    if (!mesh) return;
    var canvas = document.createElement("canvas");
    canvas.id = "network-canvas";
    mesh.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var particles = [];
    var W, H;
    
    // Track mouse coordinates & hover state
    var mouse = { x: -9999, y: -9999, radius: 150 };

    window.addEventListener("mousemove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener("mouseleave", function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      particles = [];
      var count = Math.min(45, Math.floor((W * H) / 28000));
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          baseVx: (Math.random() - 0.5) * 0.4,
          baseVy: (Math.random() - 0.5) * 0.4,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 1.2 + Math.random() * 1.4
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // --- Mouse Interaction Logic (Repulsion & Connections) ---
        var dxMouse = mouse.x - p.x;
        var dyMouse = mouse.y - p.y;
        var distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          // Calculate force pushing particle away from cursor
          var force = (mouse.radius - distMouse) / mouse.radius;
          var angle = Math.atan2(dyMouse, dxMouse);
          
          p.x -= Math.cos(angle) * force * 3;
          p.y -= Math.sin(angle) * force * 3;

          // Draw active connection lines from mouse cursor to nearby particles
          ctx.beginPath();
          ctx.strokeStyle = "rgba(52, 228, 200, " + (0.25 * (1 - distMouse / mouse.radius)) + ")";
          ctx.lineWidth = 0.8;
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // Return velocity gradually back to original drift speed
        p.vx += (p.baseVx - p.vx) * 0.05;
        p.vy += (p.baseVy - p.vy) * 0.05;

        p.x += p.vx; 
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0) { p.x = 0; p.baseVx *= -1; p.vx *= -1; }
        if (p.x > W) { p.x = W; p.baseVx *= -1; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.baseVy *= -1; p.vx *= -1; }
        if (p.y > H) { p.y = H; p.baseVy *= -1; p.vx *= -1; }

        // Render particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = distMouse < mouse.radius ? "rgba(52, 228, 200, 0.8)" : "rgba(124, 111, 255, 0.4)";
        ctx.fill();

        // Connect nearby particles to each other
        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(52, 228, 200, " + (0.09 * (1 - dist / 130)) + ")";
            ctx.lineWidth = 0.7;
            ctx.moveTo(p.x, p.y); 
            ctx.lineTo(q.x, q.y); 
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resize(); 
    createParticles();
    
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { resize(); createParticles(); }, 150);
    });
    
    draw();
  }
  initAmbientParticles();

  /* ========== Scroll reveals + timeline ========== */
  if (window.gsap && window.ScrollTrigger) {
    ScrollTrigger.batch(".reveal", {
      start: "top 88%",
      onEnter: function (els) {
        gsap.to(els, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 });
      },
      once: true
    });
    var fg = document.getElementById("timelineFg");
    var track = document.querySelector(".timeline-track");
    if (fg && track) {
      ScrollTrigger.create({
        trigger: track, start: "top 70%", end: "bottom 70%", scrub: true,
        onUpdate: function (self) { fg.style.height = (self.progress * 100) + "%"; }
      });
    }
    document.querySelectorAll(".timeline-item").forEach(function (item) {
      ScrollTrigger.create({
        trigger: item, start: "top 75%", once: true,
        onEnter: function () { item.classList.add("in-view"); }
      });
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = 1; el.style.transform = "none";
    });
  }

  /* ========== Count-up ========== */
  var counted = false;
  function countUp() {
    if (counted) return;
    counted = true;
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseInt(el.dataset.count, 10);
      var obj = { val: 0 };
      if (window.gsap && !reduceMotion) {
        gsap.to(obj, {
          val: target, duration: 1.5, ease: "power2.out",
          onUpdate: function () { el.textContent = Math.round(obj.val); }
        });
      } else {
        el.textContent = target;
      }
    });
  }
  if (window.gsap && window.ScrollTrigger) {
    ScrollTrigger.create({ trigger: "#home", start: "top 60%", once: true, onEnter: countUp });
  } else {
    countUp();
  }


  /* ========== AVATAR LIGHTBOX MODAL ========== */
  var avatarTrigger = document.getElementById("avatarTrigger");
  var avatarModal = document.getElementById("avatarModal");
  var closeAvatarModal = document.getElementById("closeAvatarModal");

  function openAvatarModal() {
    // console.log("Avatar clicked!"); // <-- ADD THIS LINE FOR TESTING
    if (!avatarModal) return;
    avatarModal.classList.remove("hidden");
    // Trigger reflow for animation
    void avatarModal.offsetWidth;
    avatarModal.classList.remove("opacity-0");
    avatarModal.classList.add("flex", "opacity-100");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  function hideAvatarModal() {
    if (!avatarModal) return;
    avatarModal.classList.remove("opacity-100");
    avatarModal.classList.add("opacity-0");
    setTimeout(function () {
      avatarModal.classList.add("hidden");
      avatarModal.classList.remove("flex");
      document.body.style.overflow = ""; // Restore background scrolling
    }, 300);
  }

  if (avatarTrigger && avatarModal) {
    // Open on click
    avatarTrigger.addEventListener("click", openAvatarModal);

    // Open on Enter key when focused via keyboard
    avatarTrigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openAvatarModal();
      }
    });

    // Close on Close Button click
    if (closeAvatarModal) {
      closeAvatarModal.addEventListener("click", hideAvatarModal);
    }

    // Close when clicking outside the image container
    avatarModal.addEventListener("click", function (e) {
      if (e.target === avatarModal) {
        hideAvatarModal();
      }
    });

    // Close on ESC key press
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !avatarModal.classList.contains("hidden")) {
        hideAvatarModal();
      }
    });
  }

// ===================================================================
  // CONTACT FORM SUBMISSION & CURVED FLIGHT ANIMATION
  // ===================================================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('sendBtn');
  const sendIcon = document.getElementById('send-icon');
  const btnText = document.getElementById('btn-text');
  const formNote = document.getElementById('formNote');
  const flyingPlane = document.getElementById('flyingPlane');
  const emailTarget = document.getElementById('emailTarget');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // 1. Disable submit button & compress feedback
      if (submitBtn) submitBtn.style.pointerEvents = 'none';

      if (window.gsap && submitBtn) {
        gsap.to(submitBtn, { scale: 0.94, duration: 0.15, yoyo: true, repeat: 1 });
      }

      if (btnText) btnText.textContent = "Sending...";
      if (formNote) formNote.textContent = "";

      // 2. Hide static icon on button
      if (sendIcon) gsap.set(sendIcon, { opacity: 0 });

      // 3. Trigger Curved Flight Animation FIRST
      if (flyingPlane && emailTarget && submitBtn) {
        const startRect = submitBtn.getBoundingClientRect();
        const endRect = emailTarget.getBoundingClientRect();

        const startX = startRect.left + startRect.width / 2;
        const startY = startRect.top + startRect.height / 2;

        const endX = endRect.left + endRect.width / 2;
        const endY = endRect.top + endRect.height / 2;

        const controlX = (startX + endX) / 2;
        const controlY = Math.min(startY, endY) - 160;

        gsap.set(flyingPlane, {
          x: startX,
          y: startY,
          scale: 0.5,
          opacity: 0,
          rotation: -20
        });

        const flightProgress = { t: 0 };
        let lastX = startX;
        let lastY = startY;

        const flightTl = gsap.timeline();

        // Lift upward and fade in
        flightTl.to(flyingPlane, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "power2.out"
        });

        // Arc Flight across Bezier Curve
        flightTl.to(flightProgress, {
          t: 1,
          duration: 1.8,
          ease: "power1.inOut",
          onUpdate: function () {
            const t = flightProgress.t;

            const currentX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
            const currentY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;

            const deltaX = currentX - lastX;
            const deltaY = currentY - lastY;
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            gsap.set(flyingPlane, {
              x: currentX,
              y: currentY,
              rotation: angle
            });

            if (Math.random() < 0.6) {
              createTrailDot(currentX, currentY);
            }

            lastX = currentX;
            lastY = currentY;
          }
        });

        // Disappear into target and trigger pulse
        flightTl.to(flyingPlane, {
          scale: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: function () {
            emailTarget.classList.add("email-arrived");
            setTimeout(() => {
              emailTarget.classList.remove("email-arrived");
            }, 900);
          }
        });
      }

      // 4. Send Form Data Asynchronously
      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          if (btnText) btnText.textContent = "✓ Message Sent";
          if (formNote) {
            formNote.style.color = "var(--aqua)";
            formNote.textContent = "Message sent successfully! I'll reply soon.";
          }
          contactForm.reset();
        } else {
          if (btnText) btnText.textContent = "Error! Check Action ID";
          if (formNote) {
            formNote.style.color = "var(--coral)";
            formNote.textContent = "Submission failed (404 Formspree endpoint error).";
          }
        }
      } catch (error) {
        if (btnText) btnText.textContent = "Error! Try Again";
        if (formNote) {
          formNote.style.color = "var(--coral)";
          formNote.textContent = "Network error. Please try again later.";
        }
      } finally {
        setTimeout(() => {
          if (btnText) btnText.textContent = "Send Message";
          if (submitBtn) submitBtn.style.pointerEvents = 'auto';
          if (sendIcon) gsap.set(sendIcon, { opacity: 1 });
        }, 4000);
      }
    });
  }

  // Helper function to spawn fading trail dots
  function createTrailDot(x, y) {
    const dot = document.createElement("div");
    dot.className = "plane-trail-dot";
    document.body.appendChild(dot);

    gsap.set(dot, { x: x, y: y, scale: 1, opacity: 0.8 });

    gsap.to(dot, {
      scale: 0.2,
      opacity: 0,
      duration: 0.6,
      ease: "power1.out",
      onComplete: function () {
        if (dot.parentNode) dot.parentNode.removeChild(dot);
      }
    });
  }

})();