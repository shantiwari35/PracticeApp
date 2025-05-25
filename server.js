const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const { v4: uuidv4 } = require('uuid');

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ✅ Validate and handle POST requests
server.post('/:resource', (req, res, next) => {
  const { resource } = req.params;
  const body = req.body;

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ error: 'Request body is missing' });
  }

  // Add ID if missing
  if (!body.id) {
    body.id = uuidv4();
  }

  res.status(201);
  next();
});

// ✅ Handle PUT (Update)
server.put('/:resource/:id', (req, res, next) => {
  const { resource, id } = req.params;
  const existing = router.db.get(resource).find({ id: parseInt(id) }).value();

  if (!existing) {
    return res.status(404).json({ error: `${resource} with ID ${id} not found` });
  }

  res.status(200);
  next();
});

// ✅ Handle PATCH (Partial Update)
server.patch('/:resource/:id', (req, res, next) => {
  const { resource, id } = req.params;
  const existing = router.db.get(resource).find({ id: parseInt(id) }).value();

  if (!existing) {
    return res.status(404).json({ error: `${resource} with ID ${id} not found` });
  }

  res.status(200);
  next();
});

// ✅ Handle DELETE
server.delete('/:resource/:id', (req, res, next) => {
  const { resource, id } = req.params;
  const existing = router.db.get(resource).find({ id: parseInt(id) }).value();

  if (!existing) {
    return res.status(404).json({ error: `${resource} with ID ${id} not found` });
  }

  res.status(204); // No Content
  next();
});

server.use(router);

// Start JSON Server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server running at http://localhost:${PORT}`);
});
