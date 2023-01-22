const mongoose = require('mongoose');
require('dotenv').config()

const MONGO_URI = process.env.MongoDB_URL

mongoose.connection.once('open', ()=>{
 console.log('MongoDB Connection ready!')
})

mongoose.connection.on('error', (err)=>{
 console.error(err)
})

async function mongoConnect() {
 await mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 }).catch((e) => console.log(e));
}

async function mongoDisconnect() {
 await mongoose.disconnect();
}

module.exports = {
 mongoConnect,
 mongoDisconnect
}