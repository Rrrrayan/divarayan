/* ============================================================
   RAYAN HUSSEIN PORTFOLIO -- main.js  (error-free build)
   ============================================================ */

/* eslint-disable */

// ---- LOADER -------------------------------------------------
window.addEventListener('load', function() {
    var pct = document.getElementById('loaderPct');
    var fill = document.querySelector('.loader-bar-fill');
    var val = 0;
    var iv = setInterval(function() {
        val = Math.min(val + Math.random() * 11 + 2, 100);
        var v = Math.floor(val);
        if (pct) pct.textContent = v + '%';
        if (fill) fill.style.width = v + '%';
        if (val >= 100) {
            clearInterval(iv);
            setTimeout(function() {
                var loader = document.getElementById('loader');
                if (loader) loader.classList.add('hidden');
                initReveal();
                startTyping();
            }, 350);
        }
    }, 55);
});

// ---- CURSOR -------------------------------------------------
var cursor = document.querySelector('.cursor');
var follower = document.querySelector('.cursor-follower');
var mx = 0,
    my = 0,
    fx = 0,
    fy = 0;

document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    if (cursor) { cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px'; }
});

(function tick() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    if (follower) { follower.style.left = fx + 'px';
        follower.style.top = fy + 'px'; }
    requestAnimationFrame(tick);
}());

document.querySelectorAll('a, button, .skill-card, .social-link, .orbit-dot, .float-badge, .bash-replay-btn').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
        if (cursor) cursor.classList.add('hov');
        if (follower) follower.classList.add('hov');
    });
    el.addEventListener('mouseleave', function() {
        if (cursor) cursor.classList.remove('hov');
        if (follower) follower.classList.remove('hov');
    });
});

// ---- THEME --------------------------------------------------
var html = document.documentElement;
html.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');

var themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
    themeBtn.addEventListener('click', function() {
        var n = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', n);
        localStorage.setItem('theme', n);
    });
}

// ---- HAMBURGER ----------------------------------------------
var ham = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');

if (ham && navLinks) {
    ham.addEventListener('click', function() {
        navLinks.classList.toggle('open');
        var sp = ham.querySelectorAll('span');
        if (navLinks.classList.contains('open')) {
            sp[0].style.transform = 'rotate(45deg) translate(5px,5px)';
            sp[1].style.opacity = '0';
            sp[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
        } else {
            sp.forEach(function(s) { s.style.transform = '';
                s.style.opacity = ''; });
        }
    });
    navLinks.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
            navLinks.classList.remove('open');
            ham.querySelectorAll('span').forEach(function(s) { s.style.transform = '';
                s.style.opacity = ''; });
        });
    });
}

// ---- FLOATING SYMBOLS ---------------------------------------
var symsCont = document.querySelector('.symbols-bg');
var SYMS = ['</>', '{}', '=>', '()', '[]', '&&', '!==', 'bash', 'npm', 'git',
    '#!/', 'def', 'async', 'await', 'echo', 'cat', 'ls', 'chmod', 'curl', 'sudo'
];
if (symsCont) {
    for (var si = 0; si < 22; si++) {
        var sym = document.createElement('div');
        sym.className = 'symbol';
        sym.textContent = SYMS[si % SYMS.length];
        sym.style.left = (Math.random() * 100) + 'vw';
        sym.style.fontSize = (0.65 + Math.random() * 0.9) + 'rem';
        sym.style.setProperty('--dur', (12 + Math.random() * 18) + 's');
        sym.style.setProperty('--delay', (Math.random() * 18) + 's');
        symsCont.appendChild(sym);
    }
}

// ---- CANVAS PARTICLE NETWORK --------------------------------
var canvas = document.getElementById('bg-canvas');
if (canvas) {
    var ctx = canvas.getContext('2d');

    function resizeCanvas() { canvas.width = innerWidth;
        canvas.height = innerHeight; }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    var pts = [];
    for (var pi = 0; pi < 90; pi++) {
        pts.push({
            x: Math.random() * innerWidth,
            y: Math.random() * innerHeight,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.4 + 0.3,
            op: Math.random() * 0.32 + 0.08
        });
    }

    (function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pts.forEach(function(p) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(159,69,176,' + p.op + ')';
            ctx.fill();
        });
        for (var i = 0; i < pts.length; i++) {
            for (var j = i + 1; j < pts.length; j++) {
                var dx = pts[i].x - pts[j].x;
                var dy = pts[i].y - pts[j].y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < 110) {
                    ctx.beginPath();
                    ctx.moveTo(pts[i].x, pts[i].y);
                    ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = 'rgba(159,69,176,' + ((1 - d / 110) * 0.12) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(drawCanvas);
    }());
}

