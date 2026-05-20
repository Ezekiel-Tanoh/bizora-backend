app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://https://bizora-frontend-ivory.vercel.app/',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});