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

    const nameVal = name.value.trim();
    const phoneVal = phone.value.trim();
    const emailVal = email.value.trim();
    const packageVal = document.getElementById('package').value || 'Not selected';
    const messageVal = message.value.trim();

    // ===== 1. SEND EMAIL VIA WEB3FORMS =====
    const formData = new FormData();
    formData.append('access_key', '28881942-41bc-45af-8bff-6611fac378ca');
    formData.append('subject', '🔔 New Enquiry — RVR Travels Website');
    formData.append('from_name', 'RVR Travels Website');
    formData.append('name', nameVal);
    formData.append('phone', phoneVal);
    formData.append('email', emailVal);
    formData.append('package', packageVal);
    formData.append('message', messageVal);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log('Email sent:', data);
    })
    .catch(err => {
      console.error('Email send error:', err);
    });

    // ===== 2. SEND VIA WHATSAPP =====
    const waText = `🔔 *New RVR Travels Enquiry!*\n\n` +
      `👤 *Name:* ${nameVal}\n` +
      `📞 *Phone:* ${phoneVal}\n` +
      `📧 *Email:* ${emailVal}\n` +
      `📦 *Package:* ${packageVal}\n` +
      `💬 *Message:* ${messageVal}`;

    const whatsappURL = `https://wa.me/919500913336?text=${encodeURIComponent(waText)}`;

    // ===== 3. SHOW SUCCESS & OPEN WHATSAPP =====
    setTimeout(() => {
      contactForm.style.display = 'none';
      const successEl = document.getElementById('formSuccess');
      successEl.style.display = 'flex';
      // Set the WhatsApp link in success message in case popup was blocked
      document.getElementById('waFallbackLink').href = whatsappURL;
      window.open(whatsappURL, '_blank');
      contactForm.reset();
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Enquiry';
      btn.disabled = false;
    }, 800);
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
