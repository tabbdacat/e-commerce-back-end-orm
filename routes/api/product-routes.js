const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const productData = await Product.findAll({
      // include associated Category and Tag data
      include: [
        Category,
        Tag,
      ]
    });
    //run 200 status code and provide productData if the request is successful
    res.status(200).json(productData);
  } catch (error) {
    // db error if not successful
    res.status(500).json(error);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`, include associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        Category,
        Tag,
      ]
    });
    //run 200 status code and provide productData if the request is successful
    res.status(200).json(productData);
  } catch (error) {
    // db error if not successful
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new product
  try {
    const productData = await Product.create(req.body);
    //run 200 status code and provide productData if the request is successful
    res.status(200).json(productData);
  } catch (error) {
    // db error if not successful
    res.status(500).json(error);
  }
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy(
      {
        where: {
          id: req.params.id,
        }
      })
    //run 200 status code and provide updated productData if the request is successful
    res.status(200).json(productData);
  } catch (error) {
    // db error if not successful
    res.status(500).json(error);
  }
});

module.exports = router;
