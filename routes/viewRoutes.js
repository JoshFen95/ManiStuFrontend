const router = require('express').Router();
const viewsController = require('./viewsController');

router.get("/login", viewsController.login);
// router.post("/login", viewsController.submitLogin, viewsController.destrutureAllStudentsPromise,viewsController.renderHome);
router.post("/login", viewsController.submitLogin);

router.get("/home" ,viewsController.getAllStudents,viewsController.renderHome);

router.get("/edit/:id", viewsController.getStudentById, viewsController.renderEdit);
router.post("/edit/:id/:assessmentId/submit", viewsController.submitEdit);
router.get("/delete/:id/:assessmentId", viewsController.submitDelete);

router.get("/assess/:id", viewsController.getStudentById, viewsController.renderAdd);
router.post("/assess/:id/submit",  viewsController.submitAdd);




module.exports = router;