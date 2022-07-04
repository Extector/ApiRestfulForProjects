import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Login Required' });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Expired or invalid Token' });
  }
};
