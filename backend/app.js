const jsonServer = require("json-server");
const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const { v4: uuidv4 } = require("uuid");


app.use(jsonServer.bodyParser);
app.use(middlewares);

app.use(async (req, res, next) => {
if (req.method === "POST") {
    try {
      req.body.id = uuidv4();
      next();
    } catch (error) {
      res.status(500).json({
        message: "Server error",
      });
    }
  } else {
    next();
  }
});

app.use(router);

app.listen(5001, () => {
  console.log("JSON Server is running");
});
