const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
  res.send('hello');
    // User.find({}, function (err, users) {
    //     if (err) return res.status(500).send("There was a problem finding the users.");
    //     res.status(200).send(users);
    // });
});

// // GETS A SINGLE USER FROM THE DATABASE
// router.get('/:id', function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//         res.status(200).send(user);
//     });
// });

module.exports = router;
