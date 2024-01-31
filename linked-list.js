export { LinkedList };

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

class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  // Runs in O(1) time
  append(key, value) {
    if (this.isEmpty()) {
      this.#head = new Node(key, value);
      this.#tail = this.#head;
    } else {
      this.#tail.next = new Node(key, value);
      this.#tail = this.#tail.next;
    }
    this.#size += 1;
  }

  // Runs in O(1) time
  prepend(key, value) {
    if (this.isEmpty()) {
      this.#head = new Node(key, value);
      this.#tail = this.#head;
    } else {
      this.#head = new Node(key, value, this.#head);
    }
    this.#size += 1;
  }

  // Runs in O(1) time
  size() {
    return this.#size;
  }

  // Runs in O(1) time
  head() {
    return {
      key: this.#head.key,
      value: this.#head.value,
    };
  }

  // Runs in O(1) time
  tail() {
    return {
      key: this.#tail.key,
      value: this.#tail.value,
    };
  }

  // Runs in O(n) time
  at(index) {
    // Input check
    if (index < 0 || index > this.#size - 1 || !Number.isInteger(index)) {
      throw new Error(
        `Index (${index}) out of bounds (list size = ${
          this.#size
        }) or is not an integer!`
      );
    }
    // Handle empty list
    if (this.isEmpty()) return null;
    // Handle non-empty list
    let currNode = this.#head;
    while (index > 0) {
      currNode = currNode.next;
      index -= 1;
    }
    return {
      key: currNode.key,
      value: currNode.value,
    };
  }

  // Runs in O(n)
  pop() {
    if (this.isEmpty()) return null;
    if (this.#size == 1) {
      const last = this.#head;
      this.#head = null;
      this.#tail = null;
      this.#size = 0;
      return last;
    }
    // Size bigger than 1
    let currNode = this.#head;
    while (currNode.next.next != null) {
      currNode = currNode.next;
    }
    const last = currNode.next;
    currNode.next = null;
    this.#tail = currNode;
    this.#size -= 1;
    return {
      key: last.key,
      value: last.value,
    };
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

  // Runs in O(n)
  find(key) {
    if (this.isEmpty()) return null;
    let currNode = this.#head;
    let currIdx = 0;
    while (currNode != null) {
      if (currNode.key === key) {
        return currIdx;
      }
      currNode = currNode.next;
      currIdx += 1;
    }
    // If we reached here, we didn't find it
    return null;
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
}

const ll = new LinkedList();
ll.append(1, "one");
ll.append(2, "two");
ll.prepend(0, "zero");
ll.append(3, "three");
ll.report();
console.log(ll.find(0));
console.log(ll.find(1));
console.log(ll.find(3));
console.log(ll.find(4));
ll.remove(0);
ll.report();
ll.remove(3);
ll.report();
ll.remove(2);
ll.report();
ll.remove(1);
ll.report();
