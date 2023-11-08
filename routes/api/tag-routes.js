const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags, include its associated Product data
    try {
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

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`, include its associated Product data
  try {
  const tagData = await Tag.findByPk(req.params.id, {include: [
    Product,
  ]});
  //run 200 status code and provide tagData if the request is successful
  res.status(200).json(tagData);
} catch (error) {
  // db error if not successful
  res.status(500).json(error);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    //run 200 status code and provide tagData if the request is successful
    res.status(200).json(tagData);
  } catch (error) {
    // db error if not successful
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body,
      {
        where: {
          id: req.params.id,
        }
      }
    )
    //run 200 status code and provide tagData if the request is successful
    res.status(200).json(tagData);
    } catch (error) {
     // db error if not successful
      res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy(
      {
        where: {
          id: req.params.id,
        }
    })
    //run 200 status code and provide tagData if the request is successful
    res.status(200).json(tagData);
  } catch (error) {
   // db error if not successful
    res.status(500).json(error);
  }
});

module.exports = router;
