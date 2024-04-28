import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';

export function sign(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verify(token: string): void {
  return jwt.verify(token, JWT_SECRET) as any;
}

export default {
  sign,
  verify,
};