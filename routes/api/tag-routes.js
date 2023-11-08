const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags, include its associated Product data  try {
    const tagData = await Tag.findAll({
      // include associated Products
      include: [
        Product,
      ]
      });
      //run 200 status code and provide tagData if the request is successful
      res.status(200).json(tagData);
    } catch (error) {
      // db error if not successful
      res.status(500).json(error);
    }

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
