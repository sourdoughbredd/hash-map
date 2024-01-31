export { LinkedList };

class Node {
  value = null;
  next = null;

  constructor(value = null, next = null) {
    this.value = value;
    if (next != null && !(next instanceof Node)) {
      throw new Error("The 'next' parameter must be a Node!");
    }
    this.next = next;
  }
}

class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  // Runs in O(1) time
  append(value) {
    if (this.isEmpty()) {
      this.#head = new Node(value);
      this.#tail = this.#head;
    } else {
      this.#tail.next = new Node(value);
      this.#tail = this.#tail.next;
    }
    this.#size += 1;
  }

  // Runs in O(1) time
  prepend(value) {
    if (this.isEmpty()) {
      this.#head = new Node(value);
      this.#tail = this.#head;
    } else {
      this.#head = new Node(value, this.#head);
    }
    this.#size += 1;
  }

  // Runs in O(1) time
  size() {
    return this.#size;
  }

  // Runs in O(1) time
  head() {
    return this.#head;
  }

  // Runs in O(1) time
  tail() {
    return this.#tail;
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
    return currNode;
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
    return last;
  }

  // Runs in O(n)
  contains(value) {
    if (this.isEmpty()) return false;
    let currNode = this.#head;
    while (currNode != null) {
      if (currNode.value == value) return true;
      currNode = currNode.next;
    }
    return false;
  }

  // Runs in O(n)
  find(value) {
    if (this.isEmpty()) return null;
    let currNode = this.#head;
    let currIdx = 0;
    while (currNode != null) {
      if (currNode.value == value) {
        return currIdx;
      }
      currNode = currNode.next;
      currIdx += 1;
    }
    // If we reached here, we didn't find it
    return null;
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
      str += currNode.value;
    }
    str += str == "" ? "null" : " -> null";
    return str;
  }

  report() {
    // Print list
    console.log(this.toString());
    // Print properties
    console.log(
      `Size: ${this.size()}, Head: ${this.#head && this.#head.value}, Tail: ${
        this.#tail && this.#tail.value
      }`
    );
  }
}

// const ll = new LinkedList();
// ll.append(1);
// ll.append(2);
// ll.prepend(0);
// ll.append(3);
// ll.report();
// console.log(ll.find(0));
// console.log(ll.find(1));
// console.log(ll.find(3));
// console.log(ll.find(4));
