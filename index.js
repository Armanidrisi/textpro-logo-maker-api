const express = require("express");
const thiccysapi = require("textmaker-thiccy");
const bodyParser = require("body-parser");
const cors = require("cors");
/*Initialize Express App*/
const app = express();

/*Middlewars*/
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

/*Routing Endpoints*/

/*Default Homepage Route*/
app.get("/", (req, res) => {
  res.json({
    status: false,
    data: "This Is Not Valid Endpoint Send Post Request To /create",
  });
});

/*Post Route For / */
app.post("/", (req, res) => {
  res.json({
    status: false,
    data: "This Is Not Valid Endpoint Send Post Request To /create",
  });
});

/*Route For Create Logo*/
app.post("/create", async function (req, res) {
  
  /*Getting Data From Post Request Body*/
  let theme = req.body.theme; //Theme Of Logo
  let name = req.body.text; //Text Of Logo
  if (theme != undefined && name != undefined) {
    try {
      data = await thiccysapi.textpro(theme, [name]);
      if (data) {
        res.status(200).json({
          status: true,
          data,
        });
      } else {
        res.status(400).json({
          status: false,
          data: "Internal Server Error",
        });
      }
    } catch (e) {
      res.status(400).json({
        status: false,
        data: "Internal Server Error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      data: "Parameters Missing",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 // console.log(`Server listening on port ${PORT}`);
});
