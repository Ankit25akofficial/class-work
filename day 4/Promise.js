// A Promise is used to handle asynchronous operations. It promises to return a result later, either successfully or with an error....

// function downloadFile() {
//   return new Promise((resolve) => {
//     console.log("Downloading file...");

//     setTimeout(() => {
//       resolve("Download completed");
//     }, 2000);
//   });
// }

// downloadFile().then((message) => {
//   console.log(message);
// });

//login
function login() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Login Successful");
    }, 1000);
  });
}

function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 101, name: "Ankit" });
    }, 1000);
  });
}

function getOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Laptop", "Phone"]);
    }, 1000);
  });
}

login()
  .then((message) => {
    console.log(message);
    return getUser();
  })
  .then((user) => {
    console.log(user);
    return getOrders(user.id);
  })
  .then((orders) => {
    console.log(orders);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Finished");
  });
