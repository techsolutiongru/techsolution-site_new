// ==========================================================================
// TECHSOLUTION — Interações Cinéticas, Animações e Comportamento (V2)
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
    '.audience-card, .service-card, .service-card-visual, .process-node, .about-grid > div, .contact-panel, .contact-form, .split-band .container, .trust-item'
  );

  revealElements.forEach((el) => {
    el.classList.add('reveal-on-scroll');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
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

  // 3. Efeito Tilt 3D Holográfico em Cards Interativos
  const interactiveCards = document.querySelectorAll('.audience-card, .service-card-visual, .hero-chip');
  
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // 4. Efeito de Scroll na Barra de Navegação (Blur & Shrink suave)
  const navWrap = document.querySelector('.nav-wrap');
  if (navWrap) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navWrap.classList.add('scrolled');
      } else {
        navWrap.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 5. Formulários: Validação em Tempo Real e Barra de Progresso
  document.querySelectorAll('[data-whatsapp-form]').forEach(form => {
    const inputs = form.querySelectorAll('input[required], select[required]');
    const progressFill = form.querySelector('#form-progress-fill');
    const progressText = form.querySelector('#form-progress-text');
    const totalRequired = inputs.length;

    function updateProgress() {
      let filledCount = 0;
      inputs.forEach(input => {
        if (input.value.trim() !== '') {
          filledCount++;
          input.classList.add('valid');
        } else {
          input.classList.remove('valid');
        }
      });

      if (progressFill && progressText) {
        const percent = Math.round((filledCount / totalRequired) * 100);
        progressFill.style.width = `${percent}%`;
        progressText.textContent = `${filledCount} de ${totalRequired} campos obrigatórios`;
      }
    }

    inputs.forEach(input => {
      input.addEventListener('input', updateProgress);
      input.addEventListener('change', updateProgress);
    });

    // Submissão do formulário
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
        'Olá! Gostaria de falar com a equipe TECHSOLUTION.',
        '',
        `*Nome:* ${nome}`,
        empresa ? `*Empresa:* ${empresa}` : null,
        `*Telefone:* ${telefone}`,
        `*Assunto:* ${assunto}`,
        mensagem ? `*Mensagem:* ${mensagem}` : null
      ].filter(Boolean);

      const messageText = linhas.join('\n');
      const whatsappUrl = `https://wa.me/5511971946176?text=${encodeURIComponent(messageText)}`;

      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Fallback caso pop-up seja bloqueado
        window.location.href = whatsappUrl;
      }
    });
  });

  // 6. Atualização Automática do Ano no Rodapé
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

});
