const express = require("express");
const cors = require("cors");

const app = express();

let lastId = 2;
let messages = [
  {
    id: 1,
    username: "Omar the zinge", 
    content: "YOOOOOOOO THIS WORKS"
  },
]

app.use(cors())
app.use(express.json())

app.get("/messages", (req, res) => {
  try {
    res.json([...messages])
  } catch(error) {
    return res.status(500)
    .json({error: "Can't get messages: " + error});
  }
})

app.post("/messages", (req, res) => {
  try {
    const body = req.body;
    if(body.username == undefined || body.content == undefined) {
      return res.status(400).json({error: "missing data"});
    }
    messages.push(
      {
        id: ++lastId,
        username: body.username,
        content: body.content
      }
    );
    res.end();
  } catch(error) {
    return res.status(500).json({error: "Can't post message: " + error})
  }
})

app.listen(8080, () => console.log("YOOOOO"))