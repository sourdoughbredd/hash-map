import { BucketList } from "./bucketList.js";
export { HashMap };

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
    const bucketList = this.#getBucketList(key);
    const newEntry = bucketList.put(key, value);
    if (newEntry) {
      this.#length += 1;
      this.#checkForResize();
    }
  }

  // Gets the value stored in the provided key
  get(key) {
    if (this.isEmpty()) return null;
    this.#typeCheckKey(key);
    const bucketList = this.#getBucketList(key);
    return bucketList.get(key);
  }

  // Returns true if the key is in the hash map, false otherwise
  has(key) {
    if (this.isEmpty()) return false;
    this.#typeCheckKey(key);
    const bucketList = this.#getBucketList(key);
    return bucketList.contains(key);
  }

  // Removes the key (and it's associated value) from the hash map and returns the value.
  remove(key) {
    if (this.isEmpty()) return null;
    this.#typeCheckKey(key);
    const bucketList = this.#getBucketList(key);
    const value = bucketList.remove(key);
    if (value !== null) this.#length -= 1;
    return value;
  }

  // Returns the number of stored keys in the hash map
  length() {
    return this.#length;
  }

  // Removes all entries in the hash map and resets it to min capacity
  clear() {
    this.#buckets = this.#getFreshBuckets(HashMap.#MIN_CAPACITY);
    this.#length = 0;
  }

  // Returns an array of all the keys in the hash map
  keys() {
    if (this.isEmpty()) return [];
    const keysArray = [];
    for (let bucket of this.#buckets) {
      for (let entry of bucket) {
        keysArray.push(entry.key);
      }
    }
    return keysArray;
  }

  // Returns an array of all the values in the hash map
  values() {
    if (this.isEmpty()) return [];
    const valuesArray = [];
    for (let bucket of this.#buckets) {
      for (let entry of bucket) {
        valuesArray.push(entry.value);
      }
    }
    return valuesArray;
  }

  // Returns an array of entries in the hash map, where an entry is itself an array, consisting of a key-value pair
  entries() {
    if (this.isEmpty()) return [];
    const entriesArray = [];
    for (let bucket of this.#buckets) {
      for (let entry of bucket) {
        entriesArray.push([entry.key, entry.value]);
      }
    }
    return entriesArray;
  }

  // Returns true if this hash map is empty, false otherwise
  isEmpty() {
    return this.length() === 0;
  }

  // toString() for printing
  toString() {
    let str = `Number of Buckets = ${this.#capacity()}, Length = ${this.length()}`;
    if (this.isEmpty()) return str;
    for (let bnum = 0; bnum < this.#capacity(); bnum++) {
      const bl = this.#buckets[bnum];
      if (bl.size() == 0) continue;
      str += `\n ${bnum}: ` + bl.toString();
    }
    return str;
  }

  // PRIVATE METHODS

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

  #getBucketNumber(key) {
    return this.hash(key) % this.#capacity();
  }

  #getBucketList(key) {
    const bucketNum = this.#getBucketNumber(key);
    this.#boundsCheck(bucketNum);
    return this.#buckets[bucketNum];
  }

  #loadFactor() {
    return this.length() / this.#capacity();
  }

  #checkForResize() {
    if (this.#loadFactor() <= HashMap.#MAX_LOAD_FACTOR) return;
    const newCapacity = 2 * this.#capacity();
    const newBuckets = this.#getFreshBuckets(newCapacity);
    // Copy over to new buckets
    for (let bucket of this.#buckets) {
      for (let { key, value } of bucket) {
        const hashCode = this.hash(key);
        const newBucketNum = hashCode % newCapacity;
        const newBucket = newBuckets[newBucketNum];
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
}
