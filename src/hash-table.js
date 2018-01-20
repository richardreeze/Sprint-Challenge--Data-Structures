/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');
const { LinkedList } = require('./linked-list');

//  DONE - Step 1: Create a LinkedList file
//  DONE - Step 2: Connect that LinkedList to hash-table.js
//  Step 3: `remove()` should use your LinkedList
//  Step 4: `retrieve()` should use your LinkedList
//  Step 5: `capacityIsFull()` should use your LinkedList
//  Step 6: `insert()` should use your LinkedList
//  Step 7: `resize()` should use your LinkedList

// THE ACTUAL HASH TABLE IS A LIMITED ARRAY
// THE BUCKETS ARE LINKED LISTS
// THE KEY VALUE PAIRS ARE ARRAYS

// What they use (start by solving the functions that don't use other functions)
// resize(): insert()
// capacityIsFull():
// insert(): capacityIsFull(), resize()
// remove():
// retrieve();

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  resize() { // *note* Resizes the hash table
    this.limit *= 2; // *note* This is doubling the capacity of the hash table
    const oldStorage = this.storage; // *note* Assigns the old storage unto a random value so you can pass its content unto the new, bigger array
    this.storage = new LimitedArray(this.limit); // *note*  this.storage gets reassigned to a new, bigger array (twice as big)
    oldStorage.each((bucket) => { // *note* This will loop through every element (bucket) in the array
      if (!bucket) return; // *note* if the array is empty, that's that (all you did mas double the hash table's capacity)
      bucket.forEach((pair) => { // *note* if you found a bucket, loop through every pair inside of it.
        this.insert(pair[0], pair[1]); // *note* this will insert whatever you found into the new big array you have.
      });
    });
  }

  capacityIsFull() {
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index) || [];

    bucket = bucket.filter(item => item[0] !== key);
    bucket.push([key, value]);
    this.storage.set(index, bucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) { // This goes into the hash table and removes the key-value pair. We are writing the key we want.
    const index = getIndexBelowMax(key.toString(), this.limit); // This takes the key and puts it through the hash function so it will give us the bucket's index.
    let bucket = this.storage.get(index); // Here we are using the index to find the bucket and assigning it to a let variable.

    if (bucket) { // If there is a value for our bucket
      bucket = bucket.filter(item => item[0] !== key); // This gives a new value to bucket which will be everything it has minus the key we don't want
      this.storage.set(index, bucket); // This will set our new bucket in the same index location as the old one.
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    let retrieved;
    if (bucket) {
      retrieved = bucket.filter(item => item[0] === key)[0];
    }
  }
}

module.exports = HashTable;
