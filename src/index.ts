import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import classNames from 'classnames';

// Dynamically injecting classnames
const app = document.getElementById('app');
const btnClass = classNames('btn', 'btn-primary', 'my-button');
const button = `<button class="${btnClass}">Click me</button>`;

if (app) {
  app.innerHTML = `<h1 class="text-center">Hello from TypeScript</h1>${button}`;
}

// Dynamic event handling
document.querySelector('.my-button')?.addEventListener('click', () => {
  alert('Button clicked!');
});
