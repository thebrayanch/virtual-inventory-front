const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');

server.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (_req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

server.use(jsonServer.bodyParser);

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get('users').find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const payload = JSON.stringify({ sub: String(user.id), email: user.email, name: user.userName });
  const token = `eyJ.${Buffer.from(payload).toString('base64')}.sig`;

  res.json({ token });
});

server.post('/auth/register', (req, res) => {
  const { userName, email, password } = req.body;
  const exists = router.db.get('users').find({ email }).value();

  if (exists) {
    return res.status(409).json({ message: 'El correo ya está registrado' });
  }

  const newUser = router.db.get('users').insert({ id: Date.now(), userName, email, password }).write();
  const payload = JSON.stringify({ sub: String(newUser.id), email: newUser.email, name: newUser.userName });
  const token = `eyJ.${Buffer.from(payload).toString('base64')}.sig`;

  res.json({ token });
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server corriendo en http://localhost:3000');
});
