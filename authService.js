const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };
  
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const res = await pool.query('SELECT id, username FROM users WHERE id = $1', [jwt_payload.id]);
      if (res.rows.length > 0) {
        return done(null, res.rows[0]);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }));
  
  const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  };
  
  const registerUser = async (username, password) => {
    const hashed = await bcrypt.hash(password, 10);
    const res = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashed]
    );
    return res.rows[0];
  };
  
  const validateUser = async (username, password) => {
    const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = res.rows[0];
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  };
  
  module.exports = { passport, generateToken, registerUser, validateUser };
  