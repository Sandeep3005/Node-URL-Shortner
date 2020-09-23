const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');


const fireStoreSetup = () => {
  //initialize admin SDK using serciceAcountKey
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  return admin.firestore();
}

module.exports = fireStoreSetup;

/**
  <!-- <%- include("partials/table.ejs", {records: records}) %>
    <% records.forEach((rec) => {%>
     <div><%= rec.data().fullUrl%></div> -->
    <%})%> -->

        <% records.forEach((rec) => {%>
    <%- include("partials/tableLine.ejs", {rec: rec}) %>
    <%})%>
 */