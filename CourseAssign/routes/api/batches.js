const Teacher = require('../../connection').Teacher
const Batch = require('../../connection').Batch
const Course = require('../../connection').Course
const Lecture = require('../../connection').Lecture
const Subject = require('../../connection').Subject
const Student = require('../../connection').Student

const route = require('express').Router() 

route.get('/', (req,res) => {
    
    Batch.findAll()
        .then( (batches) => {
            res.status(200).send(batches)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Batches"
            })
        })
})

route.get('/:id', (req,res) => {
    Batch.findAll({
        where:{
            id: req.params.id
        }
    })
    .then( (batch) => {
        res.status(200).send(batch)
    })
    .catch( (err) => {
        res.status(500).send({
            error: "Could not retrive Teacher"
        })
    })
})

// route.delete('/:id', (req,res) => {
//     Teacher.destroy({
//         where:{
//             id: req.params.id
//         }
//     })
//     .then( () => res.sendStatus(200) )
// })

route.post('/', (req,res) => {

    Batch.create({
        name:req.body.name,
        courseId:req.body.courseId
    }).then( (batch) => {
        res.status(201).json(batch)
    }).catch( (err) => {
        res.status(501).send({
            error: "Could not create"
        })
    })
})

route.put('/:id', (req,res) => {

    Batch.update(
        {
            name: req.body.name,
            courseId: req.body.courseId
        },
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