import app from './app';

const port = process.env.PORT || process.env.APP_PORT || 3000;
app.listen(port);
