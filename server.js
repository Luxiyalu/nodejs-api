const app = require('./app');
const port = process.env.PORT || 9999;

const server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
