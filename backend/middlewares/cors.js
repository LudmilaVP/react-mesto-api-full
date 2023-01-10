const allowedCors = [
  'https://domainname.plv.nomoredomains.club',
  'http://domainname.plv.nomoredomains.club',
  'http://api.domainname.plv.nomoredomains.club',
  'https://api.domainname.plv.nomoredomains.club',
  'https://localhost:3000',
  'http://localhost:3000',
];

const cors = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = cors;
