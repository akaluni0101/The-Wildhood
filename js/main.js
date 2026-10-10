/**
 * THE WILDHOOD — LUXURY WILDLIFE-THEMED CAFÉ & RESTAURANT
 * Sector 100, Sukhgarh, Mohali, Punjab
 * Core Interactive Scripts
 */

(function () {
  'use strict';

  // --- 1. PRELOADER & CINEMATIC REVEAL ---
  window.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 850);
      }, 1200);
    }
  });

  // --- 2. STICKY HEADER ON SCROLL ---
  const siteHeader = document.querySelector('.site-header');
  function handleHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --- 3. MOBILE NAVIGATION DRAWER ---
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileNavToggle && mobileNavOverlay) {
    function toggleMobileMenu() {
      const isOpen = mobileNavToggle.classList.contains('open');
      if (isOpen) {
        mobileNavToggle.classList.remove('open');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileNavToggle.classList.add('open');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    mobileNavToggle.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('open');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 4. CUSTOM DESKTOP CURSOR ---
  const cursorDot = document.querySelector('.custom-cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (cursorDot && cursorFollower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    function animateCursor() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Hover effect on links, buttons and interactive cards
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .wildlife-card, .food-cat-card, .gallery-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorFollower.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovering'));
    });
  }

  // --- 5. SYNTHESIZED WEB AUDIO AMBIENT SOUND ENGINE ---
  // Generates organic soothing forest wind, warm rustling leaves & distant nocturnal atmosphere without external asset dependencies
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  let audioCtx = null;
  let isAudioPlaying = false;
  let ambientGainNode = null;
  let noiseNode = null;
  let biquadFilter = null;
  let lfoNode = null;

  function initAmbientAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      audioCtx = new AudioContext();

      // White noise buffer for gentle leaf rustle & breeze
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      // Bandpass filter to make it sound like gentle wind rustling through dense jungle canopies
      biquadFilter = audioCtx.createBiquadFilter();
      biquadFilter.type = 'bandpass';
      biquadFilter.frequency.setValueAtTime(380, audioCtx.currentTime);
      biquadFilter.Q.setValueAtTime(1.8, audioCtx.currentTime);

      // Low frequency oscillator to make the wind swell gently
      lfoNode = audioCtx.createOscillator();
      lfoNode.type = 'sine';
      lfoNode.frequency.setValueAtTime(0.18, audioCtx.currentTime); // every ~5 seconds

      const lfoGain = audioCtx.createGain();
      lfoGain.gain.setValueAtTime(120, audioCtx.currentTime);
      lfoNode.connect(lfoGain);
      lfoGain.connect(biquadFilter.frequency);

      // Master volume gain
      ambientGainNode = audioCtx.createGain();
      ambientGainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);

      noiseNode.connect(biquadFilter);
      biquadFilter.connect(ambientGainNode);
      ambientGainNode.connect(audioCtx.destination);

      noiseNode.start(0);
      lfoNode.start(0);

      return true;
    } catch (e) {
      console.warn('Ambient Audio initialization notice:', e);
      return false;
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (!audioCtx) {
        initAmbientAudio();
        isAudioPlaying = true;
        audioToggleBtn.classList.add('playing');
        const textSpan = audioToggleBtn.querySelector('.audio-label');
        if (textSpan) textSpan.textContent = 'SOUND: ON';
      } else if (audioCtx.state === 'suspended') {
        audioCtx.resume();
        isAudioPlaying = true;
        audioToggleBtn.classList.add('playing');
        const textSpan = audioToggleBtn.querySelector('.audio-label');
        if (textSpan) textSpan.textContent = 'SOUND: ON';
      } else if (audioCtx.state === 'running') {
        audioCtx.suspend();
        isAudioPlaying = false;
        audioToggleBtn.classList.remove('playing');
        const textSpan = audioToggleBtn.querySelector('.audio-label');
        if (textSpan) textSpan.textContent = 'SOUND: OFF';
      }
    });
  }

  // --- 6. SIGNATURE INTERACTION: "EXPLORE THE WILD" SCROLL JOURNEY ---
  const journeySteps = document.querySelectorAll('.journey-step');
  const journeySections = [
    document.querySelector('.hero-section'),
    document.querySelector('.section-experience'),
    document.querySelector('.section-wildlife'),
    document.querySelector('.section-food'),
    document.querySelector('.section-night')
  ];

  if (journeySteps.length > 0 && journeySections[0]) {
    function updateJourneyProgress() {
      const scrollY = window.scrollY + window.innerHeight * 0.4;
      journeySections.forEach((section, index) => {
        if (!section) return;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          journeySteps.forEach((step, sIdx) => {
            if (sIdx === index) {
              step.classList.add('active');
            } else {
              step.classList.remove('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateJourneyProgress, { passive: true });

    journeySteps.forEach((step, idx) => {
      step.addEventListener('click', () => {
        if (journeySections[idx]) {
          journeySections[idx].scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // --- 7. REVEAL ANIMATIONS (INTERSECTION OBSERVER) ---
  const revealElements = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  }

  // --- 8. LIGHTBOX ENGINE (FOR GALLERY) ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryItems = [];
  let currentActiveIndex = 0;

  function initLightbox() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    if (!galleryCards.length || !lightboxModal) return;

    currentGalleryItems = Array.from(galleryCards).map(card => ({
      src: card.querySelector('img').getAttribute('src'),
      title: card.querySelector('.gallery-card-title') ? card.querySelector('.gallery-card-title').textContent : 'The Wildhood',
      tag: card.querySelector('.gallery-card-tag') ? card.querySelector('.gallery-card-tag').textContent : 'Gallery'
    }));

    galleryCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        openLightbox(index);
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => {
        navigateLightbox(-1);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => {
        navigateLightbox(1);
      });
    }

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  function openLightbox(index) {
    if (!lightboxModal || !currentGalleryItems[index]) return;
    currentActiveIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    const visibleCards = Array.from(document.querySelectorAll('.gallery-card')).filter(c => c.style.display !== 'none');
    if (!visibleCards.length) {
      currentActiveIndex = (currentActiveIndex + direction + currentGalleryItems.length) % currentGalleryItems.length;
    } else {
      const currentCard = currentGalleryItems[currentActiveIndex];
      let visibleIndex = visibleCards.findIndex(c => c.querySelector('img').getAttribute('src') === currentCard.src);
      if (visibleIndex === -1) visibleIndex = 0;
      visibleIndex = (visibleIndex + direction + visibleCards.length) % visibleCards.length;
      const nextCard = visibleCards[visibleIndex];
      const targetGlobalIndex = currentGalleryItems.findIndex(item => item.src === nextCard.querySelector('img').getAttribute('src'));
      currentActiveIndex = targetGlobalIndex >= 0 ? targetGlobalIndex : 0;
    }
    updateLightboxContent();
  }

  function updateLightboxContent() {
    const item = currentGalleryItems[currentActiveIndex];
    if (lightboxImg) lightboxImg.src = item.src;
    if (lightboxCaption) lightboxCaption.innerHTML = `<strong>${item.title}</strong> &mdash; <span>${item.tag}</span> (${currentActiveIndex + 1}/${currentGalleryItems.length})`;
  }

  // Gallery category tabs filtering
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterCategory = btn.getAttribute('data-filter');

        const cards = document.querySelectorAll('.gallery-card');
        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterCategory === 'all' || category === filterCategory) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  initLightbox();

  // --- 9. SMOOTH ANCHOR SCROLLING ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
