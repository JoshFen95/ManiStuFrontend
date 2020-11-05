const axios = require("axios");
const logger = require("../utils/logger");

let token = null;
let teacher = null;

exports.login = async (req, res) => {
  res.render("login");
};

exports.submitLogin = async (req, res, next) => {
  logger.log(req.body);
  const loginDetails = req.body;
  axios
    .post("http://localhost:8080/auth/signin", loginDetails)
    .then((apiResponse) => {
      logger.log(apiResponse.data);
      // res.send(apiResponse.data);
      token = apiResponse.data.token;
      console.log("111111");
      console.log(token);
      teacher = apiResponse.data.teacher;
      console.log("111111");
      console.log(teacher);
      req.body.teacherData = apiResponse.data;
      // res.setHeader('Set-Cookie', [`access_token=${token}`, `teacher=${teacher.teacherName}`]);
      // res.setHeader('authorization',[`access_token=${token}`])
      // next();
      res.redirect("../home");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.renderHome = async (req, res) => {
  // req.body.students = await getAllStudentsPromise();
  console.log("HOME");
  console.log(req.body);
  // console.log(req.body.teacherData.teacher);
  console.log(req.body.students);
  // const teacher = req.body.teacherData.teacher;
  const students = req.body.students;
  logger.log("Final Method");
  logger.log(teacher);
  logger.log(students);
  res.render("home", { teacher: teacher.teacherName, students: students });
};

exports.getAllStudents = (req, res, next) => {
  logger.log("We are in getAllStudents:");
  console.log(req.body);
  axios
    .get("http://localhost:8080/student/all", {
      headers: {
        authorization: token,
      }
    })
    .then((apiResponse) => {
      req.body.students = apiResponse.data.students;
      next();
    });
};

exports.getStudentById = (req, res, next) => {
  console.log("herehrehre");
  const studentId = req.params.id;
  axios
    .get(`http://localhost:8080/student/${studentId}`, {
      headers: {
        authorization: token,
      },
    })
    .then((apiResponse) => {
      console.log(apiResponse);
      req.body.student = apiResponse.data.student;
      next();
    });
};

exports.renderEdit = async (req, res) => {
  const student = req.body.student;
  logger.log(student);
  res.render("editStudentSection", { student: student });
};

exports.submitEdit = (req, res, next) => {
  console.log("here1");
  console.log(req.body);
  console.log(req.params);
  const studentId = req.params.id;
  const assessmentId = req.params.assessmentId;
  axios
    .post(
      `http://localhost:8080/student/${studentId}/${assessmentId}`,
      req.body
    )
    .then((apiResponse) => {
      console.log("here2");
      console.log(apiResponse.data);
      req.body.student = apiResponse.data;
      res.redirect(`http://localhost:3000/edit/${studentId}`);
    });
};

exports.renderAdd = async (req, res) => {
  const student = req.body.student;
  logger.log(student);
  res.render("addAssessmentSection", { student: student });
};

exports.submitAdd = (req, res) => {
  const studentId = req.params.id;
  axios
    .post(`http://localhost:8080/student/${studentId}/assess`, req.body)
    .then((apiResponse) => {
      req.body.student = apiResponse.data;
      res.redirect("../home"); // needs to redirect to home but needs teacher obj
    });
};
exports.passToDelete = (req, res, next) => {
  console.log("redireting to submit delete");
  next();
};

exports.submitDelete = (req, res) => {
  console.log("hit");
  console.log(req);
  const studentId = req.params.id;
  const assessmentId = req.params.assessmentId;
  axios
    .delete(`http://localhost:8080/student/${studentId}/delete/${assessmentId}`)
    .then((apiResponse) => {
      req.body.student = apiResponse.data;
      res.redirect("../../home"); // needs to redirect to home but needs teacher obj
    });
};
