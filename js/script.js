document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    const particlesElement = document.getElementById('particles-js');
    if (particlesElement) {
        console.log("particles-js element found");
        
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#3498db' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false, anim: { enable: false } },
                    size: { value: 3, random: true, anim: { enable: false } },
                    line_linked: { enable: true, distance: 150, color: '#3498db', opacity: 0.4, width: 1 },
                    move: {
                        enable: true,
                        speed: 0.5,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                    modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
                },
                retina_detect: true
            });
        } else {
            console.error("particlesJS is not defined. Make sure the library is loaded correctly.");
        }
    } else {
        console.error("particles-js element not found in the DOM");
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade in/out sections on scroll
    const sections = document.querySelectorAll('section');
    const fadeInSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    };

    const sectionObserver = new IntersectionObserver(fadeInSection, {
        root: null,
        threshold: 0.1,
        rootMargin: '-100px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-level');
    const skillsSection = document.querySelector('#skills');

    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.style.transition = 'width 1s ease-out';
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const skillsObserver = new IntersectionObserver(animateSkills, {
        threshold: 0.5
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Animate project cards on hover
    const projectCards = document.querySelectorAll('.project');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
    });

    // Animate service items on hover
    const serviceItems = document.querySelectorAll('.service-card');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
            item.style.backgroundColor = '#f0f8ff';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            item.style.backgroundColor = '#f8f9fa';
        });
    });

    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    };

    const imageObserver = new IntersectionObserver(lazyLoad, {
        root: null,
        threshold: 0.1
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const burger = document.querySelector('.burger');
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Scroll effect for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        header.classList.toggle('scrolled', window.scrollY > 0);
    });

    // Set width of skill levels
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        level.style.width = level.getAttribute('style').split(':')[1].trim();
    });

    // Add the GitHub pinned projects fetching function
    async function fetchGitHubPinnedProjects() {
        try {
            const response = await fetch('json/pinned_repos.json');
            const data = await response.json();
    
            // Extract the repositories list
            const repos = data.data.user.pinnedItems.edges;
    
            const projectsContainer = document.getElementById('github-projects');
            if (projectsContainer) {
                if (repos.length === 0) {
                    projectsContainer.innerHTML = '<p>No pinned repositories found.</p>';
                    return;
                }
    
                repos.forEach(({ node: project }) => {
                    const projectElement = document.createElement('div');
                    projectElement.className = 'project-card';
                    projectElement.innerHTML = `
                        <h3>${project.name}</h3>
                        <p>${project.description || 'No description available'}</p>
                        <p><strong>Language:</strong> ${project.primaryLanguage ? project.primaryLanguage.name : 'Not specified'}</p>
                        <a href="${project.url}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    `;
                    projectsContainer.appendChild(projectElement);
                });
            } else {
                console.error('GitHub projects container not found');
            }
        } catch (error) {
            console.error('Error fetching GitHub pinned projects:', error);
        }
    }
    
    // Call the function to fetch and display GitHub pinned projects
    fetchGitHubPinnedProjects();
});