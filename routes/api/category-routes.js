const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const CategoryData = await Category.findAll({
    // add components!!!!
    
    
    });
    //run 200 status code and provide UserData if the request is successful
    res.status(200).json(userData);
  } catch (error) {
    // db error
    res.status(500).json(error);
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const CategoryData = await Category.findByPk(req.params.id);
    //run 200 status code and provide UserData if the request is successful
    res.status(200).json(userData);
  } catch (error) {
    // db error
    res.status(500).json(error);
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
