const Teacher = require('../../connection').Teacher
const Batch = require('../../connection').Batch
const Course = require('../../connection').Course
const Lecture = require('../../connection').Lecture
const Subject = require('../../connection').Subject
const Student = require('../../connection').Student

const route = require('express').Router() 

route.get('/', (req,res) => {
    
    Lecture.findAll()
        .then( (lectures) => {
            res.status(200).send(lectures)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Teachers"
            })
        })
})

route.get('/:id', (req,res) => {
    Lecture.findAll({
        where:{
            id: req.params.id
        }
    })
    .then( (lecture) => {
        res.status(200).send(lecture)
    })
    .catch( (err) => {
        res.status(500).send({
            error: "Could not retrive Teacher"
        })
    })
})

route.delete('/:id', (req,res) => {
    Lecture.destroy({
        where:{
            id: req.params.id
        }
    })
    .then( () => res.sendStatus(200) )
})

route.post('/', (req,res) => {

    Lecture.create({
        name:req.body.name,
        batchId:req.body.batchId
    }).then( (lecture) => {
        res.status(201).json(lecture)
    }).catch( (err) => {
        res.status(501).send({
            error: "Could not create"
        })
    })
})

route.put('/:id', (req,res) => {

    Lecture.update(
        {name: req.body.name},
        {where: {id:req.params.id} }
    ).then( (lecture) => {
        res.sendStatus(200)
    }).catch( (err) => {
        res.status(501).send({
            error: "Could not create"
        })
    })
})


exports = module.exports = route