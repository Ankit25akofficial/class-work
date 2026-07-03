// Synchronous means tasks are executed one after another, and each task must finish before the next task starts. It is a blocking execution model..

function task1() {
  console.log("Task 1 completed");
}

function task2() {
  console.log("Task 2 completed");
}

function task3() {
  console.log("Task 3 completed");
}
function task4() {
  console.log("Task 4 completed");
}
task1();
task2();
task3();
task4();
