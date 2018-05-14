const Teacher = require('../../connection').Teacher
const Batch = require('../../connection').Batch
const Course = require('../../connection').Course
const Lecture = require('../../connection').Lecture
const Subject = require('../../connection').Subject
const Student = require('../../connection').Student

const route = require('express').Router() 

route.get('/', (req,res) => {
    
    Student.findAll()
        .then( (students) => {
            res.status(200).send(students)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Teachers"
            })
        })
})

route.get('/:id', (req,res) => {
    Student.findAll({
        where:{
            id: req.params.id
        }
    })
    .then( (student ) => {
        res.status(200).send(student)
    })
    .catch( (err) => {
        res.status(500).send({
            error: "Could not retrive Teacher"
        })
    })
})

route.delete('/:id', (req,res) => {
    Student.destroy({
        where:{
            id: req.params.id
        }
    })
    .then( () => res.sendStatus(200) )
})

route.post('/', (req,res) => {

    Student.create({
        name:req.body.name
    }).then( (student) => {
        res.status(201).json(student)
    }).catch( (err) => {
        res.status(501).send({
            error: "Could not create"
        })
    })
})

route.put('/:id', (req,res) => {

    Student.update(
        {name: req.body.name},
        {where: {id:req.params.id} }
    ).then( (student) => {
        res.sendStatus(200)
    }).catch( (err) => {
        res.status(501).send({
            error: "Could not create"
        })
    })
})


exports = module.exports = route