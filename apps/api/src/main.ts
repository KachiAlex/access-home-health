import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Starting bootstrap...');
  const app = await NestFactory.create(AppModule);
  console.log('App created');
  const port = Number(process.env.PORT ?? 4000);
  console.log(`Listening on port ${port}`);
  await app.listen(port, '0.0.0.0');
  console.log(`Server running on http://localhost:${port}`);
}

const bootstrap_result = bootstrap();
console.log('Bootstrap promise:', bootstrap_result);
bootstrap_result.catch(err => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});
