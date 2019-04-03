//import google cloud spanner client library
var {Spanner} = require('@google-cloud/spanner')
var express = require('express')
var bp = require('body-parser')


const myProjectId = 'nodespanner-236509'
const myInstanceId = 'nodespannerinstance'
const myDatabaseId = 'databasefriends'

const spanner = new Spanner({projectId:myProjectId})
const instance = spanner.instance(myInstanceId)
const database = instance.database(myDatabaseId)

const myquery = {
    sql:'select * from personaldetail'
}


var app = express()
app.use(bp.json())




app.get("/spanner/all", (req, res)=>{
    database.run(myquery).then((results)=>{
        console.log("Results Object:" )
        console.log(results[0])
        const rows = results[0]
        res.send(rows)
        res.end()
        
    })
})

app.listen(1111)