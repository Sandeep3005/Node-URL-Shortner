const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const shortid = require('shortid');
const firestoreOperations = require('./firestoreOperations');

const app = express();
const PORT = process.env.PORT || 5000;
const allRecords = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  firestoreOperations.fetchAll().then((snapshot) => {
    res.render("index", {
      records: snapshot.docs, sort: 1
    });
  });
});

app.post("/shortUrl", async (req, res) => {
  console.log(req.body)
  const { fullUrl } = req.body;
  const newRecord = {
    fullUrl,
    shortUrl: shortid.generate(),
  }
  firestoreOperations.saveRecord(newRecord).then(() => res.redirect("/"));
});

app.post("/filter/", async (req, res) => {
  const { value } = req.params;
  const x = snapshot.docs.filter((rec) => {
    console.log(rec.data());
    if (rec.data().fullUrl.includes(value)) {
      console.log("record is ", rec.data().fullUrl)
      return rec;
    }
  });
  // console.log("x === ", x);
  x.forEach((x1) => console.log(x1.data().fullUrl));
  res.render("index", {
    records: x, sort: 1
  });
});

app.get("/sort/:sortField/:order", async (req, res) => {
  console.log(req.params);
  const { sortField, order } = req.params;
  const fetchOrder = order == 1 ? "asc" : "desc";

  firestoreOperations.fetchOneByOrder(sortField, fetchOrder).then((snapshot) => {
    res.render("index", { records: snapshot.docs, sort: order });
  });
});

app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  if (shortUrl === 'favicon.ico') return res.send("");
  firestoreOperations.fetchOne(shortUrl).then((doc) => {
    const { fullUrl } = doc.data();
    const redirectUrl = `${fullUrl}`;
    res.redirect(redirectUrl);
  });
});

app.listen(PORT, () => {
  console.log("Server is running at PORT ", PORT);
});