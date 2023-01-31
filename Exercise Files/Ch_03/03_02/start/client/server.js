const express = require('express');
const bodyParser = require('body-parser');
let skiTerms = require('./skiTerms.json');

const app = express();

const save = () => {    
    fs.writeFile('./skiTerms.json', JSON.stringify(skiTerms, null, 2 ), error => {
        if(error){
            throw error;
        }
    });
};
/* *
 * command in order to serve static files over express
 */
app.use(express.static('./'));

app.get('/dictionary', (req, res) => {
  res.json(skiTerms);
});

app.post('/dictionary', bodyParser.json(), (req, res)=> {
    skiTerms.push(req.body);
    res.json({
        status: 'success',
        term: req.body,

    })
})

app.listen(3000, () => {
  console.log('Ski Dictionary at http://localhost:3000');
});
