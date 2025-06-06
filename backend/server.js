const express = require('express');
const cors = require('cors');
const { syncDatabase } = require('./models');
require('dotenv').config();
const authRoutes = require('./routes/auth')
const screenplaysRoutes = require('./routes/docs')
const chatgptRoutes = require('./routes/chatgpt')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/docs', screenplaysRoutes)
app.use('/api/chatgpt', chatgptRoutes)

const PORT = process.env.PORT || 4000;
syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});