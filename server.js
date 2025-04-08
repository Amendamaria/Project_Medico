
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const { name, age, gender, specifyGender, phone, place } = req.body;

  const finalGender = gender === 'Others' ? specifyGender : gender;

  const newPatient = {
    name,
    age,
    gender: finalGender,
    phone,
    place
  };


  fs.readFile('data.json', 'utf8', (err, data) => {
    let patients = [];

    if (!err && data) {
      patients = JSON.parse(data);
    }

    patients.push(newPatient);

    fs.writeFile('data.json', JSON.stringify(patients, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error saving data');
      } else {
        res.status(200).send('Patient details saved successfully!');
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});