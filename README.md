# README for HashMap Project

## Introduction

This project implements a custom HashMap class in JavaScript, providing an associative array data structure, allowing for the storage and retrieval of key-value pairs. The implementation ensures efficient operations by utilizing hashing for key distribution and a BucketList for handling hash collisions. It's important to note that this version of HashMap was specifically designed for and tested with string type keys and values. The class dynamically increases the size of the backing array to accommodate more entries as needed, but it does not reduce the array size when items are removed. While this approach simplifies the design and can improve performance during additions, it may lead to higher memory consumption when many items are deleted, particularly in scenarios with non-string data types.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Reference](#api-reference)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)

## Installation

Include `hashMap.js` and `bucketList.js` in your project directory. Import the `HashMap` class in your JavaScript files as needed.

```javascript
import { HashMap } from "./path/to/hashMap.js";
```

## Usage

Instantiate the `HashMap` class and use its methods to interact with the hash map.

```javascript
const hashMap = new HashMap();
hashMap.set("key", "value");
const value = hashMap.get("key");
```

## Features

- Efficient key-value storage and retrieval (strings only)
- Collision handling with `BucketList`
- Methods for common hash map functionalities (set, get, remove, etc.)

## API Reference

### `HashMap` Class

- `hash(key)`: Generates a hash code for the given key.
- `set(key, value)`: Associates the specified value with the specified key in the map.
- `get(key)`: Returns the value to which the specified key is mapped, or `undefined` if this map contains no mapping for the key.
- `has(key)`: Returns a boolean indicating whether a key-value pair with the specified key exists in the map.
- `remove(key)`: Removes the key-value pair associated with the specified key if it exists.
- `length()`: Returns the number of key-value pairs currently in the map.
- `clear()`: Clears all key-value pairs from the map.
- `keys()`: Returns an array of all keys in the map.
- `values()`: Returns an array of all values in the map.
- `entries()`: Returns an array of all entries (key-value pairs) in the map.
- `isEmpty()`: Returns a boolean indicating whether the map is empty.
- `toString()`: Returns a string representation of the map.

## Dependencies

No external dependencies. Ensure that both `hashMap.js` and `bucketList.js` are included in your project.

## Configuration

No additional configuration is needed.

## Examples

Refer to `hashMapTests.js` for examples of how to use the `HashMap` class, including initialization, adding entries, and checking for key existence.

## Troubleshooting

Ensure all files are correctly imported and that the correct path to `hashMap.js` and `bucketList.js` is specified.

## Contributors

Created and maintained by Brett Bussell.
