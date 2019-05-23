const { MongoClient } = require('mongodb')

// const url = 'mongodb://localhost:27017/duck';
const url = 'mongodb://localhost:27017';

(async () => {
    //const client = await MongoClient.connect(url)
    const client = new MongoClient(url, { useNewUrlParser: true })

    await client.connect()

    // const db = client.db()
    const db = client.db('duck')

    const users = db.collection('users')

    await users.deleteMany()

    const userInsertion = await users.insertOne({ name: 'Manuel', surname: 'Barzi', email: 'mb@mail.com', password: '123' })

    console.log(`Inserted ${userInsertion.insertedId.toString()}`)

    const ducks = db.collection('ducks')

    await ducks.deleteMany()

    const duckInsertion = await ducks.insertOne({ title: 'Hulk', description: 'Lorem ipsum...', imageUrl: 'https://...', price: 15 })

    await users.updateOne({ _id: userInsertion.insertedId }, { $push: { favs: duckInsertion.insertedId } })

    debugger
})()
