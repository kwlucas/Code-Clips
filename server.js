const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Superduper secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
