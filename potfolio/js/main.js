// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseout', () => {
    cursor.style.display = 'none';
});

const links = document.querySelectorAll('a, button, .theme-toggle, .menu-btn');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});

// ===== Navigation and Menu Toggle =====
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Active Navigation Link on Scroll =====
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== Header Scroll Effect =====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '';
        header.style.boxShadow = '';
    }
});

// ===== Dark/Light Theme Toggle =====
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// ===== Animated Skill Bars =====
const skillPers = document.querySelectorAll('.skill-per');

function animateSkills() {
    skillPers.forEach(skillPer => {
        const percentage = skillPer.getAttribute('per');
        skillPer.style.width = percentage + '%';
    });
}

// ===== Project Filtering =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => {
            filterBtn.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 200);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill-bars')) {
                animateSkills();
            }
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elements to animate on scroll
document.querySelectorAll('.section-header, .about-image, .about-text, .service-card, .project-card, .contact-item, .contact-form').forEach(el => {
    observer.observe(el);
});

// Observe skill bars for animation
document.querySelectorAll('.skill-bars').forEach(el => {
    observer.observe(el);
});

// ===== 3D Model with Three.js =====
function init3DModel() {
    const canvas = document.getElementById('hero-3d');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x4e54c8, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create a geometric shape - dodecahedron for a cyber security theme
    const geometry = new THREE.DodecahedronGeometry(1.5, 0);
    const material = new THREE.MeshStandardMaterial({
        color: 0x4e54c8,
        wireframe: true,
        emissive: 0x8f94fb,
        emissiveIntensity: 0.2
    });
    
    const dodecahedron = new THREE.Mesh(geometry, material);
    scene.add(dodecahedron);

    // Create orbiting particles
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x8f94fb });
    
    const particles = [];
    for (let i = 0; i < 50; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Random position in a sphere around the dodecahedron
        const radius = 2 + Math.random() * 1;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        
        // Store original position for animation
        particle.userData = {
            originalPos: {
                x: particle.position.x,
                y: particle.position.y,
                z: particle.position.z
            },
            speed: 0.001 + Math.random() * 0.005
        };
        
        scene.add(particle);
        particles.push(particle);
    }

    // Position camera
    camera.position.z = 5;

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate dodecahedron
        dodecahedron.rotation.x += 0.005;
        dodecahedron.rotation.y += 0.01;
        
        // Animate particles
        particles.forEach(particle => {
            const { originalPos, speed } = particle.userData;
            
            // Circular motion around original position
            const time = Date.now() * speed;
            particle.position.x = originalPos.x + Math.sin(time) * 0.3;
            particle.position.y = originalPos.y + Math.cos(time) * 0.3;
            particle.position.z = originalPos.z + Math.sin(time) * Math.cos(time) * 0.3;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize 3D model after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    init3DModel();
});

// ===== Contact Form Submission =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real scenario, you would send data to your server
        // For demo purposes, we'll just simulate success
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        // Disable form inputs during submission
        formInputs.forEach(input => {
            input.setAttribute('disabled', true);
        });
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.setAttribute('disabled', true);
        
        setTimeout(() => {
            // Show success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.backgroundColor = 'var(--success-color)';
            
            // Add success class to form
            contactForm.classList.add('form-success');
            
            // Reset form after delay
            setTimeout(() => {
                // Reset form fields
                contactForm.reset();
                
                // Re-enable inputs
                formInputs.forEach(input => {
                    input.removeAttribute('disabled');
                });
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.removeAttribute('disabled');
                
                // Remove success class
                contactForm.classList.remove('form-success');
            }, 3000);
        }, 2000);
    });
}

// ===== Fetch and Display Projects =====
fetch('/api/projects')
  .then(response => response.json())
  .then(projects => {
    const projectsContainer = document.getElementById('projects-container');
    projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.className = 'project';
      projectElement.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;
      projectsContainer.appendChild(projectElement);
    });
  });

// ===== Handle Contact Form Submission =====
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    });
});

// ===== Fetch and Display About Info =====
fetch('/api/about')
  .then(response => response.json())
  .then(about => {
    document.getElementById('about-name').textContent = about.name;
    document.getElementById('about-bio').textContent = about.bio;
    const skillsList = document.getElementById('about-skills');
    about.skills.forEach(skill => {
      const skillItem = document.createElement('li');
      skillItem.textContent = skill;
      skillsList.appendChild(skillItem);
    });
  });

// Fetch and display contact submissions
function loadContactSubmissions() {
  fetch('/api/contact-submissions')
    .then(response => response.json())
    .then(submissions => {
      const submissionsContainer = document.getElementById('contact-submissions');
      submissionsContainer.innerHTML = ''; // Clear previous content
      submissions.forEach(submission => {
        const submissionElement = document.createElement('div');
        submissionElement.className = 'submission';
        submissionElement.innerHTML = `
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> ${submission.email}</p>
          <p><strong>Message:</strong> ${submission.message}</p>
          <hr>
        `;
        submissionsContainer.appendChild(submissionElement);
      });
    });
}

// Call the function to load submissions on page load
window.onload = function() {
  loadContactSubmissions();
};