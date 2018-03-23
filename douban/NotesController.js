const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const cherrio = require('cheerio');
const request = require('request');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
  const url = 'https://book.douban.com/people/Luxiyalu/annotation/';

  request(url, (err, response, html) => {
    const $ = cherrio.load(html);
    const $books = $('.annotations-item');
    const bookPagesURL = $books.map((i, el) => {
      return $(el).find('h3 a').attr('href');
    }).get();

    res.status(200).send(bookPagesURL);
  });
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
