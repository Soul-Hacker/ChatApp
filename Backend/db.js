const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb+srv://Hemant:Hemant@chatapp.kl5pnvs.mongodb.net/Connect?retryWrites=true&w=majority';

const mongoDB = async () => {
  console.log("working point 1")
  try {
    console.log("inside try block")
    const client = new MongoClient(mongoURI);
     client.connect();
    console.log('Connected to MongoDB');
    // await client.close();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
  console.log("point 2") 
};

module.exports = mongoDB;
