const Teacher = require('../../connection').Teacher
const Batch = require('../../connection').Batch
const Course = require('../../connection').Course
const Lecture = require('../../connection').Lecture
const Subject = require('../../connection').Subject
const Student = require('../../connection').Student

const route = require('express').Router() 

route.get('/', (req,res) => {
    
    Teacher.findAll()
        .then( (teachers) => {
            // console.log(vendors)
            res.status(200).send(teachers)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Teachers"
            })
        })
})

route.get('/:id', (req,res) => {
    Teacher.findAll({
        where:{
            id: req.params.id
        }
    })
    .then( (teacher) => {
        res.status(200).send(teacher)
    })
    .catch( (err) => {
        res.status(500).send({
            error: "Could not retrive Teacher"
        })
    })
})

route.delete('/:id', (req,res) => {
    Teacher.destroy({
        where:{
            id: req.params.id
        }
    })
    .then( () => res.sendStatus(200) )
})

route.post('/', (req,res) => {

    Teacher.create({
        name:req.body.name,
        subjectId:req.body.subjectId
    }).then( (teacher) => {
        res.status(201).json(teacher)
    }).catch( (err) => {
        res.status(501).send({
            error: "Could not create"
        })
    })
})

route.put('/:id', (req,res) => {

    Teacher.update(
        {name: req.body.name,
        subjectId: req.body.subjectId},
        {where: {id:req.params.id} }
    ).then( (teacher) => {
        res.sendStatus(200)
    }).catch( (err) => {
        res.status(501).send({
            error: "Could not create"
        })
    })
})


exports = module.exports = route