// ---- SCROLL REVEAL ------------------------------------------
function initReveal() {
    var revEls = document.querySelectorAll('.reveal');
    var tlEls = document.querySelectorAll('.timeline-item');
    var bars = document.querySelectorAll('.skill-bar-fill');

    var revObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e, i) {
            if (e.isIntersecting) {
                setTimeout(function() { e.target.classList.add('visible'); }, i * 65);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revEls.forEach(function(el) { revObs.observe(el); });

    var tlObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.2 });
    tlEls.forEach(function(el) { tlObs.observe(el); });

    var barObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) e.target.style.width = e.target.dataset.width + '%';
        });
    }, { threshold: 0.3 });
    bars.forEach(function(b) { barObs.observe(b); });

    // trigger bash terminal when about section enters view
    var aboutEl = document.getElementById('about');
    if (aboutEl) {
        var aboutObs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) { startBashTerminal();
                    aboutObs.disconnect(); }
            });
        }, { threshold: 0.25 });
        aboutObs.observe(aboutEl);
    }
}

// ---- TYPING (hero title) ------------------------------------
var TITLES = ['Web Developer', 'Flutter Developer', 'IT Consultant', 'Full-Stack Engineer', 'UI/UX Designer'];
var tIdx = 0,
    cIdx = 0,
    del = false;
var typEl = document.getElementById('typing-text');

function startTyping() {
    if (!typEl) return;
    (function loop() {
        var cur = TITLES[tIdx];
        if (del) {
            cIdx--;
            typEl.textContent = cur.slice(0, cIdx);
            if (cIdx < 0) { del = false;
                tIdx = (tIdx + 1) % TITLES.length; }
            setTimeout(loop, 52);
        } else {
            cIdx++;
            typEl.textContent = cur.slice(0, cIdx);
            if (cIdx === cur.length) { del = true;
                setTimeout(loop, 1900); } else { setTimeout(loop, 82); }
        }
    }());
}


// ---- BASH TERMINAL (about section) -------------------------
// Line data -- all special chars inside HTML strings (safe inside innerHTML)
var BASH_SCRIPT = [
    { type: 'prompt', cmd: 'bash about_me.sh', delay: 0 },
    { type: 'empty', delay: 60 },

    { type: 'output', html: '<span class="bt-comment">#!/usr/bin/env bash</span>', delay: 40 },
    { type: 'output', html: '<span class="bt-comment"># =========================================</span>', delay: 40 },
    { type: 'output', html: '<span class="bt-comment">#  RAYAN HUSSEIN -- Developer Profile</span>', delay: 40 },
    { type: 'output', html: '<span class="bt-comment"># =========================================</span>', delay: 40 },
    { type: 'empty', delay: 40 },

    { type: 'output', html: '<span class="bt-key">NAME</span><span class="bt-eq">=</span><span class="bt-str">"Rayan Hussein"</span>', delay: 55 },
    { type: 'output', html: '<span class="bt-key">LOCATION</span><span class="bt-eq">=</span><span class="bt-str">"Iraq"</span>', delay: 55 },
    { type: 'output', html: '<span class="bt-key">ROLE</span><span class="bt-eq">=</span><span class="bt-str">"Web &amp; Flutter Developer, IT Consultant"</span>', delay: 55 },
    { type: 'output', html: '<span class="bt-key">DEGREE</span><span class="bt-eq">=</span><span class="bt-str">"B.Sc. Computer Science / IT"</span>', delay: 55 },
    { type: 'output', html: '<span class="bt-key">EXP</span><span class="bt-eq">=</span><span class="bt-val-green">"3+ years"</span>', delay: 55 },
    { type: 'output', html: '<span class="bt-key">PROJECTS</span><span class="bt-eq">=</span><span class="bt-val-green">"20+"</span>', delay: 55 },
    { type: 'output', html: '<span class="bt-key">STATUS</span><span class="bt-eq">=</span><span class="bt-ok">&#10003; Available for hire</span>', delay: 55 },
    { type: 'empty', delay: 40 },

    { type: 'prompt', cmd: 'cat skills.conf', delay: 80 },
    { type: 'empty', delay: 40 },
    { type: 'output', html: '<span class="bt-comment"># SKILL LEVELS</span>', delay: 40 },
    { type: 'skillbar', label: 'Web Development  ', pct: 90, delay: 55 },
    { type: 'skillbar', label: 'Flutter / Dart   ', pct: 85, delay: 55 },
    { type: 'skillbar', label: 'JavaScript/React ', pct: 87, delay: 55 },
    { type: 'skillbar', label: 'IT Consulting    ', pct: 88, delay: 55 },
    { type: 'skillbar', label: 'CSS / Animations ', pct: 91, delay: 55 },
    { type: 'skillbar', label: 'Git and DevOps   ', pct: 82, delay: 55 },
    { type: 'skillbar', label: 'Databases        ', pct: 78, delay: 55 },
    { type: 'skillbar', label: 'UI / UX Design   ', pct: 80, delay: 55 },
    { type: 'empty', delay: 40 },

    { type: 'prompt', cmd: 'echo "Ready to build something great!"', delay: 80 },
    { type: 'output', html: '<span class="bt-ok">&#10003;  Ready to build something great!</span>', delay: 60 },
    { type: 'empty', delay: 40 },
    { type: 'prompt', cmd: '', delay: 120 }
];

