import { LinkedList } from "./linked-list.js";

class HashMap {
  // Static properties
  static #LOAD_FACTOR = 0.75;
  static #MIN_SIZE = 16;

  // Instance properties
  #buckets = this.#getFreshBuckets();
  #length = 0;

  // Generates hash code for the string key
  hash(key) {
    typeCheck(key);
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }

    return hashCode;
  }

  // Places the key-value pair in the HashMap. If the key is already in the map, it is replaced.
  set(key, value) {
    this.#typeCheckKeyValue(key, value);
    this.#length += 1;
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

  // PRIVATE METHODS

  // Get new buckets
  #getFreshBuckets() {
    return new Array(HashMap.#MIN_SIZE).fill(new LinkedList());
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
    if (index < 0 || index >= this.#buckets.length) {
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
const hm = new HashMap();
console.log(hm.buckets.length);

// Initial length of map is 0
console.log(hm.length());
