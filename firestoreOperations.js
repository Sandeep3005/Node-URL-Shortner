const fireStoreSetup = require('./firestore.js');
const ALL_URL_COLLECTION = 'all_urls';
const firestoreDB = fireStoreSetup();
const fireStoreAllUrlCollection = firestoreDB.collection(ALL_URL_COLLECTION);

const fetchAll = () => {
  // return fireStoreAllUrlCollection.where("fullUrl", "==", "www.youtube.com").get();
  return fireStoreAllUrlCollection.get();
}

const saveRecord = (urlRecord) => {
  return fireStoreAllUrlCollection.doc(urlRecord.shortUrl).set({
    fullUrl: urlRecord.fullUrl,
    shortUrl: urlRecord.shortUrl || 'Short_Url'
  });
}

const fetchOne = (shortUrl) => {
  return fireStoreAllUrlCollection.doc(shortUrl).get();
}

const fetchOneByOrder = (field, sortOrder) => {
  return fireStoreAllUrlCollection.orderBy(field, sortOrder).get();
}
// firestoreDB.collection('all_urls').get().then((snapshot) => {
//   let docs = snapshot.docs;
//   console.log(docs)
//   docs.forEach((doc) => {
//     const selectedItem = {
//       id: doc.id,
//       item: doc.data().fullUrl
//     };
//     console.log(selectedItem)
//   });
// });


//   .then(() => { res.redirect("/"); })
//   .catch(() => { });

// firestoreDB.collection('all_urls').onSnapshot(snapshot => {
//   let changes = snapshot.docChanges();
//   changes.forEach((change) => {
//     console.log("==>", change.doc.data());
//   });
// });

module.exports = {
  fetchAll: fetchAll,
  saveRecord: saveRecord,
  fetchOne: fetchOne,
  fetchOneByOrder,
};