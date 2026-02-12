import 'dotenv/config';
import { createServer } from 'http';
import { app } from '../../apps/api/src/main';

export default async (req, res) => {
  return new Promise((resolve, reject) => {
    const server = createServer(app.getHttpServer());
    server.emit('request', req, res);
    
    res.on('finish', () => {
      server.close();
      resolve(undefined);
    });
    
    res.on('error', reject);
  });
};
