const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("resolved data")
  }, 3000)
})
// when it is resolved or rejected, it can never be resolved or rejected again

promise.then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
})

// promise.then((data) => {
//   console.log(data)
// },(error) => {
//   console.log(error)
// }) でも可