export { BucketList };

class Node {
  key = null;
  value = null;
  next = null;

  constructor(key = null, value = null, next = null) {
    this.key = key;
    if (next != null && !(next instanceof Node)) {
      throw new Error("The 'next' parameter must be a Node!");
    }
    this.value = value;
    this.next = next;
  }
}

class BucketList {
  #head = null;
  #tail = null;
  #size = 0;

  // Puts the key value pair in the list
  // Runs in O(N) time
  put(key, value) {
    if (this.isEmpty()) {
      this.#head = new Node(key, value);
      this.#tail = this.#head;
    } else {
      // Look for key and replace or add new
      let currNode = this.#head;
      while (currNode != null) {
        if (currNode.key === key) {
          // Found matching key, replace value and don't increment size
          currNode.value = value;
          return false;
        }
        currNode = currNode.next;
      }
      // If we reach here, we didn't find the key. Add it!
      this.#tail.next = new Node(key, value);
      this.#tail = this.#tail.next;
    }
    this.#size += 1;
    return true;
  }

  // Runs in O(1) time
  size() {
    return this.#size;
  }

  // Runs in O(n)
  contains(key) {
    if (this.isEmpty()) return false;
    let currNode = this.#head;
    while (currNode != null) {
      if (currNode.key === key) return true;
      currNode = currNode.next;
    }
    return false;
  }

  // If the key is found in the list, removes the key-value pair and returns true. Otherwise, returns false.
  remove(key) {
    if (this.isEmpty()) return false;
    let currNode = this.#head;
    let prevNode = null;
    while (currNode != null) {
      if (currNode.key === key) {
        // Remove this node
        if (currNode === this.#head) {
          this.#head = this.#head.next;
        } else {
          prevNode.next = currNode.next;
        }
        if (currNode === this.#tail) {
          this.#tail = prevNode;
        }
        this.#size -= 1;
        return true;
      }
      prevNode = currNode;
      currNode = currNode.next;
    }
    return false;
  }

  // Runs in O(1)
  isEmpty() {
    return this.#size == 0;
  }

  // Generates string representation of linked list.
  // Runs in O(n) time and with O(1) space.
  toString() {
    let str = "";
    for (
      let currNode = this.#head;
      currNode != null;
      currNode = currNode.next
    ) {
      if (str !== "") {
        str += " -> ";
      }
      str += `[${currNode.key}, ${currNode.value}]`;
    }
    str += str == "" ? "null" : " -> null";
    return str;
  }

  report() {
    // Print list
    console.log(this.toString());
    // Print properties
    console.log(
      `Size: ${this.size()}, Head Key: ${
        this.#head && this.#head.key
      }, Tail Key: ${this.#tail && this.#tail.key}`
    );
  }

  // The Symbol.iterator method
  [Symbol.iterator]() {
    let current = this.#head; // Start with the first element
    return {
      // Implementation of the next() method
      next() {
        if (current) {
          // Store the value
          let result = {
            value: { key: current.key, value: current.value },
            done: false,
          };
          // Move to the next node
          current = current.next;
          // Return the current data
          return result;
        } else {
          // If no more elements, indicate completion
          return { done: true };
        }
      },
    };
  }
}

const bl = new BucketList();
bl.put(1, "one");
bl.put(2, "two");
bl.put(0, "zero");
bl.put(3, "three");
bl.report();
bl.remove(0);
bl.report();
bl.remove(3);
bl.report();
bl.remove(2);
bl.report();
bl.remove(1);
bl.report();

// Test Iterator
console.log("Resetting list...");
bl.put(1, "one");
bl.put(2, "two");
bl.put(0, "zero");
bl.put(3, "three");
bl.report();
console.log("testing iterator...");
for (let entry of bl) {
  console.log(entry);
}

// Test put
console.log("testing put() for keys that already exist...");
bl.put(1, "ONE");
bl.report();