var bashRunning = false;
var bashTimeouts = [];

function clearBashTimeouts() {
    bashTimeouts.forEach(function(t) { clearTimeout(t); });
    bashTimeouts = [];
}

function startBashTerminal() {
    if (bashRunning) return;
    bashRunning = true;
    runBash();
}

function runBash() {
    var body = document.getElementById('bashBody');
    if (!body) return;
    body.innerHTML = '';
    bashRunning = true;

    /* show a fresh "waiting" prompt while first command types */
    var initLine = document.createElement('div');
    initLine.className = 'bash-init-line';
    var initCursor = document.createElement('span');
    initCursor.className = 'bt-cursor';
    initLine.innerHTML =
        '<span class="bt-prompt">rayan@portfolio</span>' +
        '<span class="bt-colon">:</span>' +
        '<span class="bt-path">~/about</span>' +
        '<span class="bt-dollar">$</span> ';
    initLine.appendChild(initCursor);
    body.appendChild(initLine);

    /* small pause then remove init line and start the script */
    setTimeout(function() {
        body.removeChild(initLine);
        runScript(body);
    }, 500);
}

function runScript(body) {
    var cursor_t = 0;

    BASH_SCRIPT.forEach(function(line, idx) {
        cursor_t += (line.delay || 80);
        (function(lt, ln, ix) {
            if (ln.type === 'prompt') {
                var t = setTimeout(function() {
                    var row = makePromptRow();
                    body.appendChild(row.wrap);
                    scrollBody(body);
                    if (ln.cmd) {
                        typeInto(row.cmdSpan, ln.cmd, 55, function() {
                            if (ix === BASH_SCRIPT.length - 1) {
                                var bl = document.createElement('span');
                                bl.className = 'bt-cursor';
                                row.wrap.appendChild(bl);
                            }
                        });
                    } else {
                        var bl = document.createElement('span');
                        bl.className = 'bt-cursor';
                        row.wrap.appendChild(bl);
                    }
                }, lt);
                bashTimeouts.push(t);
                cursor_t += (ln.cmd ? ln.cmd.length : 0) * 58;

            } else if (ln.type === 'output') {
                var t = setTimeout(function() {
                    var div = document.createElement('div');
                    div.className = 'bt-line';
                    var inner = document.createElement('span');
                    inner.className = 'bt-indent';
                    inner.innerHTML = ln.html;
                    div.appendChild(inner);
                    body.appendChild(div);
                    requestAnimationFrame(function() { div.classList.add('show'); });
                    scrollBody(body);
                }, lt);
                bashTimeouts.push(t);

            } else if (ln.type === 'skillbar') {
                var t = setTimeout(function() {
                    var div = document.createElement('div');
                    div.className = 'bt-line';
                    var inner = document.createElement('span');
                    inner.className = 'bt-indent';

                    var labelEl = document.createElement('span');
                    labelEl.className = 'bt-label';
                    labelEl.textContent = ln.label;

                    var barWrap = document.createElement('span');
                    barWrap.className = 'bt-skill-bar';

                    var track = document.createElement('span');
                    track.className = 'bt-bar-track';

                    var fill = document.createElement('span');
                    fill.className = 'bt-bar-fill';
                    fill.style.width = '0';

                    var pctEl = document.createElement('span');
                    pctEl.className = 'bt-pct';
                    pctEl.textContent = ln.pct + '%';

                    track.appendChild(fill);
                    barWrap.appendChild(track);
                    barWrap.appendChild(pctEl);
                    inner.appendChild(labelEl);
                    inner.appendChild(barWrap);
                    div.appendChild(inner);
                    body.appendChild(div);

                    requestAnimationFrame(function() {
                        div.classList.add('show');
                        setTimeout(function() { fill.style.width = ln.pct + '%'; }, 80);
                    });
                    scrollBody(body);
                }, lt);
                bashTimeouts.push(t);

            } else if (ln.type === 'banner') {
                var t = setTimeout(function() {
                    var div = document.createElement('div');
                    div.className = 'bt-line';
                    var s = document.createElement('span');
                    s.className = 'bt-banner-line';
                    s.textContent = ln.text;
                    div.appendChild(s);
                    body.appendChild(div);
                    requestAnimationFrame(function() { div.classList.add('show'); });
                    scrollBody(body);
                }, lt);
                bashTimeouts.push(t);

            } else if (ln.type === 'divider') {
                var t = setTimeout(function() {
                    var div = document.createElement('div');
                    div.className = 'bt-line';
                    var s = document.createElement('span');
                    s.className = 'bt-div';
                    s.textContent = ln.text;
                    div.appendChild(s);
                    body.appendChild(div);
                    requestAnimationFrame(function() { div.classList.add('show'); });
                    scrollBody(body);
                }, lt);
                bashTimeouts.push(t);

            } else if (ln.type === 'empty') {
                var t = setTimeout(function() {
                    var div = document.createElement('div');
                    div.className = 'bt-line bt-empty show';
                    body.appendChild(div);
                    scrollBody(body);
                }, lt);
                bashTimeouts.push(t);
            }
        }(cursor_t, line, idx));
    });

    var endT = setTimeout(function() { bashRunning = false; }, cursor_t + 500);
    bashTimeouts.push(endT);
}

