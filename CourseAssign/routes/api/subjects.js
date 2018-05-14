const Teacher = require('../../connection').Teacher
const Batch = require('../../connection').Batch
const Course = require('../../connection').Course
const Lecture = require('../../connection').Lecture
const Subject = require('../../connection').Subject
const Student = require('../../connection').Student

const route = require('express').Router() 

route.get('/', (req,res) => {
    
    Subject.findAll()
        .then( (subjects) => {
            // console.log(vendors)
            res.status(200).send(subjects)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Teachers"
            })
        })
})

route.get('/:id', (req,res) => {
    Subject.findAll({
        where:{
            id: req.params.id
        }
    })
    .then( (subject) => {
        res.status(200).send(subject)
    })
    .catch( (err) => {
        res.status(500).send({
            error: "Could not retrive Subject"
        })
    })
})


//Find all teachers where subject-id is given. 
route.get('/:id/teachers', (req,res) => {
    Teacher.findAll({
        where:{ subjectId: req.params.id }
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
    Subject.destroy({
        where:{
            id: req.params.id
        }
    })
    .then( () => res.sendStatus(200) )
})

route.post('/', (req,res) => {

    Subject.create({
        name:req.body.name,
        courseId:req.body.courseId
    }).then( (subject) => {
        res.status(201).json(subject)
    }).catch( (err) => {
        res.status(501).send({
            error: "Could not create"
        })
    })
})

route.put('/:id', (req,res) => {

    Subject.update(
        {name: req.body.name,
        courseId:req.body.courseId},
        {where: {id:req.params.id} }
    ).then( (subject) => {
        res.sendStatus(200)
    }).catch( (err) => {
        res.status(501).send({
            error: "Could not create"
        })
    })
})


exports = module.exports = route