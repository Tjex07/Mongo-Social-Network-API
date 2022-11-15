const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThoughts,
    addReaction,
    updateThoughts,
    deleteThoughts,
    removeReaction,
} = require('../../controllers/thoughtsController')

router
    .route('/').get(getThoughts).post(createThoughts)

router
    .route('/:thoughtsId').get(getSingleThought).put(updateThoughts).delete(deleteThoughts)

router
    .route('/:thoughtsId/reactions').post(addReaction)

router
    .route('/:thoughtsId/reactions/:reactionsId').delete(removeReaction)

module.exports = router;