// Load mongodb driver
const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app =express()
const url = 'mongodb+srv://superadmin:om.14511451@cluster0.2xwft.mongodb.net/sample_weatherdata?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true,useUnifiedTopology: true})
app.get('/restaurants',async (req, res) => {
  try{

     await client.connect()
    
    const db = client.db('sample_weatherdata')
    const collection = db.collection('data')
    const query = { type: 'Point'}
    const query = { coordinates: '[-59.5, 44]'}
    const query = { callLetters: 'RIGG'}
    const cursor =  collection.find(query).limit(10)
    let restaurants = []
    await cursor.forEach(doc => restaurants.push(doc.name))

    res.send(restaurants)
    }catch(e){
        console.error(e)
    }finally{
      await client.close()
    }

})

app.listen(3000, console.log('Start application at port 3000'))

