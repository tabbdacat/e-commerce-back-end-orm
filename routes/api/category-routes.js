const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
    // add components!!!!
    include: [
      Product,
    ]
    });
    //run 200 status code and provide UserData if the request is successful
    res.status(200).json(categoryData);
  } catch (error) {
    // db error
    res.status(500).json(error);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {include: [
      Product,
    ]});
    //run 200 status code and provide UserData if the request is successful
    res.status(200).json(categoryData);
  } catch (error) {
    // db error
    res.status(500).json(error);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
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
  res.status(200).json(categoryData);
  } catch (error) {
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
  res.status(200).json(categoryData);
} catch (error) {
  res.status(500).json(error);
}
});

module.exports = router;
