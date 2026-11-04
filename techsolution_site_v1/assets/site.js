const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
}
document.querySelectorAll('[data-whatsapp-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const message = [
      'Olá! Gostaria de falar com a TECHSOLUTION.',
      `Nome: ${data.get('nome') || ''}`,
      `Empresa: ${data.get('empresa') || 'Não informado'}`,
      `Telefone: ${data.get('telefone') || ''}`,
      `Assunto: ${data.get('assunto') || ''}`,
      `Mensagem: ${data.get('mensagem') || ''}`
    ].join('\n');
    window.open(`https://wa.me/5511971946176?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
});
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
