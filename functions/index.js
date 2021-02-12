const functions = require("firebase-functions");
const { admin, db } = require('./config/connection');

var express = require('express') // Initialize Express
var app = express() // Object

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser') // JSON Parse
app.use(bodyParser.urlencoded({ extended: false })) // UrlEncoded Parse

app.use(bodyParser.json()) // Define in express

const router = require('express').Router() // Define Express Router

// ON Resquest Function is endpoint function that directly call from browser
// On Call Function is function that directly call inside your code

const { getUser, getRandomNumber, getSingleUser } = require('./API/user');

router.get('/getUser', cors(), getUser);
router.get('/getRandomNumber', cors(), getRandomNumber);
router.get('/getSingleUser', getSingleUser);

exports.api = functions.https.onRequest(router)

exports.logUserCreation = functions.firestore.document("/{collectionName}/{id}")
    .onCreate(async (snap, context) => {
        const collection = context.params.collectionName;
        const id = context.params.id;
        if (collection === 'users') {
            const info = await admin.firestore().collection('users').doc(id).get();
            const fullname = info._fieldsProto.firstname.stringValue + ' ' + info._fieldsProto.lastname.stringValue
            await admin.firestore().collection("users").doc(id).update({
                fullname: fullname,
            });
            const activities = admin.firestore().collection('logs');
            return activities.add({
                activity: 'User  Created On Signup',
                user_doc_id: id,
            });
        }
    });

exports.logUserUpdate = functions.firestore.document("/{collectionName}/{id}")
    .onUpdate(async (snap, context) => {
        const collection = context.params.collectionName;
        const id = context.params.id;
        if (collection === 'users') {
            const info = await admin.firestore().collection('users').doc(id).get();
            const fullname = info._fieldsProto.firstname.stringValue + ' ' + info._fieldsProto.lastname.stringValue
            await admin.firestore().collection("users").doc(id).update({
                fullname: fullname,
            });
            const activities = admin.firestore().collection('logs');
            return activities.add({
                activity: 'User Updated On Profile Updated',
                user_doc_id: id
            });
        }
    });
