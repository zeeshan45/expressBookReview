// In-memory users store
const users = [];

const register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const user = { id: require('uuid').v4(), username, password };
  users.push(user);
  res.json({ message: 'User registered successfully' });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.userId = user.id;
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logout successful' });
};

module.exports = { register, login, logout };