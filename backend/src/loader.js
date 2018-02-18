//arquivo que é disparado no começo da aplicação.

const server = require('./config/server');
require('./config/database');
require('./config/routes')(server);

