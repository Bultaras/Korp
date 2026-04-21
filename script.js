const loginScreen = document.getElementById('login-screen');
const portal = document.getElementById('portal');
const authForm = document.querySelector('.auth-form');

authForm.addEventListener('submit', function(e) {
  e.preventDefault();
  loginScreen.classList.add('hidden');
  portal.classList.remove('hidden');
  setTimeout(() => portal.classList.add('visible'), 10);
});

const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

const requestForm = document.getElementById('requestForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

requestForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправка...';
  const formData = new FormData(this);
  try {
    const response = await fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();
    if (data.success || response.ok) {
      formStatus.textContent = '✅ Обращение успешно зарегистрировано. Номер заявки #' + Math.floor(Math.random() * 9000 + 1000);
      formStatus.className = 'status success';
      this.reset();
    } else {
      throw new Error();
    }
  } catch {
    formStatus.textContent = '❌ Ошибка сети. Проверьте подключение к интернету.';
    formStatus.className = 'status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Отправить обращение';
  }
});