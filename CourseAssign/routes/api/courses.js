const Teacher = require('../../connection').Teacher
const Batch = require('../../connection').Batch
const Course = require('../../connection').Course
const Lecture = require('../../connection').Lecture
const Subject = require('../../connection').Subject
const Student = require('../../connection').Student

const route = require('express').Router() 

route.get('/', (req,res) => {
    
    Course.findAll()
        .then( (courses) => {
            res.status(200).send(courses)
        })
        .catch( (err) => {
            res.status(500).send({
                error: "Could not retrive Batches"
            })
        })
})

route.get('/:courseId', (req,res) => {
    Course.findAll({
        where:{
            id: req.params.courseId
        }
    })
    .then( (course) => {
        res.status(200).send(course)
    })
    .catch( (err) => {
        res.status(500).send({
            error: "Could not retrive Teacher"
        })
    })
})

route.get('/:id/batches', (req,res) => {
    Batch.findAll({
        where:{
            courseId: req.params.id
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

route.get('/:id/batches/:bid', (req,res) => {
    Batch.findAll({
        where:{
            courseId: req.params.id,
            id: req.params.bid
        }
    })
    .then( (batches) => {
        res.status(200).send(batches)
    })
    .catch( (err) => {
        res.status(500).send({
            error: "Could not retrive Teacher"
        })
    }) 
})


route.get('/:courseId/batches/:batchId/lectures', (req, res) =>{
    Lecture.findAll({

        where : {
            BatchId : req.params.batchId
        },
        include: [
            {
                model: Batch,
                include:[Course]
            }
        ]
    }).
    then((course)=>{
        res.status(200).send(course)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({
        error : "could not retrieve Course "
    })
    })
});


route.get('/:courseId/batches/:batchId/lectures/:lectureid', (req, res) =>{
    Lecture.findAll({

        where : {
            id : req.params.lectureid,
            BatchId : req.params.batchId
        },
        include: [
            {
                model: Batch,
                include:[Course]
            }
        ]
    })
    .then((course)=>{
        res.status(200).send(course)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({
        error : "could not retrieve Course "
    })
    })
});

route.get('/:courseId/batches/:batchId/students', (req, res) =>{
    Mapper.findAll({

        where : {
            BatchId : req.params.batchId
        },
        include: [Student,{

                        model:Batch,
                        include :[Course]
                }],

    })
    .then((course)=>{
        res.status(200).send(course)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({
        error : "could not retrieve Course "
    })
    })
});

route.get('/:courseId/batches/:batchId/teachers', (req, res) =>{
    Lecture.findAll({

        where : {
            BatchId : req.params.batchId
        },
        include: [Teacher,{

                        model:Batch,
                        include :[Course]
                }],

    }).
    then((course)=>{
        res.status(200).send(course)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({
        error : "could not retrieve Course "
    })
    })
});



route.delete('/:id', (req,res) => {
    Course.destroy({
        where:{
            id: req.params.id
        }
    })
    .then( () => res.sendStatus(200) )
})

route.post('/', (req,res) => {

    Course.create({
        name:req.body.name
    }).then( (course) => {
        res.status(201).json(course)
    }).catch( (err) => {
        res.status(501).send({
            error: "Could not create"
        })
    })
})



exports = module.exports = route