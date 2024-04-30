import jwt, { Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'secretKey';

export function sign(payload: string | Buffer | object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verify(token: string): string | object {
  return jwt.verify(token, JWT_SECRET);
}

const jwtUtils = {
  sign,
  verify,
};

export default jwtUtils;