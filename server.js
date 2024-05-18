const app = require('./api');
const db = require('./db');
const redis = require('./integrations/redis');

const port = process.env.PORT || 3001;

db.connect();
redis.connect();

app.listen(port, () => console.log(`listening on port: ${port}`));
