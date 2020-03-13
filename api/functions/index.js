const functions = require('firebase-functions')
const express = require('express')
const app = express();
const cors = require('cors')


const database = require('./_database')

app.get('/v1/guias/', cors(), (req, res) => {
    const { id, from, limit } = req.query
    const limitParsed = parseInt(limit)
    const fromParsed = parseInt(from)

    return database.collection(id)
        .orderBy('id')
        .startAfter(fromParsed - 1)
        .limit(limitParsed)
        .get()
        .then((snapshot) => {
            //res.setHeader('Content-type', 'application/json')
            //res.writeHead(200)
            const data = []
            snapshot.forEach((doc) => {
                //  console.log('doc', doc.data())
                //  data.push(doc.data());
                data.push(doc.data())
                // return startAtSnapshot.limit(1).get();
            });
            return res.send({
                success: true,
                data,
                meta: {
                    total: data.length
                }
            });
        }).catch((err) => {
            console.log(err)
            return res.status(500).send({ success: false, data: null, message: err.message })
        })
});

exports.api = functions.https.onRequest(app);




