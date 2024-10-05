import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import classNames from 'classnames';

// Dynamically injecting classnames
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');

    // Hide preloader and show main content
    if(preloader)preloader.style.display = 'none';
    if(mainContent)mainContent.classList.remove("d-none");
});