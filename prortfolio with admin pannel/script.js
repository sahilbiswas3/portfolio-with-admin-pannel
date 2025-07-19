// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Initialize skill progress bars
    initSkillBars();

    // Load projects from localStorage or use default projects
    loadProjects();

    // Initialize typing animation
    initTypingAnimation();

    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();

    // Initialize navbar scroll effect
    initNavbarScroll();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize contact form validation
    initContactForm();
    
    // Initialize particles
    initParticles();
    
    // Initialize hover effects
    initHoverEffects();
});

// Typing Animation
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const textsToType = [
        'Full-Stack Web Developer',
        'UI/UX Designer',
        'BCA Student',
        'Creative Programmer'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
        const fullText = textsToType[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        typingText.textContent = currentText;

        let typeSpeed = isDeleting ? 30 : 70;

        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 1500; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textsToType.length;
            typeSpeed = 500; // Pause before typing next text
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

// Skill Progress Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            document.getElementById('navLinks').classList.remove('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Particles Animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Create particles
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 5 + 2;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}



// Hover Effects
function initHoverEffects() {
    // Project card tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Button hover glow effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const navLinks = document.getElementById('navLinks');
    
    openMenu.addEventListener('click', function() {
        navLinks.classList.add('active');
    });
    
    closeMenu.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
}

// Contact Form Validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '') {
                showAlert('Please enter your name', 'error');
                return;
            }
            
            if (email === '') {
                showAlert('Please enter your email', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email', 'error');
                return;
            }
            
            if (message === '') {
                showAlert('Please enter your message', 'error');
                return;
            }
            
            // If all validations pass, you would normally send the form data to a server
            // For this example, we'll just show a success message
            showAlert('Your message has been sent successfully!', 'success');
            contactForm.reset();
        });
    }
}

// Email Validation Helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Alert Helper
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.textContent = message;
    
    // Append to body
    document.body.appendChild(alertDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alertDiv.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 500);
    }, 3000);
}

// Projects Management
function loadProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    if (!projectsContainer) return;
    
    // Get projects from localStorage or use default projects
    let projects = JSON.parse(localStorage.getItem('projects')) || getDefaultProjects();
    
    // Save default projects to localStorage if none exist
    if (!localStorage.getItem('projects')) {
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    // Clear container
    projectsContainer.innerHTML = '';
    
    // Add projects to container
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-aos', 'fade-up');
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image || 'https://via.placeholder.com/600x400'}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-links">
                    <a href="${project.demoLink || '#'}" class="btn" target="_blank">Live Demo</a>
                    <a href="${project.githubLink || '#'}" class="btn secondary" target="_blank">GitHub</a>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Default Projects
function getDefaultProjects() {
    return [
        {
            id: 1,
            title: 'E-Commerce Website',
            description: 'A fully responsive e-commerce website with shopping cart functionality.',
            image: 'https://via.placeholder.com/600x400',
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: 2,
            title: 'Weather App',
            description: 'A weather application that shows current weather and forecasts.',
            image: 'https://via.placeholder.com/600x400',
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: 3,
            title: 'Task Manager',
            description: 'A task management application with drag and drop functionality.',
            image: 'https://via.placeholder.com/600x400',
            demoLink: '#',
            githubLink: '#'
        }
    ];
}

// Admin Panel Authentication
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Hardcoded credentials (in a real app, this would be handled securely on a server)
    if (username === 'admin' && password === '12345') {
        // Set login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        showAlert('Invalid username or password', 'error');
    }
}

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdminPage = window.location.pathname.includes('admin.html');
    const isDashboardPage = window.location.pathname.includes('dashboard.html');
    
    if (isDashboardPage && !isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = 'admin.html';
    } else if (isAdminPage && isLoggedIn) {
        // Redirect to dashboard if already logged in
        window.location.href = 'dashboard.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'admin.html';
}

