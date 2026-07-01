// const dog = "s";

// function logDog() {
//   const dogs = "q";
//   console.log(dogs);
// }

// function go() {
//   const dog = "a";
//   logDog();
//   console.log(dog);
// }

// go();

//hosting

// sayHi();

// function sayHi() {
//   console.log("hey!");
// }

// sayHi();

// function sayHi() {
//   console.log("hey!");
//   console.log(add(10, 2));
// }

// function add(a, b) {
//   return a + b;
// }

// function outer() {
//   const outerVar = "Hey I am the outer Var";

//   function inner() {
//     const innerVar = "hey I am an inner var";
//     console.log(innerVar);
//     console.log(outerVar);
//   }

//   inner();
// }

// outer();

//inner outer

function outer() {
  const outerVar = "Hey I am the outer Var";

  function inner() {
    const innerVar = "hey I am an inner var";
    console.log(innerVar);
    console.log(outerVar);
  }

  return inner;
}

outer();
