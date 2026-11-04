// Menu mobile com controle de acessibilidade (ARIA e foco)
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  });

  // Fechar menu ao clicar em qualquer link da navegação
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu de navegação');
    });
  });

  // Fechar ao pressionar a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu de navegação');
      toggle.focus();
    }
  });
}

// Manipulação e validação dos formulários para abertura segura do WhatsApp
document.querySelectorAll('[data-whatsapp-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();

    // Verificação de honeypot antispam
    const honeypot = form.querySelector('input[name="website_hp"]');
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Submissão bloqueada: spam detectado.');
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

// Atualização automática do ano no rodapé
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});
