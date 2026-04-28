import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');

let _db: ReturnType<typeof JSON.parse> | null = null;
function getDb() {
  if (!_db) _db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  return _db;
}

app.get('/hero', (_req, res) => {
  res.json(getDb().hero);
});

app.get('/member', (_req, res) => {
  res.json(getDb().member);
});

app.get('/plan', (_req, res) => {
  res.json(getDb().plan);
});

app.get('/quickActions', (_req, res) => {
  res.json(getDb().quickActions);
});

app.get('/recentActivity', (_req, res) => {
  res.json(getDb().recentActivity);
});

app.get('/actionAlert', (_req, res) => {
  res.json(getDb().actionAlert);
});

app.get('/navigation', (_req, res) => {
  res.json(getDb().navigation);
});

app.get('/benefits', (_req, res) => {
  res.json(getDb().benefits);
});

app.get('/wellnessWisdom', (_req, res) => {
  res.json(getDb().wellnessWisdom);
});

app.get('/claims', (_req, res) => {
  res.json(getDb().claims);
});

app.get('/claims/:id', (req, res) => {
  const claim = getDb().claims.find((c: any) => c.id === req.params.id);
  if (!claim) return res.status(404).json({ error: 'Not found' });
  res.json(claim);
});

app.get('/reviews', (_req, res) => {
  res.json(getDb().reviews);
});

app.get('/prescriptions', (_req, res) => {
  res.json(getDb().prescriptions);
});

app.get('/providers/:id', (req, res) => {
  const provider = getDb().providers.find((p: any) => p.id === req.params.id);
  if (!provider) return res.status(404).json({ error: 'Not found' });
  res.json(provider);
});

app.get('/providers', (req, res) => {
  let providers: any[] = getDb().providers;
  const { category, maxDistance, name } = req.query;

  if (category && category !== 'All') {
    providers = providers.filter(p => p.category === category);
  }
  if (maxDistance) {
    providers = providers.filter(p => p.distance <= parseFloat(maxDistance as string));
  }
  if (name) {
    const q = (name as string).toLowerCase();
    providers = providers.filter(p => p.name.toLowerCase().includes(q));
  }

  res.json(providers);
});

app.listen(PORT, () => {
  console.log(`\n✅  Mock server running at http://localhost:${PORT}\n`);
  console.log('  GET /hero');
  console.log('  GET /member');
  console.log('  GET /plan');
  console.log('  GET /quickActions');
  console.log('  GET /recentActivity');
  console.log('  GET /actionAlert');
  console.log('  GET /wellnessWisdom');
  console.log('  GET /navigation');
  console.log('  GET /benefits');
  console.log('  GET /claims');
  console.log('  GET /claims/:id');
  console.log('  GET /providers?category=&maxDistance=&name=');
  console.log('  GET /reviews');
  console.log('  GET /prescriptions\n');
});
