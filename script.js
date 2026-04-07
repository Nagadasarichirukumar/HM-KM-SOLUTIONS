// Intersection Observer
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});
sections.forEach(section => observer.observe(section));

// Navigation active link
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 100) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Counter animation
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function startCounters() {
    counters.forEach(counter => {
        let update = () => {
            let target = +counter.dataset.target;
            let current = +counter.innerText;
            let inc = Math.max(1, Math.ceil(target / 80));

            if (current < target) {
                counter.innerText = Math.min(target, current + inc);
                setTimeout(update, 25);
            } else {
                counter.innerText = target;
                counter.classList.add('counter-animated');
                setTimeout(() => counter.classList.remove('counter-animated'), 700);
            }
        };
        update();
    });
}

const aboutSection = document.querySelector('#about');
const aboutObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
            startCounters();
            counterStarted = true;
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.25 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Floating dots
function generateDots() {
    const container = document.getElementById('dotsContainer');

    for (let i = 0; i < 30; i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        container.appendChild(dot);
    }
}

generateDots();

