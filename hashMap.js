import { BucketList } from "./bucketList.js";

class HashMap {
  // Static properties
  static #MAX_LOAD_FACTOR = 0.75;
  static #MIN_CAPACITY = 16;

  // Instance properties
  #buckets = this.#getFreshBuckets(HashMap.#MIN_CAPACITY);
  #length = 0;

  // Generates hash code for the string key
  hash(key) {
    this.#typeCheckKey(key);
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  // Places the key-value pair in the HashMap. If the key is already in the map, it is replaced.
  set(key, value) {
    this.#typeCheckKeyValue(key, value);

    // Get hash code for key
    const hashCode = this.hash(key);

    // Convert to bucket number
    const bucketNum = hashCode % this.#capacity();

    // Look in bucket and insert key value pair
    this.#boundsCheck(bucketNum);
    const bucketList = this.#buckets[bucketNum];
    const newEntry = bucketList.put(key, value);

    if (newEntry) {
      this.#length += 1;
      this.#checkForResize();
    }
  }

  // Gets the value stored in the provided key
  get(key) {
    this.#typeCheckKey(key);
  }

  // Returns true if the key is in the hash map, false otherwise
  has(key) {
    this.#typeCheckKey(key);
  }

  // Removes the key (and it's associated value) from the hash map
  remove(key) {
    this.#typeCheckKey(key);
    this.length -= 1;
  }

  // Returns the number of stored keys in the hash map
  length() {
    return this.#length;
  }

  // Removes all entries in the hash map
  clear() {
    this.#buckets = this.#getFreshBuckets();
    this.#length = 0;
  }

  // Returns an array of all the keys in the hash map
  keys() {}

  // Returns an array of all the values in the hash map
  values() {}

  // Returns an array of entries in the hash map, where an entry is itself an array, consisting of a key-value pair
  entries() {}

  // toString() for printing
  toString() {
    let str = `Number of Buckets = ${this.#capacity()}, Length = ${this.length()}`;
    for (let bnum = 0; bnum < this.#capacity(); bnum++) {
      const bl = this.#buckets[bnum];
      if (bl.size() == 0) continue;
      str += `\n ${bnum}: ` + bl.toString();
    }
    return str;
  }

  // PRIVATE METHODS

  // Get new buckets
  #getFreshBuckets(capacity) {
    const buckets = new Array(capacity);
    for (let i = 0; i < buckets.length; i++) {
      buckets[i] = new BucketList();
    }
    return buckets;
  }

  #capacity() {
    return this.#buckets.length;
  }

  #loadFactor() {
    return this.length() / this.#capacity();
  }

  #checkForResize() {
    if (this.#loadFactor() <= HashMap.#MAX_LOAD_FACTOR) return;
    const newCapacity = 2 * this.#capacity();
    const newBuckets = this.#getFreshBuckets(newCapacity);
    for (let bl of this.#buckets) {
      for (let { key, value } of bl) {
        const hashCode = this.hash(key);
        const bucketNum = hashCode % newCapacity;
        const newBucket = newBuckets[bucketNum];
        newBucket.put(key, value);
      }
    }
    this.#buckets = newBuckets;
  }

  // Throws error if key is the wrong type
  #typeCheckKey(key) {
    if (!(typeof key === "string")) {
      throw new Error("Illegal argument! 'key' must be a string!");
    }
  }

  // Throws error if value is the wrong type
  #typeCheckValue(value) {
    if (!(typeof value === "string")) {
      throw new Error("Illegal argument! 'value' must be a string!");
    }
  }

  #typeCheckKeyValue(key, value) {
    this.#typeCheckKey(key);
    this.#typeCheckValue(value);
  }

  #boundsCheck(index) {
    if (index < 0 || index >= this.#capacity()) {
      throw new Error("Trying to access index out of bound");
    }
  }

  // TO DELETE (DEV ONLY)
  get buckets() {
    return this.#buckets;
  }
}

// Tests

// Initial length of backing array is 16
console.log("Checking initialization of empty hash map...");
const hm = new HashMap();
console.log(hm.toString());

// Put some stuff in
console.log("Adding some entries...");
hm.set("one", "uno");
hm.set("two", "dos");
hm.set("three", "tres");
hm.set("four", "cuatro");
hm.set("five", "cinco");
hm.set("six", "says");
console.log(hm.toString());

// Update a key
console.log("Updating key='six'...");
hm.set("six", "seis");
console.log(hm.toString());

// Fill until resize
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
