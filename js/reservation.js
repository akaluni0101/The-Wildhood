/**
 * THE WILDHOOD — LUXURY WILDLIFE-THEMED CAFÉ & RESTAURANT
 * Table Reservation Form Logic & Interactive Confirmation
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservationForm');
  const dateInput = document.getElementById('resDate');
  const modal = document.getElementById('reservationSuccessModal');
  const closeModalBtn = document.getElementById('closeSuccessModalBtn');
  const seatingBoxes = document.querySelectorAll('.seating-radio-box');

  // Set minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Radio selection styling
  if (seatingBoxes.length > 0) {
    seatingBoxes.forEach(box => {
      box.addEventListener('click', () => {
        seatingBoxes.forEach(b => b.classList.remove('selected'));
        box.classList.add('selected');
        const radio = box.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic field values
      const name = document.getElementById('resName').value.trim();
      const phone = document.getElementById('resPhone').value.trim();
      const email = document.getElementById('resEmail').value.trim();
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;
      const guests = document.getElementById('resGuests').value;
      const seating = document.querySelector('input[name="resSeating"]:checked')?.value || 'Indoor Glasshouse';
      const requests = document.getElementById('resRequests')?.value.trim() || 'None';

      // Validation
      let isValid = true;

      // Validate Name
      if (name.length < 2) {
        showError('resName', 'Please enter your full name');
        isValid = false;
      } else {
        clearError('resName');
      }

      // Validate Phone (10 digits approx)
      const phoneClean = phone.replace(/[^0-9]/g, '');
      if (phoneClean.length < 10) {
        showError('resPhone', 'Please enter a valid 10-digit mobile number');
        isValid = false;
      } else {
        clearError('resPhone');
      }

      // Validate Email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('resEmail', 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError('resEmail');
      }

      // Validate Date & Time
      if (!date) {
        showError('resDate', 'Please select a reservation date');
        isValid = false;
      } else {
        clearError('resDate');
      }

      if (!time) {
        showError('resTime', 'Please select a time slot');
        isValid = false;
      } else {
        clearError('resTime');
      }

      if (!isValid) return;

      const payload = {
        name,
        phone,
        email,
        date,
        time,
        guests,
        seating,
        requests
      };

      fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(async (response) => {
          const data = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(data.message || 'Unable to submit reservation. Please try again.');
          }

          const bookingCode = data.bookingCode || 'WH-0000';

          document.getElementById('summaryBookingCode').textContent = bookingCode;
          document.getElementById('summaryGuestName').textContent = name;
          document.getElementById('summaryDetails').textContent = `${guests} Guests • ${formatDate(date)} at ${time} • ${seating}`;

          if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }

          const waBtn = document.getElementById('whatsappConfirmBtn');
          if (waBtn) {
            const waText = encodeURIComponent(`Hello The Wildhood! I have requested a reservation:\nRef: ${bookingCode}\nName: ${name}\nDate: ${date} at ${time}\nGuests: ${guests}\nArea: ${seating}`);
            waBtn.href = `https://wa.me/919876543210?text=${waText}`;
          }

          form.reset();
          seatingBoxes.forEach(b => b.classList.remove('selected'));
          seatingBoxes[0]?.classList.add('selected');
        })
        .catch((error) => {
          alert(error.message || 'Something went wrong. Please try again.');
        });
    });
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add('error');
    let errorMsg = field.parentElement.querySelector('.form-error-msg');
    if (!errorMsg) {
      errorMsg = document.createElement('div');
      errorMsg.className = 'form-error-msg';
      field.parentElement.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.remove('error');
    const errorMsg = field.parentElement.querySelector('.form-error-msg');
    if (errorMsg) errorMsg.style.display = 'none';
  }

  function formatDate(dateStr) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});
