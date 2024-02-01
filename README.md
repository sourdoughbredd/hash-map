# Hash-Map

## Introduction

Hash-Map is a custom implementation of a hash map data structure, specifically designed for storing strings. This project provides an efficient way to store and retrieve key-value pairs, ensuring fast access through hashing.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [HashMap](#hashmap)
  - [BucketList](#bucketlist)
- [Contributors](#contributors)

## Installation

To use the Hash-Map in your project, simply include the `hashMap.js` and `bucketList.js` files in your project directory and ensure they are correctly imported.

```javascript
import { HashMap } from "./hashMap.js";
```

## Usage

Here's how you can create a hash map and start using it to store your data:

```javascript
// Importing the HashMap class
import { HashMap } from "./hashMap.js";

// Creating a new HashMap instance
const hashMap = new HashMap();

// Adding key-value pairs to the hash map
hashMap.set("one", "uno");
hashMap.set("two", "dos");
hashMap.set("three", "tres");

// Retrieving a value by key
const value = hashMap.get("two"); // returns 'dos'
```

## API Reference

### HashMap

The `HashMap` class provides the following methods:

- `set(key, value)`: Inserts a key-value pair into the hash map. If the key already exists, the value is updated.
- `get(key)`: Retrieves the value associated with the given key. Returns `null` if the key does not exist.
- `remove(key)`: Removes the key-value pair associated with the given key from the hash map.
- `contains(key)`: Checks if the hash map contains the given key. Returns `true` if the key exists, `false` otherwise.
- `isEmpty()`: Checks if the hash map is empty. Returns `true` if empty, `false` otherwise.
- `size()`: Returns the number of key-value pairs in the hash map.

### BucketList

The `BucketList` class is used internally by the `HashMap` class for collision handling and is not intended for external use.

## Contributors

This project is developed and maintained by [Brett Bussell](#).
