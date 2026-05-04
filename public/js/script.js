// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMobile.classList.toggle('open');
  document.body.classList.toggle('nav-open');
});

// Close mobile menu on link click
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMobile.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

// Testimonial slider
const slider = document.getElementById('testimonialSlider');
if (slider) {
  const slides = slider.querySelectorAll('.testimonial-slide');
  const counter = document.getElementById('testimonialCounter');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  let current = 0;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    counter.textContent = (current + 1) + ' / ' + slides.length;
  }

  prevBtn.addEventListener('click', () => showSlide(current - 1));
  nextBtn.addEventListener('click', () => showSlide(current + 1));

  // Auto-advance every 8 seconds
  setInterval(() => showSlide(current + 1), 8000);
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    item.classList.toggle('open');
    btn.setAttribute('aria-expanded', !isOpen);
  });
});

// Inquiry form handling
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = inquiryForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(inquiryForm);
      const data = {};
      formData.forEach((value, key) => {
        if (data[key]) {
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
      });

      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        inquiryForm.innerHTML = '<div class="form-success"><h3>Thank you for reaching out.</h3><p>We review each inquiry carefully. If your project aligns, we\u2019ll be in touch to schedule a consultation and discuss next steps.</p></div>';
      } else {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again.');
    }
  });
}
