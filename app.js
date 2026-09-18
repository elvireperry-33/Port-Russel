require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const catwayRoutes = require('./routes/catways');
const reservationRoutes = require('./routes/reservation');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/catways', catwayRoutes);
app.use('/reservations', reservationRoutes);
app.use('/catways/:id/reservations', reservationRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/', authRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté !'))
  .catch((error) => console.log('Erreur MongoDB :', error));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost: ${PORT}`);
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});


