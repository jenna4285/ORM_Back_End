const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({ include: [Product] }).then((tagData) => {
    res.json(tagData);
  }).catch((error) => {
    res.json(error);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({where: {id: req.params.id }, include:[Product]})
  .then((tagData) => {
    res.json(tagData);
  }) .catch((error) => {
    res.json(error);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((error) => {
    res.json(error);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updateTag) => {
    res.json(updateTag);
  })
  .catch((error) => res.json(error));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ 
    where: {
      id: req.params.id,
    },
  })
    .then((deleteTag) => {
      res.json(deleteTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
