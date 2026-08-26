// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== PACKAGE FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const packageCards = document.querySelectorAll('.package-card');
const templeSection = document.querySelector('.temple-section-head');
const templeGrid = document.getElementById('templeGrid');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    // Show/hide temple section header
    if (templeSection && templeGrid) {
      if (filter === 'all' || filter === 'temple') {
        templeSection.style.display = '';
        templeGrid.style.display = 'grid';
      } else {
        templeSection.style.display = 'none';
        templeGrid.style.display = 'none';
      }
    }

    packageCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.add('hidden');
        card.classList.remove('visible');
      }
    });
  });
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ANIMATE ON SCROLL =====
const animateCards = document.querySelectorAll('.animate-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animateCards.forEach(card => observer.observe(card));

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  // Clear errors
  ['nameError','phoneError','emailError','messageError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });

  if (!name.value.trim()) {
    document.getElementById('nameError').textContent = 'Please enter your name.';
    valid = false;
  }
  if (!phone.value.trim() || !/^[6-9]\d{9}$/.test(phone.value.replace(/\s/g,''))) {
    document.getElementById('phoneError').textContent = 'Enter a valid 10-digit mobile number.';
    valid = false;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    document.getElementById('emailError').textContent = 'Enter a valid email address.';
    valid = false;
  }
  if (!message.value.trim()) {
    document.getElementById('messageError').textContent = 'Please enter a message.';
    valid = false;
  }

  if (valid) {
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      alert('Thank you! Your enquiry has been sent. The RVR Travels team will contact you shortly.');
      contactForm.reset();
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Enquiry';
      btn.disabled = false;
    }, 1000);
  }
});

// ===== TRANSFER TABS =====
const transferTabs = document.querySelectorAll('.transfer-tab');
const airportPanel = document.getElementById('airportPanel');
const railwayPanel = document.getElementById('railwayPanel');

transferTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    transferTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    if (tab.getAttribute('data-tab') === 'airport') {
      airportPanel.classList.remove('hidden');
      railwayPanel.classList.add('hidden');
    } else {
      railwayPanel.classList.remove('hidden');
      airportPanel.classList.add('hidden');
    }
  });
});
