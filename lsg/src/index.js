"use strict";
console.log("Hello world!");
document.querySelector("button").addEventListener("click", () => {
  console.log(`${document.querySelector("input").value}`);
});
