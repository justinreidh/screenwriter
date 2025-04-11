const express = require('express');
const router = express.Router();
const Screenplay = require('../models/Screenplay');
const authMiddleware = require('../middleware/auth'); 

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const screenplays = await Screenplay.findAll({ where: { userId: req.user.id } });
    res.json(screenplays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const screenplay = await Screenplay.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!screenplay) return res.status(404).json({ error: 'Screenplay not found or not authorized' });
    res.json(screenplay);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const screenplay = await Screenplay.create({
      title,
      content,
      userId: req.user.id, 
    });
    res.status(201).json(screenplay);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const screenplay = await Screenplay.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!screenplay) return res.status(404).json({ error: 'Screenplay not found or not authorized' });
    await screenplay.update({ title, content });
    res.json(screenplay);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const screenplay = await Screenplay.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!screenplay) return res.status(404).json({ error: 'Screenplay not found or not authorized' });
    await screenplay.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;