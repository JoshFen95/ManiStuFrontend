const router = require('express').Router();
const viewsController = require('./viewsController');

router.get("/login", viewsController.login);
router.post("/login", viewsController.submitLogin, viewsController.destrutureAllStudentsPromise,viewsController.renderHome);

module.exports = router;