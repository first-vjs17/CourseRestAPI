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

route.delete('/:courseId', (req,res) => {
    Course.destroy({
        where:{
            id: req.params.courseId
        }
    })
    .then( () => res.sendStatus(200) )
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

route.delete('/:id/batches', (req,res) => {
    Batch.destroy({
        where:{
            id: req.params.id
        }
    })
    .then( () => res.sendStatus(200) )
})

route.get('/:courseId/batches/:batchId', (req,res) => {
    Batch.findAll({
        where:{
            courseId: req.params.courseId,
            id: req.params.batchId
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

route.get("/:courseId/batches/:batchId/students",(req, res) => {
      let courseId = parseInt(req.params.courseId);
      let batchId = parseInt(req.params.batchId);
  
      if (isNaN(courseId)) {
        return res.status(403).send({
          error: "Course Id is not a valid number"
        });
      }
  
      if (isNaN(batchId)) {
        return res.status(403).send({
          error: "Batch Id is not a valid number"
        });
      }
  
      Batch.findAll({
        where: {
          id: batchId,
          courseId: courseId
        },
  
        include: [{ model: Student }]
      }).then(studentBatches => {
        res.status(200).send(studentBatches);
      });
});
  

route.get('/:courseId/batches/:batchId/teachers', (req, res) =>{
    let courseId = parseInt(req.params.courseId);
    let batchId = parseInt(req.params.batchId);

    if (isNaN(courseId)) {
        return res.status(403).send({
          error: "Course Id is not a valid number"
        });
    }
  
    if (isNaN(batchId)) {
        return res.status(403).send({
          error: "Batch Id is not a valid number"
        });
    }

    Batch.findAll({
        where: {
            id: batchId,
            courseId: courseId
        },

        include: [{
            model: Teacher
        }]
    })
    .then( teacherBatches => {
        res.status(200).send(teacherBatches);
    });
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