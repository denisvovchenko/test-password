var btn = document.querySelector('.js-password__visibility-btn');
var input = document.querySelector('.js-password__input');

btn.addEventListener('click', function(evt) {
  evt.preventDefault();

  btn.classList.toggle('password__visibility-btn--active');

  var currentType = input.getAttribute('type');
  var newType = (currentType == 'password') ? 'text' : 'password';

  input.setAttribute('type', newType);
});
