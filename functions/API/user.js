const { admin, db } = require('../config/connection');

exports.getUser = async (request, response) => {

    const snapshot = await db.collection('users').get()
    response.send(snapshot.docs.map(doc => doc.data()));
}

exports.getRandomNumber = (request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
}

exports.getSingleUser = (request, response) => {

}
