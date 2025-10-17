import bcrypt from 'bcrypt';

const user = {
  username: process.env.ADMIN_EMAIL || 'admin@sportsboard.com',
  passwordHash: process.env.ADMIN_PASSWORD ? bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10) : bcrypt.hashSync('admin123', 10)
};

export const getLoginPage = (req, res) => {
  if(req.session.user) {
    return res.redirect('/sports-board/api/upload');
  }
  res.render('login', { error: null });
};

export const login = (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && bcrypt.compareSync(password, user.passwordHash)) {
    req.session.user = username;
    res.redirect('/sports-board/api/upload');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/sports-board/api/image/login');
  });
};

export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/sports-board/api/image/login');
    // next();
  }
};

// Add a default export that aggregates the named exports
export default {
  getLoginPage,
  login,
  logout,
  isAuthenticated,
};
