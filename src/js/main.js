document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('download-pdf');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            window.print();
        });
    }

    const tableRows = document.querySelectorAll('.command-table tbody tr');

    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#f7fafc';
        });

        row.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', block: 'start'
                });
            }
        });
    });

    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.print();
        }

        if (e.key === 'Escape') {
            tableRows.forEach(row => {
                row.style.backgroundColor = '';
            });
        }
    });

    if (window.innerWidth <= 768) {
        const sectionTitles = document.querySelectorAll('.section-title');

        sectionTitles.forEach(title => {
            title.style.cursor = 'pointer';
            title.addEventListener('click', function () {
                const section = this.parentElement;
                const table = section.querySelector('.command-table');
                const tips = section.querySelector('.tips-container');

                if (table) {
                    table.style.display = table.style.display === 'none' ? 'table' : 'none';
                }

                if (tips) {
                    tips.style.display = tips.style.display === 'none' ? 'block' : 'none';
                }
            });
        });
    }

    const observerOptions = {
        root: null, rootMargin: '0px', threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            } else {
                entry.target.classList.remove('section-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTopBtn.classList.toggle("show", window.scrollY > 400);
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0, behavior: "smooth"
    });
});
