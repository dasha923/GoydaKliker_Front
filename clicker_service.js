const express = require('express');
const router = express.Router();
const db = require('./repository'); // Импорт репозитория данных

// POST: пользователь совершает клик
router.post('/click', async (req, res) => {
  try {
    const { userId } = req.body;
    await db.saveClick(userId); // сохраняем клик
    res.status(200).json({ message: 'Клик засчитан' });
  } catch (error) {
    console.error('Ошибка при подсчёте кликов:', error);
    res.status(500).json({ error: 'Ошибка сервиса подсчёта кликов' });
  }
});

// GET: получить количество кликов пользователя
router.get('/clicks/:userId', async (req, res) => {
  try {
    const clicks = await db.getClicks(req.params.userId);
    res.status(200).json({ clicks });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения количества кликов' });
  }
});

module.exports = router;
