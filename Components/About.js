  // Typing animation for the about.json editor card
  const codeLines = [
    { html: '<span class="p">{</span>' },
    { html: '&nbsp;&nbsp;<span class="property">"name"</span><span class="p">:</span> <span class="s">"Abhijit"</span><span class="p">,</span>' },
    { html: '&nbsp;&nbsp;<span class="property">"role"</span><span class="p">:</span> <span class="s">"Frontend Developer"</span><span class="p">,</span>' },
    { html: '&nbsp;&nbsp;<span class="property">"stack"</span><span class="p">:</span> <span class="p">[</span><span class="s">"React"</span><span class="p">,</span> <span class="s">"Next.js"</span><span class="p">,</span> <span class="s">"TypeScript"</span><span class="p">],</span>' },
    { html: '&nbsp;&nbsp;<span class="property">"focus"</span><span class="p">:</span> <span class="p">[</span><span class="s">"dashboards"</span><span class="p">,</span> <span class="s">"portfolios"</span><span class="p">,</span> <span class="s">"web apps"</span><span class="p">],</span>' },
    { html: '&nbsp;&nbsp;<span class="property">"values"</span><span class="p">:</span> <span class="p">[</span><span class="s">"accessible"</span><span class="p">,</span> <span class="s">"performant"</span><span class="p">,</span> <span class="s">"responsive"</span><span class="p">],</span>' },
    { html: '&nbsp;&nbsp;<span class="property">"availableForWork"</span><span class="p">:</span> <span class="k">true</span>' },
    { html: '<span class="p">}</span>' }
  ];

  const target = document.getElementById('typedCode');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderStatic(){
    target.innerHTML = codeLines.map((l,i) =>
      `<span class="ln">${i+1}</span>${l.html}<br>`
    ).join('');
  }

  function typeLines(){
    let lineIndex = 0;
    target.innerHTML = '';

    function typeNextLine(){
      if(lineIndex >= codeLines.length){
        target.innerHTML += '<span class="cursor"></span>';
        return;
      }
      const lineNum = `<span class="ln">${lineIndex+1}</span>`;
      const temp = document.createElement('div');
      temp.innerHTML = codeLines[lineIndex].html;
      const fullText = temp.textContent;
      let charIndex = 0;
      const lineWrapper = document.createElement('span');
      target.appendChild(document.createElement('br')).remove(); // no-op guard
      const lineSpan = document.createElement('span');
      target.insertAdjacentHTML('beforeend', lineNum);
      target.appendChild(lineSpan);

      function typeChar(){
        if(charIndex <= fullText.length){
          // reveal by re-rendering the substring through the real markup for correct coloring
          renderPartial();
          charIndex++;
          setTimeout(typeChar, 12 + Math.random()*18);
        } else {
          target.appendChild(document.createElement('br'));
          lineIndex++;
          setTimeout(typeNextLine, 90);
        }
      }

      function renderPartial(){
        // approximate typing effect by revealing full html once text length matches, else plain substring
        if(charIndex >= fullText.length){
          lineSpan.innerHTML = codeLines[lineIndex].html;
        } else {
          lineSpan.textContent = fullText.slice(0, charIndex);
        }
      }

      typeChar();
    }
    typeNextLine();
  }

  if(reduceMotion){
    renderStatic();
  } else {
    typeLines();
  }

  // Menu overlay open/close
  const menuTrigger = document.getElementById('menuTrigger');
  const menuClose = document.getElementById('menuClose');
  const siteMenu = document.getElementById('siteMenu');

  function openMenu(){
    siteMenu.classList.add('active');
    document.body.classList.add('menu-open');
    menuTrigger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu(){
    siteMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuTrigger.setAttribute('aria-expanded', 'false');
  }

  menuTrigger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); });

  // Close on Escape, and when a menu link is clicked
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && siteMenu.classList.contains('active')) closeMenu();
  });
  siteMenu.querySelectorAll('.msection a, .mfooter .links a').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  // Reveal on scroll — git-log commits (staggered) + generic .reveal elements
  const commits = document.querySelectorAll('.commit');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if(entry.isIntersecting){
        setTimeout(() => entry.target.classList.add('in-view'), i * 80);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  commits.forEach(c => io.observe(c));

  const revealEls = document.querySelectorAll('.reveal');
  const revealIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealIo.observe(el));