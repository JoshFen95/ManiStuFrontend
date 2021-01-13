const logger = require("./logger")
const alert = require("alert");

exports.handleLoginError = (err) => {
    console.log(err);

    if (err.response.status === 400) {
        alert("Please provide a username and password")
    }
    if (err.response.status === 401) {
        alert("Wrong Username or Password")
    }

    logger.log(err.response.data)
}

exports.handleAddAssessmentError = (err) => {
    if (err.response.status === 400) {
        alert("Please fill out all of the fields")
    }
    logger.log(err.response.data)
}