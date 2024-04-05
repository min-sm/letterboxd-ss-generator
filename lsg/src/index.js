"use strict";
alert("Hello world!");
console.log("Hello world!");
document.querySelector("button").addEventListener("click", () => {
  console.log(`${document.querySelector("input").value}`);
});
