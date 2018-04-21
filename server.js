const app = require('./app');
const port = process.env.PORT || 80;

const server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});

module.exports = server;
