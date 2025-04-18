const windowHeight = window.innerHeight || document.documentElement.clientHeight;
const elementsLeft = document.querySelectorAll('#left');
const elementsRight = document.querySelectorAll('#right');

function handleScroll() {
    const scrollPosition = window.scrollY || window.pageYOffset;

    elementsLeft.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < windowHeight && rect.bottom > 0;

        if (isVisible) {
            el.classList.add('animate__animated', 'animate__slideInLeft');
        } else {
            el.classList.remove('animate__animated', 'animate__slideInLeft');
        }
    });

    elementsRight.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < windowHeight && rect.bottom > 0;

        if (isVisible) {
            el.classList.add('animate__animated', 'animate__slideInRight');
        } else {
            el.classList.remove('animate__animated', 'animate__slideInRight');
        }
    });

    function animateNumber(targetElementId, finalNumber, duration = 5000, stepSize = 1) {
        const element = document.getElementById('count');
        if (!element) {
            console.error(`Element with id "${targetElementId}" not found`);
            return;
        }

        let currentNumber = 0;
        const startTime = performance.now();
        const totalSteps = finalNumber / stepSize;
        const interval = duration / totalSteps;

        function updateNumber(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            currentNumber = Math.floor(progress * finalNumber);

            element.textContent = currentNumber + "K+";

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = finalNumber + "K+"; // Гарантируем точное значение
            }
        }

        requestAnimationFrame(updateNumber);
    }

// Использование
    animateNumber('out-1', 1000, 5000);
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

handleScroll();