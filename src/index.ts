// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import anime from "animejs";

// Function to animate the preloader with bottom-to-top curved motion
function hidePreloader(preloader: HTMLElement, mainContent: HTMLElement) {
    anime({
        targets: preloader,
        opacity: [1, 0], // Gradually fade out
        translateY: [
            { value: -50, duration: 500, easing: 'easeOutQuad' },  // Initial upward movement
            { value: -200, duration: 800, delay: 100, easing: 'easeInOutQuad' }, // Continue to move up and disappear
        ],
        borderBottomLeftRadius: [
            { value: '0px', duration: 500, easing: 'easeOutQuad' },
            { value: '50%', duration: 800, delay: 100, easing: 'easeInOutQuad' }, // Curve bottom left corner
        ],
        borderBottomRightRadius: [
            { value: '0px', duration: 500, easing: 'easeOutQuad' },
            { value: '50%', duration: 800, delay: 100, easing: 'easeInOutQuad' }, // Curve bottom right corner
        ],
        duration: 4000,
        easing: 'easeInOutCubic',
        complete: () => {
            preloader.classList.add('d-none'); // Hide preloader after animation
            mainContent.classList.remove('d-none'); // Show main content
        },
    });
}

// Dynamically injecting classnames
window.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    if (!preloader || !mainContent) return;

    // Hide preloader and show main content
    // if (preloader) preloader.classList.add("d-none");
    // if (mainContent) mainContent.classList.remove("d-none");


    // Call the hidePreloader function after some delay
    // setTimeout(() => {
    //     hidePreloader(preloader, mainContent);
    // }, 2000); // Adjust the delay to control when the preloader hides
});