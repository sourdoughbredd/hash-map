import { HashMap } from "./hashMap.js";

// Tests

// Initial length of backing array is 16
console.log("TESTING INITIALIZATION...");
const hm = new HashMap();
console.log(hm.toString());
console.log("isEmpty() returns " + hm.isEmpty());
console.log();
// Put some stuff in
console.log("TESTING PUT() WITH A NEW KEY...");
console.log("Adding some entries...");
hm.set("one", "uno");
hm.set("two", "dos");
hm.set("three", "tres");
hm.set("four", "cuatro");
hm.set("five", "cinco");
hm.set("six", "says");
console.log(hm.toString());
console.log("isEmpty() returns " + hm.isEmpty());
console.log();

// Update a key
console.log("TESTING PUT() WITH AN EXISTING KEY...");
console.log("Updating key='six'...");
hm.set("six", "seis");
console.log(hm.toString());
console.log();

// Fill until resize
console.log("TESTING RESIZING...");
console.log("Filling until resize...");
let i = 7;
while (hm.length() < 0.75 * 16) {
  hm.set(i.toString(), i.toString());
  i++;
}
console.log("BEFORE RESIZE:");
console.log(hm.toString());
console.log("AFTER RESIZE:");
hm.set(i.toString(), i.toString());
console.log(hm.toString());
console.log();

// Reset
console.log("TESTING CLEAR() AND RESETTING MAP...");
console.log("Clearing hash map using clear()...");
hm.clear();
console.log(hm.toString());
console.log("isEmpty() returns " + hm.isEmpty());

console.log("Adding some entries...");
hm.set("one", "uno");
hm.set("two", "dos");
hm.set("three", "tres");
hm.set("four", "cuatro");
hm.set("five", "cinco");
hm.set("six", "seis");
console.log(hm.toString());
console.log();

// Get
console.log("TESTING GET()...");
console.log("get('six') returns " + hm.get("six"));
console.log("get('one') returns " + hm.get("one"));
console.log("get('eighty-two') returns " + hm.get("eighty-two"));
console.log("Make sure map is unchanged...");
console.log(hm.toString());
console.log();

// Has
console.log("TESTING HAS()...");
console.log("has('six') returns " + hm.has("six"));
console.log("has('one') returns " + hm.has("one"));
console.log("has('eighty-two') returns " + hm.has("eighty-two"));
console.log();

// Remove
console.log("TESTING REMOVE()...");
console.log("remove('one') returns " + hm.remove("one"));
console.log(hm.toString());
console.log("remove('three') returns " + hm.remove("three"));
console.log(hm.toString());
console.log(
  "adding ('three', 'tres') back to make sure it goes to same spot..."
);
hm.set("three", "tres");
console.log(hm.toString());
console.log("remove('one-hundred') returns " + hm.remove("one-hundred"));
console.log(hm.toString());
console.log();
