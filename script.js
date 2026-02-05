document.addEventListener('DOMContentLoaded', function() {
    function showNotification(message, isError = false) {
        const existingNotification = document.querySelector('.copy-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.classList.add('copy-notification');
        if (isError) {
        }
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            notification.addEventListener('transitionend', () => {
                notification.remove();
            }, { once: true });
        }, 3000);
    }

    document.getElementById('copyIP').addEventListener('click', function() {
        navigator.clipboard.writeText('BLATMC.PL')
            .then(() => {
                showNotification('IP skopiowane!');
            })
            .catch(err => {
                console.error('Nie udało się skopiować IP: ', err);
                showNotification('Nie udało się skopiować IP. Spróbuj ponownie.', true);
            });
    });

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });

                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const loader = document.querySelector('.loader');

    window.addEventListener('load', () => {
        loader.classList.add('hidden');

        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('loaded');
            }, 200 * index);
        });
    });
});
