const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// router.get('/', async (req, res) => {
//     // find all tags
//     // be sure to include its associated Product data
//     try {
//         const tagData = await Tag.findAll({
//             include: [{ model: Tag }, { model: Product }, { model: ProductTag }],
//         });
//         res.status(200).json(tagData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/', async (req, res) => {
//     try {
//         const tagData = await Tag.findAll({
//             include: [{ model: Product }, { model: ProductTag }],
//         });
//         res.status(200).json(tagData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/', (req, res) => {
//     // find all tags
//     // be sure to include its associated Product data
//     Tag.findAll({
//         include: [
//             {
//                 model: Product,
//                 attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
//             }
//         ]
//     })
//         .then(dbTagData => res.json(dbTagData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

router.get('/', async (req, res) => {
    try {
        // find all products
        // be sure to include its associated Category and Tag data
        const productData = await Product.findAll({
            include: [
                {
                    model: Category,
                    attributes: ['id', 'category_name'],
                },
                {
                    model: Tag,
                    attributes: ['id', 'tag_name'],
                },
            ],
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        });

        res.status(200).json(productData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// router.get('/:id', async (req, res) => {
//     // find a single tag by its `id`
//     // be sure to include its associated Product data
//     try {
//         const chosenTag = await Tag.findByPk(req.params.id, {
//             include: [{ model: Tag }, { model: Product }, { model: ProductTag }],
//         });
//         if (!chosenTag) {
//             res.status(404).json({ message: 'no tag found with that id' });
//         }
//         res.status(200).json(chosenTag);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


router.get('/:id', async (req, res) => {
    try {
        const dbTagData = await Tag.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
                },
            ],
        });

        if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id' });
            return;
        }

        res.json(dbTagData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new tag
    try {
        const newTag = await Tag.create(req.body);
        res.status(200).json(newTag);
    } catch (err) {
        res.status(400).json(err);
    }

});

// router.put('/:id', async (req, res) => {
//     // update a tag's name by its `id` value
//     try {
//         const { tag_id } = req.params;
//         const { name } = req.body;
//         const updateTag = await Tag.update(
//             { name },
//             { where: { tag_id } }
//         );
//         if (!updateTag) {
//             res.status(404).json({ message: 'no tag found with that id' });
//         }
//         res.status(200).json(updateTag);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updateTag = await Tag.update(
            { name },
            { where: { id } }
        );
        if (!updateTag) {
            res.status(404).json({ message: 'no tag found with that id' });
        }
        res.status(200).json(updateTag);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    try {
        deletedTag = await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletedTag) {
            res.status(404).json({ message: 'no tag found with that id' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;

