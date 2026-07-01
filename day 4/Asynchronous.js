// Asynchronous means a task can start now and finish later, allowing other tasks to continue running without waiting. It is a non-blocking execution model..

console.log("Start");

setTimeout(() => {
  console.log("Task completed after 3 seconds");
}, 3000);

console.log("End");
