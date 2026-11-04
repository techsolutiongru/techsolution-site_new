// ==========================================================================
// TECHSOLUTION — Interações Cinéticas, Animações e Comportamento
// Inspirado nas animações modernas do Twistboxes com identidade TECHSOLUTION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Menu Mobile com Acessibilidade ARIA
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu de navegação');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu de navegação');
        toggle.focus();
      }
    });
  }

  // 2. Animações de Entrada ao Rolar (Scroll Reveal com IntersectionObserver)
  const revealElements = document.querySelectorAll(
    '.audience-card, .service-card, .process-step, .about-grid > div, .contact-panel, .contact-form, .split-band .container, .trust-item'
  );

  revealElements.forEach((el, index) => {
    el.classList.add('reveal-on-scroll');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Efeito Tilt 3D Holográfico em Cards (Estilo Twistboxes interativo)
  const interactiveCards = document.querySelectorAll('.audience-card, .service-card, .hero-chip');
  
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      
      // Reflexo de luz dinâmico na borda
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // 4. Efeito de Scroll na Barra de Navegação (Blur & Shrink suave)
  const header = document.querySelector('.site-header');
  const navWrap = document.querySelector('.nav-wrap');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navWrap.classList.add('scrolled');
    } else {
      navWrap.classList.remove('scrolled');
    }
  }, { passive: true });

  // 5. Tratamento de Formulário Seguro & Redirecionamento WhatsApp
  document.querySelectorAll('[data-whatsapp-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();

      // Verificação de honeypot antispam
      const honeypot = form.querySelector('input[name="website_hp"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Spam detectado.');
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = new FormData(form);
      const nome = (data.get('nome') || '').toString().trim();
      const empresa = (data.get('empresa') || '').toString().trim();
      const telefone = (data.get('telefone') || '').toString().trim();
      const assunto = (data.get('assunto') || '').toString().trim();
      const mensagem = (data.get('mensagem') || '').toString().trim();

      const linhas = [
        'Olá! Gostaria de falar com a TECHSOLUTION.',
        '',
        `*Nome:* ${nome}`,
        empresa ? `*Empresa:* ${empresa}` : null,
        `*Telefone:* ${telefone}`,
        `*Assunto:* ${assunto}`,
        mensagem ? `*Mensagem:* ${mensagem}` : null
      ].filter(Boolean);

      const messageText = linhas.join('\n');
      const whatsappUrl = `https://wa.me/5511971946176?text=${encodeURIComponent(messageText)}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  });

  // 6. Atualização Automática do Ano no Rodapé
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

});