// Dashboard Projects Management
function loadDashboardProjects() {
    const projectList = document.getElementById('projectList');
    
    if (!projectList) return;
    
    // Get projects from localStorage
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    // Clear list
    projectList.innerHTML = '';
    
    // Add projects to list
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <div class="project-item-info">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 50)}${project.description.length > 50 ? '...' : ''}</p>
            </div>
            <div class="project-actions">
                <button class="btn action-btn" onclick="editProject(${project.id})">Edit</button>
                <button class="btn action-btn delete-btn" onclick="deleteProject(${project.id})">Delete</button>
            </div>
        `;
        
        projectList.appendChild(projectItem);
    });
}

// Add Project
function addProject(event) {
    event.preventDefault();
    
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const image = document.getElementById('projectImage').value.trim();
    const demoLink = document.getElementById('projectDemo').value.trim();
    const githubLink = document.getElementById('projectGithub').value.trim();
    
    if (!title || !description) {
        showAlert('Title and description are required', 'error');
        return;
    }
    
    // Get existing projects
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    // Create new project
    const newProject = {
        id: Date.now(), // Use timestamp as ID
        title,
        description,
        image: image || 'https://via.placeholder.com/600x400',
        demoLink: demoLink || '#',
        githubLink: githubLink || '#'
    };
    
    // Add to projects array
    projects.push(newProject);
    
    // Save to localStorage
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Reset form
    document.getElementById('projectForm').reset();
    
    // Reload projects list
    loadDashboardProjects();
    
    showAlert('Project added successfully', 'success');
}

// Edit Project
function editProject(id) {
    // Get projects from localStorage
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    // Find project by ID
    const project = projects.find(p => p.id === id);
    
    if (!project) return;
    
    // Populate form
    document.getElementById('projectId').value = project.id;
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectImage').value = project.image;
    document.getElementById('projectDemo').value = project.demoLink;
    document.getElementById('projectGithub').value = project.githubLink;
    
    // Change form button
    const submitBtn = document.querySelector('#projectForm button[type="submit"]');
    submitBtn.textContent = 'Update Project';
    
    // Change form submission handler
    document.getElementById('projectForm').onsubmit = updateProject;
    
    // Scroll to form
    document.querySelector('.project-form').scrollIntoView({ behavior: 'smooth' });
}

// Update Project
function updateProject(event) {
    event.preventDefault();
    
    const id = parseInt(document.getElementById('projectId').value);
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const image = document.getElementById('projectImage').value.trim();
    const demoLink = document.getElementById('projectDemo').value.trim();
    const githubLink = document.getElementById('projectGithub').value.trim();
    
    if (!title || !description) {
        showAlert('Title and description are required', 'error');
        return;
    }
    
    // Get existing projects
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    // Find project index
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) return;
    
    // Update project
    projects[index] = {
        id,
        title,
        description,
        image: image || 'https://via.placeholder.com/600x400',
        demoLink: demoLink || '#',
        githubLink: githubLink || '#'
    };
    
    // Save to localStorage
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Reset form
    document.getElementById('projectForm').reset();
    
    // Reset form submission handler
    document.getElementById('projectForm').onsubmit = addProject;
    
    // Change form button back
    const submitBtn = document.querySelector('#projectForm button[type="submit"]');
    submitBtn.textContent = 'Add Project';
    
    // Reload projects list
    loadDashboardProjects();
    
    showAlert('Project updated successfully', 'success');
}

// Delete Project
function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    // Get existing projects
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    // Filter out the project to delete
    projects = projects.filter(p => p.id !== id);
    
    // Save to localStorage
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Reload projects list
    loadDashboardProjects();
    
    showAlert('Project deleted successfully', 'success');
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Initialize dashboard if on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        loadDashboardProjects();
        
        // Add event listener for project form
        const projectForm = document.getElementById('projectForm');
        if (projectForm) {
            projectForm.addEventListener('submit', addProject);
        }
        
        // Add event listener for logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }
    }
    
    // Initialize login if on admin page
    if (window.location.pathname.includes('admin.html')) {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                login();
            });
        }
    }
});

// Example optimization for scroll event handling
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Use the debounced function for scroll events
window.addEventListener('scroll', debounce(function() {
  // Your scroll handling code here
}));

// Example of project filtering functionality
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Show/hide projects based on filter
      projects.forEach(project => {
        if (filter === 'all' || project.getAttribute('data-category') === filter) {
          project.style.display = 'block';
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'scale(1) translateY(0)';
          }, 50);
        } else {
          project.style.opacity = '0';
          project.style.transform = 'scale(0.8) translateY(20px)';
          setTimeout(() => {
            project.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}