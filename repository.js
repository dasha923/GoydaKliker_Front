const db = require('./db'); // Подключение к базе данных

async function saveClick(userId) {
  return db.query('INSERT INTO clicks (user_id, timestamp) VALUES ($1, NOW())', [userId]);
}

async function getClicks(userId) {
  const result = await db.query('SELECT COUNT(*) FROM clicks WHERE user_id = $1', [userId]);
  return parseInt(result.rows[0].count, 10);
}

async function getUser(userId) {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  return result.rows[0];
}

module.exports = { saveClick, getClicks, getUser };