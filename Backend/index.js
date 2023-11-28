const express=require("express");
const mongoDB = require("./db");
const port = 5000;
const app=express();
const UserRouter = require("./Routes/UserRoutes");
const ChatRouter  = require("./Routes/ChatRoutes");
app.use(express.json())
mongoDB();
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//   next();
// });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
 
app.use('/api/user',UserRouter);
app.use('/api/chat',ChatRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});