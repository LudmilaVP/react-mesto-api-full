module.exports.corsConfig = {
  origin: [
    'https://domainname.plv.nomoredomains.club',
    'http://domainname.plv.nomoredomains.club',
    'https://localhost:3000',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
  credentials: true,
};
