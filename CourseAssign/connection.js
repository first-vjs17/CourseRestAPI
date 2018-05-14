const Sequelize =require('sequelize')

const db=new Sequelize('coursedb','root','root',{
    host: 'localhost',
    dialect: 'mysql',
    pool:{
        min:0,
        max:2
    }
})

const Course =db.define('course',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Batch =db.define('batch',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Teacher =db.define('teacher',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Student =db.define('student',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Lecture =db.define('lecture',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

const Subject =db.define('subject',{
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
    }
})

// const StudentBatch = db.define('StudentBatch', {})

// const TeacherBatch = db.define('TeacherBatch', {})

Batch.belongsTo(Course)     //CourseId will go in Batch Table
Course.hasMany(Batch)

Subject.belongsTo(Course)     //CourseId will go in Subject Table
Course.hasOne(Subject)

Teacher.belongsTo(Subject)     //SubjectId will go in Teacher Table
Subject.hasMany(Teacher)

Lecture.belongsTo(Batch)     //BatchId will go in Lecture Table
Batch.hasMany(Lecture)

Lecture.belongsTo(Subject)    //SubjectId will go in Lecture Table
Subject.hasMany(Lecture)

Lecture.belongsTo(Teacher)    //TeacherId will go in Lecture Table
Teacher.hasMany(Lecture)

Batch.belongsToMany(Student, {through: 'StudentBatch'})
Student.belongsToMany(Batch , {through: 'StudentBatch'})

Batch.belongsToMany(Teacher, {through: 'TeacherBatch'})
Teacher.belongsToMany(Batch , {through: 'TeacherBatch'})


db.sync({force:true}).then(() => console.log("Database created"))
.catch(error => {
    console.log(error)
})

module.exports={
    db,Course,Batch,Teacher,Student,Lecture,Subject
}