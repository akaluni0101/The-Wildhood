const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;
const rootDir = __dirname;
const dataDir = path.join(rootDir, 'data');
const reservationsFile = path.join(dataDir, 'reservations.json');

fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(reservationsFile)) {
  fs.writeFileSync(reservationsFile, '[]', 'utf8');
}

function readReservations() {
  try {
    const raw = fs.readFileSync(reservationsFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (error) {
    return [];
  }
}

function writeReservations(entries) {
  fs.writeFileSync(reservationsFile, JSON.stringify(entries, null, 2), 'utf8');
}

app.use(express.json({ limit: '1mb' }));
app.use(express.static(rootDir));

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'the-wildhood-api',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/reservations', (req, res) => {
  res.json(readReservations());
});

app.post('/api/reservations', (req, res) => {
  const { name, phone, email, date, time, guests, seating, requests } = req.body || {};

  if (!name || !phone || !email || !date || !time || !guests || !seating) {
    return res.status(400).json({
      success: false,
      message: 'Please complete all required reservation fields.'
    });
  }

  const reservation = {
    id: Date.now().toString(36),
    bookingCode: `WH-${Math.floor(1000 + Math.random() * 9000)}`,
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: String(email).trim(),
    date: String(date),
    time: String(time),
    guests: String(guests),
    seating: String(seating),
    requests: String(requests || '').trim(),
    createdAt: new Date().toISOString()
  };

  const records = readReservations();
  records.unshift(reservation);
  writeReservations(records);

  return res.status(201).json({
    success: true,
    message: 'Reservation submitted successfully.',
    bookingCode: reservation.bookingCode,
    reservation
  });
});

app.listen(PORT, () => {
  console.log(`The Wildhood backend running on http://localhost:${PORT}`);
});
