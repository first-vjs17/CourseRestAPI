const route=require('express').Router()

route.use('/students',require('./students'))
route.use('/teachers',require('./teachers'))
route.use('/batches',require('./batches'))
route.use('/courses',require('./courses'))
route.use('/lectures',require('./lectures'))
route.use('/subjects',require('./subjects'))
// route.use('/studentbatches',require('./studentbatches'))
// route.use('/teacherbatches',require('./teacherbatches'))


module.exports=route   