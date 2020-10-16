const axios = require('axios');
const logger = require("../utils/logger");


exports.login = async (req, res) => {

    res.render("login");
  };

exports.submitLogin = async (req, res,next) => {
    logger.log(req.body);
    const loginDetails = req.body;
     axios.post("http://localhost:8080/auth/signin" , loginDetails)
    .then((apiResponse) => {
        logger.log(apiResponse.data);
        // res.send(apiResponse.data);
        const token = apiResponse.data.token;
        const teacher = apiResponse.data;
        req.body.teacherData = apiResponse.data;
        next();
    })
    .catch((err) => {
        console.log(err);
    })
  };

exports.destrutureAllStudentsPromise = async (req, res, next) => {
    await getAllStudentsPromise()
    .then((students)=> {
        req.body.students = students;
        console.log("2222222")
        console.log(req.body.teacherData)
        console.log(req.body.students)
        next();
    })
  };

exports.renderHome =(req,res) => {
    console.log('333333333')
    console.log(req.body.teacherData.teacher)
    console.log(req.body.students)
    const teacher = req.body.teacherData.teacher;
    const students = req.body.students;
    logger.log("Final Method");
    logger.log("teacher: " + teacher);
    logger.log("students: " + students);
    res.render("home",  { teacher: req.body.teacherData.teacher,
        students: req.body.students });
  
}

//       showAllStudents = async (req, res) =>{
//     // const token = req.token;
//     // const teacher = req.teacher;
//     // logger.log(teacher);
//     let students = null;
//     await axios.get("http://localhost:8080/student/all")
//     .then( (apiResponse) => {
//          students = apiResponse.data;
//         // logger.log("Response from showAllStudent:")
//         // logger.log(apiResponse.data);
//         console.log("here 2")
//         console.log(students);
//         // return students;
//         // res.render("home",  { teacher: teacher,
//         //     students: students });
//     })
//     return students;
//   };



  let getAllStudentsPromise =  (req, res) => {
      return new Promise((resolve) => {
        axios.get("http://localhost:8080/student/all")
        .then((res) => {
            const students = res.data;
            resolve(students)
      })
  })};