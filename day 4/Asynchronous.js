// Asynchronous means a task can start now and finish later, allowing other tasks to continue running without waiting. It is a non-blocking execution model..

// console.log("Start");

// setTimeout(() => {
//   console.log("Task completed after 3 seconds");
// }, 3000);

// console.log("End");
//login getuser  getorder getorderdetail

function login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("User logged in");
      resolve({ userId: 101 });
    }, 1000);
  });
}

function getUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Get user....");
      resolve({ userId: userId, name: "Ankit" });
    }, 1000);
  });
}

function getOrder(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("getting order");
      resolve({ orderId: 5001 });
    }, 1000);
  });
}

function getOrderDetail(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("get order details");
      resolve({
        orderId: orderId,
        product: "Laptop",
        price: 50000,
      });
    }, 1000);
  });
}

login()
  .then((user) => getUser(user.userId))
  .then((user) => getOrder(user.userId))
  .then((order) => getOrderDetail(order.orderId))
  .then((details) => console.log(details))
  .catch((error) => console.log(error));
