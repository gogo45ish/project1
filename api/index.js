import jsonServer from 'json-server';
import cors from 'cors';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// CORS middleware
server.use(cors({ 
  origin: 'https://test-ibkxeegm3-georges-projects-42256be8.vercel.app', // Frontend Vercel URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

server.use(middlewares);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'https://test-ibkxeegm3-georges-projects-42256be8.vercel.app'); // Adjust this to match your frontend URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  next();
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

export default server;
