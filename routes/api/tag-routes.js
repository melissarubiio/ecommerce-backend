const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try { 
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag,
      }]
    });
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag,
      }]
    })

    if (tagData) {
      res.status(200).json(tagData);
      return;
    }
    res.status(404).json('GET Tag by id error')

  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    let updateTagId = await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })

    if(updateTagId) {
      res.status(200).json(updateTagId);
      return;
    }
    res.status(404).json('PUT Tag error!')
  } 
    catch (err) {
      res.status(500).json(err)
    }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.findOne({
      where: {
        id: req.params.id
      }
    })
    if (deleteTag){
      await deleteTag.destroy();
      res.status(200).json(deleteTag);
      return;
    }
    res.status(404).json('Delete Tag error!')
  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
