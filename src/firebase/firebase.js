import * as firebase from "firebase"
// *as takes all of the named exports from firebase and dumps them on a brand new variable, firebase

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  // measurementId: "G-135K1KV1QD"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const database = firebase.database()

export { firebase, database as default }

// // child_removed
// database.ref("expenses").on("child_removed", (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })

// // child_changed
// database.ref("expenses").on("child_changed", (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })

// // child_added
// database.ref("expenses").on("child_added", (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })

// database.ref("expenses").on("value", (snapshot) => {
//   const expenses = []

//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })

//   console.log(expenses)
// })

// database.ref("expenses").once("value").then((snapshot) => {
//   const expenses = []
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })
// })

// database.ref("expenses").push({
//   description: "Gum",
//   note: "",
//   amount: 195,
//   createdAt: 0
// })

// database.ref("notes").push({
//   title: "To Do",
//   body: "Go for a run"
// })

// const onValueChange = database.ref().on("value", (snapshot) => {
//   console.log(snapshot.val())
// }, (error) => {
//   console.log("Error with data fetching", error)
// })
// subscribe reference
// callback function を返す

// setTimeout(() => {
//   database.ref().off(onValueChange)
// }, 7000)

// database.ref().set({
//   name: "Yuki Uehara",
//   age: 22,
//   stressLevel: 6,
//   job: {
//     title: "student",
//     company: "SELF"
//   },
//   location: {
//     city: "Uto",
//     country: "Japan"
//   }
// }).then(() => {
//   console.log("Data is saved")
// }).catch((e) => {
//   console.log(e)
// })
// ref() gives us a reference to a specific part of our database
// if we don't pass anything in, we are getting a reference to the root of the database
// set() はオブジェクトでなくとも、例えば string でも渡せる
// set() completely wipe the original reference value and set it equal to the new value

// database.ref("age").set(40)
// age だけを 40 に変える

// database.ref("isSingle")
// .remove()
// .then(() => {
//   console.log("Remove succeeded")
// }).catch((e) => {
//   console.log("Remove failed:", e)
// })
// database.ref("isSingle").set(null)
// Passing null for the new value is equivalent to calling remove()
// but remove() is more explicit

// database.ref().update({
//   stressLevel: 9,
//   "job/company": "Amazon",
//   "location/city": "Seattle"
// })