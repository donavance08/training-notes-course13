const https = require('https');
const fs = require('fs');

/*
 * One other way to accomplish the ch 01_01 is by using the https.get()
 * It requires a first param as the URL, and second param is the callback
 * https.get(URL, callback)
 * inside the response callback function we can pipe the response to fs.createWriteStream() to create a file that contains the content of the response.
 */
const request = https.get(
  'https://en.wikipedia.org/wiki/Charlie_Brown',
  (res) => {
    let download = fs.createWriteStream('./Charlie_Brown.html');
    res.pipe(download);

    res.on('end', () => {
      console.log('Response Finished: Wiki page downloaded');
    });
  }
);

request.end();

