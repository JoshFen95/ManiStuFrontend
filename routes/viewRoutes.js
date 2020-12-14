const router = require('express').Router();
const viewsController = require('./viewsController');

router.get("/login", viewsController.login);
router.post("/login", viewsController.submitLogin);

router.get("/home" ,viewsController.getAllStudents,viewsController.renderHome);
router.get("/getStudent", viewsController.getStudentByName, viewsController.renderSingleStudent)

router.get("/edit/:id", viewsController.getStudentById, viewsController.renderEdit);
router.post("/edit/:id/:assessmentId/submit", viewsController.submitEdit);
router.get("/delete/:id/:assessmentId", viewsController.submitDelete);

router.get("/assess/:id", viewsController.getStudentById, viewsController.renderAdd);
router.post("/assess/:id/submit",  viewsController.submitAdd);

router.get("/about", viewsController.renderAbout);
// router.get("/slide" ,viewsController.getAllStudents,viewsController.renderSlide);
// router.get("/slide/:id", viewsController.getStudentById, viewsController.renderSwiperEdit);
// router.get("/slide/add/:id", viewsController.getStudentById, viewsController.renderSwiperAdd);




module.exports = router;