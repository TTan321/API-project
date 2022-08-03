const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const { Spot, User, Review, Image, Sequelize, sequelize } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [Sequelize.literal('Images.url'), 'previewImage'],
                [Sequelize.fn('avg', Sequelize.col('Reviews.stars')), 'avgRating']
            ]
        },
        include: [
            { model: Review, attributes: [] },
            { model: Image, attributes: [] }
        ],
        group: ['spot.id']
    });

    res.status(200);
    return res.json({ "Spots": spots });
})

router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [Sequelize.literal('Images.url'), 'previewImage'],
                [Sequelize.fn('avg', Sequelize.col('Reviews.stars')), 'avgRating']
            ]
        },
        include: [
            { model: Review, attributes: [] },
            { model: Image, attributes: [] }
        ],
        group: ['spot.id'],
        where: {
            ownerId: req.user.id
        }
    });

    res.status(200);
    res.json(spots);
});

router.get('/:spotId', async (req, res) => {
    const id = req.params.spotId;
    const spot = await Spot.findOne({
        include: [
            { model: Image, attributes: ['id', [sequelize.literal('Images.id'), 'imageableId'], 'url',] },
            { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] }
        ],
        where: {
            id: id
        }
    });

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    res.status(200);
    return res.json(spot);
});

router.get('/:spotId/reviews', async (req, res) => {
    const id = req.params.spotId;
    const reviews = await Review.findAll({
        include: [{ model: User, attributes: ['id', 'username'] }],
        where: {
            spotId: id
        }
    });
    if (!reviews) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    res.status(200);
    return res.json({ "Reviews": reviews });
})


module.exports = router;
