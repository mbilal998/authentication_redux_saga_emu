const { admin, db } = require('../config/connection');

exports.getUser = async (request, response) => {

}

exports.getRandomNumber = (request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
}

exports.getSingleUser = (request, response) => {

}
