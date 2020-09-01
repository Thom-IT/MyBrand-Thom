import express from 'express';
const router = express.Router();
import queryModel from '../models/queryModel';
import response from 'express';
import Mongoose from 'mongoose';
import verify from '../middleware/check-auth';
//import validateQueries from '../middleware/queriesValidation';
import { validateQueries } from '../middleware/queriesValidation';
//import post from './users';
//=====create a query Post=============
router.post('/', validateQueries, (req, res, next) => { //http://localhost:3000/blogs/
    const qry = new queryModel({
        name: req.body.name,
        email: req.body.email,
        query: req.body.query
    });
    qry.save().then(result => {
        //console.log(result);
        res.status(201).json({
            createdQuery: {
                name: result.name,
                email: result.email,
                query: result.query,
                date: result.date,
                _id: result._id,
            }
        });
    });

});
//=================ALL DATA================
router.get('/all', verify, async(req, res, next) => {
    queryModel.find()
        .select('name email query')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                queryData: docs.map(doc => {
                    return {
                        name: doc.name,
                        email: doc.email,
                        query: doc.query,
                        _id: doc._id,
                        date: doc.date,
                    }
                })
            };
            //console.log(docs);
            if (docs.length > 0) {
                res.status(200).json(response)
            }
        })
});
//specific post
router.get('/:id', verify, async(req, res, next) => {

    const qryid = req.params.id;
    queryModel.findById(qryid)
        .exec()
        .then(doc => {
            console.log("Data coming from DB", doc);
            if (doc) {
                res.status(200).json({
                    queryData: doc,
                });

            } else {
                res.status(404).send('No Data found on that ID');
            }

        })

});
//==Delete post==================
router.delete('/:id', verify, async(req, res) => {

    const qry = await queryModel.findOne({ _id: req.params.id });
    if (!qry) return res.status(404).send('query Not Found');
    await queryModel.remove({ _id: req.params.id });

    return res.status(200).json({
        status: 200,
        message: "deleted Successiful",
        //deletedPost
    });
});


module.exports = router;