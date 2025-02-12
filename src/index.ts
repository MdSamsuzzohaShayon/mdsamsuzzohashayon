// import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultBehavior from './assets/scripts/DefaultBehavior';
import InteractNavbar from './assets/scripts/InteractNavbar';
import './assets/scss/index.scss';
import anime from "animejs";

// Function to animate the preloader with bottom-to-top curved motion


// Dynamically injecting classnames
window.addEventListener('DOMContentLoaded', () => {

    const defaultBehavior = new DefaultBehavior();
    defaultBehavior.run();

    const interactNavbar = new InteractNavbar();
    interactNavbar.run();

});