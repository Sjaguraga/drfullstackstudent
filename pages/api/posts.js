const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function postHandler(req, res) {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  const db = await client.db("fseasydb");
  const postCollection = await db.collection("posts");
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  postCollection.insertOne({
    title: "Third Post",
    body: "This is my third and final post!",
    date: date,
    time: time,
  });
  console.log(time);

  return res.status(200).json({ name: "John Doe" });
}
