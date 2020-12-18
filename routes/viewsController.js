const axios = require("axios");
const logger = require("../utils/logger");
const alert = require("alert");
const errorHandler = require("../utils/errorHandler")

let token = null;
let teacher = null;

exports.login = async (req, res) => {
  res.render("login");
};

exports.submitLogin = async (req, res, next) => {
  const loginDetails = req.body;
  axios
    .post("http://localhost:8080/auth/signin", loginDetails)
    .then((apiResponse) => {
      token = apiResponse.data.token;
      teacher = apiResponse.data.teacher;
      logger.log(teacher);
      req.body.teacherData = apiResponse.data;
      res.redirect("../home");
    })
    .catch((err) => {
      errorHandler.handleLoginError(err);
      res.redirect("../login");
    });
};

exports.renderHome = async (req, res) => {
  const students = req.body.students;
  res.render("home", { teacher: teacher, students: students });
};

exports.getAllStudents = (req, res, next) => {
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
  const studentId = req.params.id;
  axios
    .get(`http://localhost:8080/student/${studentId}`, {
      headers: {
        authorization: token,
      },
    })
    .then((apiResponse) => {
      req.body.student = apiResponse.data.student;
      next();
    });
};

exports.getStudentByName = (req, res, next) => {
  const studentName = req.query.search;
  console.log('StudentName');
  console.log(studentName);
  axios
    .get(`http://localhost:8080/student/studentName/${studentName}`,{
      headers: {
        authorization: token,
      },
    })
    .then((apiResponse) => {
      req.body.student = apiResponse.data.student;
      next();
    });
};

exports.renderEdit = async (req, res) => {
  const student = req.body.student;
  res.render("editSwiper", { student: student });
};

exports.submitEdit = (req, res, next) => {
  const studentId = req.params.id;
  const assessmentId = req.params.assessmentId;
  axios
    .post(
      `http://localhost:8080/student/${studentId}/${assessmentId}`, req.body,{
        headers: {
          authorization: token,
        },
      })
    .then((apiResponse) => {
      req.body.student = apiResponse.data;
      alert("The assessment data was successfully updated");
      res.redirect(`http://localhost:3000/edit/${studentId}`);
    });
};

exports.renderAdd = async (req, res) => {
  const student = req.body.student;
  res.render("addSwiper", { student: student });
};

exports.submitAdd = (req, res) => {
  const studentId = req.params.id;
  axios
    .post(`http://localhost:8080/student/${studentId}/assess`, req.body,{
      headers: {
        authorization: token,
      },
    })
    .then((apiResponse) => {
      req.body.student = apiResponse.data;
      alert("The new assessment was successfully added");
      res.redirect("../../home");
    })
    .catch((err) => {
      errorHandler.handleAddAssessmentError(err);
      res.redirect(`../../assess/${studentId}`);
    })
};

exports.submitDelete = (req, res) => {
  const studentId = req.params.id;
  const assessmentId = req.params.assessmentId;
  axios
    .delete(`http://localhost:8080/student/${studentId}/delete/${assessmentId}`,{
      headers: {
        authorization: token,
      },
    })
    .then((apiResponse) => {
      req.body.student = apiResponse.data;
      alert("The assessment was successfully deleted");
      res.redirect("../../home");
    });
};

exports.renderSingleStudent =  (req, res) => {
  const student = req.body.student;
  res.render("singleStudent", { student: student }); 
}

exports.renderAbout = (req, res) => {
  res.render("about");
}

// exports.renderSlide = async (req, res) => {
//   const students = req.body.students;
//   res.render("swiper", { teacher: teacher, students: students });
// };

// exports.renderSwiperEdit = async (req, res) => {
//   const student = req.body.student;
//   res.render("swiperEdit", { student: student });
// };

// exports.renderSwiperAdd = async (req, res) => {
//   const student = req.body.student;
//   res.render("addSwiper", { student: student });
// };