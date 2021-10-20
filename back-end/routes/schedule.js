const express = require('express')
const fs = require('fs');
const router = express.Router()

router.get("/list" , (req ,res) => {
    const dataBuffer = fs.readFileSync('./json/schedule.json')
    const schedule = JSON.parse(dataBuffer.toString())    
    let result = schedule
    res.send(result)
})

router.post("/add" , (req ,res) => {    
    const uid = JSON.parse(fs.readFileSync('./json/uid.json').toString())
    const schedule = JSON.parse(fs.readFileSync('./json/schedule.json').toString())

    let add ={}
    add.uid = ++uid.uid
    add.name = req.body.name
    add.phone = req.body.phone
    add.startTime = req.body.startTime
    add.endTime = req.body.endTime
    add.room = req.body.room
    add.use = req.body.use

    schedule.push(add)

    fs.writeFileSync('./json/uid.json',JSON.stringify(uid) , (err) =>{if ( err ) return err; })
    fs.writeFileSync('./json/schedule.json',JSON.stringify(schedule) , (err) =>{if ( err ) return err; })

    let result = true

    res.send(result)
})


router.delete("/delete" , (req ,res) => {    
    const schedule = JSON.parse(fs.readFileSync('./json/schedule.json').toString())
    
    schedule.splice(req.query.index, 1)
    fs.writeFileSync('./json/schedule.json',JSON.stringify(schedule) , (err) =>{if ( err ) return err; })

    let result = true

    res.send(result)
})

module.exports = router