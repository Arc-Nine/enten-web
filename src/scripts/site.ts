import './hero-scroll';
import { createOrderMessage, createWhatsAppUrl } from '../data/content';

const toggles = [...document.querySelectorAll<HTMLButtonElement>('.product-toggle')];
toggles.forEach(toggle => toggle.addEventListener('click', () => {
  const shouldOpen = toggle.getAttribute('aria-expanded') !== 'true';
  toggles.forEach(button => {
    const open = button === toggle && shouldOpen;
    button.setAttribute('aria-expanded', String(open));
    button.closest('.product-card')?.classList.toggle('is-open', open);
    const panel = document.getElementById(button.getAttribute('aria-controls') ?? '');
    if (panel) panel.hidden = !open;
  });
}));

const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#navigation');
const closeMenu = () => { menu?.setAttribute('aria-expanded', 'false'); navigation?.classList.remove('is-open'); };
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); navigation?.classList.toggle('is-open', open);
});
navigation?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const productSelect = document.querySelector<HTMLSelectElement>('#order-product');
const result = document.querySelector<HTMLElement>('#order-result');
const status = document.querySelector<HTMLElement>('#order-status');
const resetMessage = () => { if (result) result.hidden = true; if (status) status.textContent = ''; };
document.querySelectorAll<HTMLAnchorElement>('.order-variant').forEach(link => link.addEventListener('click', () => {
  if (productSelect) productSelect.value = link.dataset.product ?? ''; resetMessage();
}));
const form = document.querySelector<HTMLFormElement>('#order-form');
form?.addEventListener('input', resetMessage);
form?.addEventListener('submit', event => {
  event.preventDefault(); if (!form.reportValidity()) return;
  const data = new FormData(form);
  try {
    const message = createOrderMessage(String(data.get('product')), Number(data.get('quantity')), String(data.get('city') ?? ''));
    const area = document.querySelector<HTMLTextAreaElement>('#order-message');
    const whatsappLink = document.querySelector<HTMLAnchorElement>('#whatsapp-order');
    if (whatsappLink) whatsappLink.href = createWhatsAppUrl(message);
    if (area) area.value = message; if (result) result.hidden = false;
    if (status) status.textContent = 'Pesan siap. Lanjut ke WhatsApp, lalu periksa dan kirim pesanmu.';
  } catch (error) { if (status) status.textContent = error instanceof Error ? error.message : 'Periksa pilihanmu.'; }
});
document.querySelector('#copy-message')?.addEventListener('click', async () => {
  const area = document.querySelector<HTMLTextAreaElement>('#order-message'); if (!area) return;
  try { await navigator.clipboard.writeText(area.value); if (status) status.textContent = 'Pesan disalin. Lanjut ke WhatsApp untuk menghubungi tim.'; }
  catch { area.focus(); area.select(); if (status) status.textContent = 'Salin otomatis tidak tersedia. Teks sudah dipilih; salin secara manual.'; }
});


