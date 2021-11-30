const express = require('express')
const { MongoClient } = require('mongodb');
var cors = require('cors');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cpi7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)


async function run() {
  try {
    await client.connect();
    const database = client.db('my-profile')
    const coverCollection = database.collection('project');
   


    app.get('/project', async (req, res) => {
      const cursor = coverCollection.find({});
      const users = await cursor.toArray();
      res.json(users);
      // res.json(users);
    })

    app.get('/project/:id', async function (req, res) {
        const idp = req.params.id;
        console.log(req.body.e)
        const id = req.body.e || idp
        const query = { _id: ObjectId(id) }
        const result = await coverCollection.findOne(query);
        res.json(result)
      })

   


  }
  finally {
    // await client.close();
  }
}
run().catch(console.dri);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log('Example app listening at', port)
})