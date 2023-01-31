const express = require('express');
const bodyParser = require('body-parser');
let skiTerms = require('./skiTerms.json');
const fs = require('fs');

const app = express();

const save = () => {
  fs.writeFile(
    './skiTerms.json',
    JSON.stringify(skiTerms, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};
/* *
 * command in order to serve static files over express
 */
app.use(express.static('./client'));

app.get('/dictionary', (req, res) => {
  res.json(skiTerms);
});

/* *
 * This can be done by adding a post route to receive requests, parse the body using body-parser and save it into the json file.
 */
app.post('/dictionary', bodyParser.json(), (req, res) => {
  skiTerms.push(req.body);
  save();
  res.json({
    status: 'success',
    term: req.body,
  });
});

app.listen(3000, () => {
  console.log('Ski Dictionary at http://localhost:3000');
});

