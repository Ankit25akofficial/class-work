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

// //login
// function login() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Login Successful");
//     }, 1000);
//   });
// }

// function getUser() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ id: 101, name: "Ankit" });
//     }, 1000);
//   });
// }

// function getOrders(userId) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(["Laptop", "Phone"]);
//     }, 1000);
//   });
// }

// login()
//   .then((message) => {
//     console.log(message);
//     return getUser();
//   })
//   .then((user) => {
//     console.log(user);
//     return getOrders(user.id);
//   })
//   .then((orders) => {
//     console.log(orders);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log("Finished");
//   });

function getProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true; // Change to false to test reject

      if (success) {
        resolve([
          { id: 1, name: "Laptop", categoryId: 101 },
          { id: 2, name: "Phone", categoryId: 102 },
        ]);
      } else {
        reject("Failed to fetch products");
      }
    }, 1000);
  });
}

function getCategory(categoryId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true; // Change to false to test reject

      if (success) {
        resolve({
          id: categoryId,
          name: "Electronics",
        });
      } else {
        reject("Category not found");
      }
    }, 1000);
  });
}

function getOffers(categoryId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true; // Change to false to test reject

      if (success) {
        resolve(["10% OFF", "Free Delivery", "Extra ₹1000 Cashback"]);
      } else {
        reject("No offers available");
      }
    }, 1000);
  });
}

getProducts()
  .then((products) => {
    console.log("Products:", products);
    return getCategory(products[0].categoryId);
  })
  .then((category) => {
    console.log("Category:", category);
    return getOffers(category.id);
  })
  .then((offers) => {
    console.log("Offers:", offers);
  })
  .catch((error) => {
    console.log("Error:", error);
  })
  .finally(() => {
    console.log("Finished");
  });
