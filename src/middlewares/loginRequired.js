import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Login Required' });
  }

  const [, token] = authorization.split(' ');
  try {
    const data = await jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({ where: { id, email } });

    if (!user) return res.status(401).json({ error: 'Invalid User' });

    req.UserId = id;
    req.UserEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Expired or invalid Token' });
  }
};