function makePromptRow() {
    var wrap = document.createElement('div');
    wrap.className = 'bt-line show';
    wrap.style.display = 'flex';
    wrap.style.alignItems = 'baseline';
    wrap.style.gap = '.3em';
    wrap.style.flexWrap = 'wrap';

    function mkSpan(cls, txt) {
        var s = document.createElement('span');
        s.className = cls;
        if (txt !== undefined) s.textContent = txt;
        return s;
    }

    wrap.appendChild(mkSpan('bt-prompt', 'rayan@portfolio'));
    wrap.appendChild(mkSpan('bt-colon', ':'));
    wrap.appendChild(mkSpan('bt-path', '~/about'));
    wrap.appendChild(mkSpan('bt-dollar', '$'));

    var cmdSpan = mkSpan('bt-cmd');
    wrap.appendChild(cmdSpan);
    return { wrap: wrap, cmdSpan: cmdSpan };
}

function typeInto(el, text, spd, done) {
    var i = 0;
    (function t() {
        if (i <= text.length) {
            el.textContent = text.slice(0, i);
            i++;
            setTimeout(t, spd);
        } else if (done) {
            done();
        }
    }());
}

function scrollBody(el) {
    el.scrollTop = el.scrollHeight;
}

// Replay button
var replayBtn = document.getElementById('bashReplay');
if (replayBtn) {
    replayBtn.addEventListener('click', function() {
        clearBashTimeouts();
        bashRunning = false;
        runBash();
    });
}

// ---- SMOOTH SCROLL ------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ---- NAV SHRINK ON SCROLL -----------------------------------
var mainNav = document.getElementById('mainNav');
if (mainNav) {
    window.addEventListener('scroll', function() {
        mainNav.style.padding = window.scrollY > 60 ? '.5rem 3rem' : '1rem 3rem';
    });
}

// ---- CARD 3D TILT -------------------------------------------
document.querySelectorAll('.skill-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(700px) rotateY(' + (x * 12) + 'deg) rotateX(' + (-y * 12) + 'deg) translateY(-6px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        card.style.transform = '';
    });
});

// ---- DOWNLOAD CV --------------------------------------------
var cvBtn = document.getElementById('downloadCvBtn');
if (cvBtn) {
    cvBtn.addEventListener('click', function() {
        var icon = cvBtn.querySelector('.cv-dl-icon');
        var label = cvBtn.querySelector('.cv-btn-label');
        if (icon) icon.style.transform = 'translateY(4px)';
        if (label) label.textContent = 'Downloading...';
        cvBtn.style.background = 'linear-gradient(135deg,rgba(159,69,176,.3),rgba(159,69,176,.15))';
        setTimeout(function() {
            if (icon) icon.style.transform = '';
            if (label) label.textContent = 'Download CV';
            cvBtn.style.background = '';
        }, 2200);
    });
}

// ---- CONTACT FORM -------------------------------------------
var contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn = contactForm.querySelector('.btn-submit');
        var orig = btn.innerHTML;
        btn.innerHTML = '&#10003; SENT!';
        btn.style.background = '#128c7e';
        btn.style.boxShadow = '0 0 20px rgba(18,140,126,.5)';
        setTimeout(function() {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.style.boxShadow = '';
            contactForm.reset();
        }, 3000);
    });
}