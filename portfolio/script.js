/**
 * Ankit Kumar - Personal Portfolio Interactive Logic
 * Cyber-Glassmorphic Dynamic Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initStickyHeader();
  initMobileMenu();
  initScrollReveal();
  initSkillsAnimation();
  initProjectFilter();
  initContactForm();
  initResumeDownload();
});

/**
 * 1. Typewriter Animation for Hero Section Roles
 */
function initTypewriter() {
  const element = document.getElementById('typewriter-text');
  if (!element) return;

  const roles = JSON.parse(element.getAttribute('data-roles') || '[]');
  if (roles.length === 0) return;

  let currentRoleIdx = 0;
  let currentCharIdx = 0;
  let isDeleting = false;
  let delay = 150;

  function type() {
    const currentRole = roles[currentRoleIdx];
    
    if (isDeleting) {
      // Erasing characters
      element.textContent = currentRole.substring(0, currentCharIdx - 1);
      currentCharIdx--;
      delay = 50; // faster erase
    } else {
      // Typing characters
      element.textContent = currentRole.substring(0, currentCharIdx + 1);
      currentCharIdx++;
      delay = 100; // standard typing speed
    }

    // Role typing finished
    if (!isDeleting && currentCharIdx === currentRole.length) {
      delay = 2000; // Pause at full word
      isDeleting = true;
    } 
    // Role erasing finished
    else if (isDeleting && currentCharIdx === 0) {
      isDeleting = false;
      currentRoleIdx = (currentRoleIdx + 1) % roles.length;
      delay = 500; // Brief pause before typing next
    }

    setTimeout(type, delay);
  }

  // Start the loop
  setTimeout(type, 1000);
}

/**
 * 2. Sticky Header & Active Link Tracking
 */
function initStickyHeader() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Toggle sticky scrolled background
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Tracking
    let currentActiveId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // accounting for navigation height offset
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute('id');
      }
    });

    if (currentActiveId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/**
 * 3. Mobile Navigation Menu Toggle
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-menu');
  const menuLinks = document.querySelectorAll('.nav-links a');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking link items
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/**
 * 4. Scroll Reveal Animations (Intersection Observer)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, no need to keep observing
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * 5. Animated Skills Progress Bars on Viewport Enter
 */
function initSkillsAnimation() {
  const skillsSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.skill-bar-fill');
  
  if (!skillsSection || progressBars.length === 0) return;

  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger fill width transitions
        progressBars.forEach(bar => {
          const targetPercent = bar.getAttribute('data-percent');
          bar.style.width = targetPercent;
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  skillsObserver.observe(skillsSection);
}

/**
 * 6. Dynamic Project Category Filters
 */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active visual state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          // Show with smooth scaling transitions
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide with smooth transitions
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * 7. Contact Form Dynamic Validation & Visual Success
 */
function initContactForm() {
  const contactForm = document.getElementById('portfolio-contact-form');
  const feedbackMsg = document.getElementById('form-feedback-message');
  const btnSubmit = document.getElementById('btn-submit-form');

  if (!contactForm || !feedbackMsg) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset feedback states
    feedbackMsg.className = 'form-message';
    feedbackMsg.style.display = 'none';

    // Retrieve input values
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Basic Validation
    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all contact fields before sending.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Success State simulation
    btnSubmit.disabled = true;
    const originalBtnText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

    setTimeout(() => {
      showFeedback(`Thank you, ${name}! Your message has been sent successfully. Ankit will respond shortly.`, 'success');
      contactForm.reset();
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = originalBtnText;
    }, 1500);
  });

  function showFeedback(text, type) {
    feedbackMsg.textContent = text;
    feedbackMsg.classList.add(type);
    feedbackMsg.style.display = 'block';
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

/**
 * 8. Mock Dynamic Resume File Creation & Download
 * This makes the download resume button fully active and functional in production/testing
 */
function initResumeDownload() {
  const downloadBtn = document.getElementById('btn-download-resume');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', (e) => {
    // Generate a simple mock professional text-based PDF/resume file for instant download verification
    const mockResumeText = `
ANKIT KUMAR - PORTFOLIO RESUME
Role: B.Tech Computer Science & Engineering (Batch 2027)
Email: ankit.kumar.cse27@gmail.com
LinkedIn: https://linkedin.com/in/ankit-kumar
GitHub: https://github.com/ankit-kumar

SUMMARY:
A highly motivated Computer Science student seeking software development internships. Experienced in both C++/Web development frameworks and 3D Creative Tools like Blender, Premiere Pro, and VFX compositing.

CORE SKILLS:
- Languages: C++, Python, JavaScript, HTML, CSS, SQL
- Frameworks: React.js, Node.js, Express.js
- Databases: MongoDB, MySQL, PostgreSQL
- Tools: Blender 3D, Premiere Pro, After Effects, Unity, Unreal Engine

ACADEMIC PROJECTS:
1. E-Case Management System (C++ / SQLite)
2. Library Management System (Java / SQL)
3. Tower of Hanoi Visualizer (HTML/CSS/JS)
4. MERN Creative Analytics Dashboard (React/Node/Express/MongoDB)
5. Blender Automotive CGI Project (3D Lighting/Camera Tracking)

EXPERIENCE & ACHIEVEMENTS:
- Lead Freelance VFX Editor (3+ Years)
- Hackathon Runner-up (University Collaborative Project Contest)
- 250+ solved challenges on Leetcode / Codechef
`;

    const blob = new Blob([mockResumeText.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    downloadBtn.href = url;
    downloadBtn.download = 'Ankit_Kumar_Resume_Mock.txt';
  });
}
