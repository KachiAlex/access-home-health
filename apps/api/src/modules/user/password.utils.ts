import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export function hashPassword(plainText: string): string {
  return bcrypt.hashSync(plainText, SALT_ROUNDS);
}

export function verifyPassword(plainText: string, hash: string): boolean {
  return bcrypt.compareSync(plainText, hash);
}
