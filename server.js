const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');

server.use(jsonServer.defaults({ bodyParser: true }));

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get('users').find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json({ user: { id: user.id, userName: user.userName, email: user.email } });
});

server.post('/auth/register', (req, res) => {
  const { userName, email, password } = req.body;
  const exists = router.db.get('users').find({ email }).value();

  if (exists) {
    return res.status(409).json({ message: 'El correo ya está registrado' });
  }

  const newUser = router.db.get('users').insert({ id: Date.now(), userName, email, password }).write();
  res.json({ user: { id: newUser.id, userName: newUser.userName, email: newUser.email } });
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server corriendo en http://localhost:3000');
});
