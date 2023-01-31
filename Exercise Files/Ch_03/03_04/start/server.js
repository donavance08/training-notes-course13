const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

let skiTerms = require('./skiTerms.json');

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

app.use(express.static('./client'));

app.get('/dictionary', (req, res) => {
  res.json(skiTerms);
});

app.post('/dictionary', bodyParser.json(), (req, res) => {
  skiTerms.push(req.body);
  save();
  res.json({
    status: 'success',
    term: req.body,
  });
});

app.delete('/dictionary/:term', bodyParser.json(), (req, res) => {
  skiTerms = skiTerms.filter((term) => {
    return req.params.term !== term;
  });
  save();
  res.json({
    status: 'success',
    removed: req.params.term,
    newLength: skiTerms.length,
  });

  skiTerms.save();
});

app.use((req, res, next) => {});

app.listen(3000, () => {
  console.log(`Ski Dictionary at http://localhost:3000`);
});

