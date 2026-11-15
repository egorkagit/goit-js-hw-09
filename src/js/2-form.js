const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
let formData = { email: '', message: '' };

try {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData && typeof savedData === 'object') {
    formData.email = typeof savedData.email === 'string' ? savedData.email : '';
    formData.message =
      typeof savedData.message === 'string' ? savedData.message : '';
  }
} catch {
  localStorage.removeItem(STORAGE_KEY);
}

form.elements.email.value = formData.email;
form.elements.message.value = formData.message;

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name !== 'email' && name !== 'message') return;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: '', message: '' };
});
