const express = require('express')
const fs = require('fs');
const router = express.Router()

router.get("/" , (req ,res) => {
    const dataBuffer = fs.readFileSync('./json/schedule.json')
    const schedule = JSON.parse(dataBuffer.toString())    
    let result = schedule
    res.send(result)
})

router.get("/status" , (req ,res) => {
    let status = []

    const dataBuffer = fs.readFileSync('./json/schedule.json')
    const schedule = JSON.parse(dataBuffer.toString())    

    const roomToColor = ((room) => {
        let color
        switch(room){
            case 'A' :
                color = 'green'
                break;
            case 'B' :
                color = 'orange'
                break;
            case 'C' :
                color = 'blue'
                break;
        }
        return color
    })

    const useTimeToTime = ((time , useTime) =>{
        let [hours, minutes] = time.split(':');

        hours = Number(hours) + Number(useTime)
        hours > 24 ? hours = hours - 24 : hours 

        return hours + ':' + minutes +':00'
    })

    const maskingName = ((name) => {
        let masking = name.replace(/(?<=.{1})./gi, "*");
        return masking
    })

    const dateToTimestamp = ((current) => {
        current.setHours(current.getHours() + 9);
        return current.toISOString().replace('T', ' ').substring(0, 19)
    })

    schedule.forEach(reservation => {
        if(reservation.use){
            status.push({
                name:maskingName(reservation.name),
                start: dateToTimestamp(new Date(`${reservation.startDate} ${reservation.startTime}`)),
                end: dateToTimestamp(new Date(`${reservation.startDate} ${useTimeToTime(reservation.startTime ,reservation.useTime)}`)),
                color: roomToColor(reservation.room)
            })
        }
    });

    let result = status
    res.send(result)
})

router.post("/reservation" , (req ,res) => {    
    const uid = JSON.parse(fs.readFileSync('./json/uid.json').toString())
    const schedule = JSON.parse(fs.readFileSync('./json/schedule.json').toString())

    let add ={}
    add.uid = ++uid.uid
    add.name = req.body.name
    add.phone = req.body.phone
    add.startTime = req.body.startTime
    add.startDate = req.body.startDate
    add.useTime = req.body.useTime
    add.room = req.body.room
    add.use = req.body.use === undefined ? false : req.body.use

    schedule.push(add)

    fs.writeFileSync('./json/uid.json',JSON.stringify(uid) , (err) =>{if ( err ) return err; })
    fs.writeFileSync('./json/schedule.json',JSON.stringify(schedule) , (err) =>{if ( err ) return err; })

    res.status(200).send(add)
})

router.put("/reservation" , (req ,res) => {    
    const schedule = JSON.parse(fs.readFileSync('./json/schedule.json').toString())
    
    schedule.splice(req.body.index, 1 , req.body.reservation)

    fs.writeFileSync('./json/schedule.json',JSON.stringify(schedule) , (err) =>{if ( err ) return err; })

    res.status(200).send()
})

router.delete("/reservation" , (req ,res) => {    
    const schedule = JSON.parse(fs.readFileSync('./json/schedule.json').toString())
    
    schedule.splice(req.query.index, 1)
    fs.writeFileSync('./json/schedule.json',JSON.stringify(schedule) , (err) =>{if ( err ) return err; })

    res.status(200).send()
})

module.exports = router