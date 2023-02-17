const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(categoryData){
      res.status(200).json(categoryData);
      return;
    }
    res.status(404).json('GET Category by id error!')

  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategoryId = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    if(updateCategoryId){
      res.status(200).json(updateCategoryId);
      return;
    }
    res.status(404).json('PUT Category error!')
  }catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });
    if(deleteCategory){
      await deleteCategory.destroy();
      res.status(200).json(deleteCategory);
      return;
    }
    res.status(404).json('DELETE Category error!')
  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
