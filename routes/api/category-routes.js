const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // include associated Products
      include: [
        Product,
      ]
    });
    //run 200 status code and provide categoryData if the request is successful
    res.status(200).json(categoryData);
  } catch (error) {
    // db error if not successful
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value, include associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        Product,
      ]
    });
    //run 200 status code and provide categoryData if the request is successful
    res.status(200).json(categoryData);
  } catch (error) {
    // db error if not successful
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    //run 200 status code and provide categoryData if the request is successful
    res.status(200).json(categoryData);
  } catch (error) {
    // db error if not successful
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body,
      {
        where: {
          id: req.params.id,
        }
      }
    )
    //run 200 status code and provide categoryData if the request is successful
    res.status(200).json(categoryData);
  } catch (error) {
    // db error if not successful
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy(
      {
        where: {
          id: req.params.id,
        }
      })
    //run 200 status code and provide categoryData if the request is successful
    res.status(200).json(categoryData);
  } catch (error) {
    // db error if not successful
    res.status(500).json(error);
  }
});

module.exports = router;
