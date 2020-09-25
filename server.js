const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const shortid = require("shortid");
var cors = require("cors");
const firestoreOperations = require("./firestoreOperations");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  firestoreOperations.fetchAll().then((snapshot) => {
    const formatSnapshot = snapshot.docs.map((doc) => {
      const singleSnap = {
        fullUrl: doc.data().fullUrl,
        shortUrl: doc.data().shortUrl,
      };
      return singleSnap;
    });
    res.send({
      data: formatSnapshot,
      totalRecords: formatSnapshot.length,
    });
  });
});

app.post("/createShortUrl", async (req, res) => {
  const { fullUrl } = req.body;
  const shortUrl = shortid.generate();
  const newRecord = {
    fullUrl,
    shortUrl,
  };
  firestoreOperations.saveRecord(newRecord).then(() => res.send(newRecord));
});

app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  if (shortUrl === "favicon.ico") return res.send("");
  firestoreOperations.fetchOne(shortUrl).then((doc) => {
    const { fullUrl } = doc.data();
    res.redirect(fullUrl);
  });
});

app.listen(PORT, () => {
  console.log("Server is running at PORT ", PORT);
});
