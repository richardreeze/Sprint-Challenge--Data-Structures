## Questions
1. What are the order of insertions/removals for the following data structures?
   - **Stack** // They embody the LIFO (Last In First Out) property. This means that the element stored in last will be removed first. You know... Like a stack of plates.
   - **Queue** // They embody the FIFO (First In First Out) property. This means that the element stored in first will be removed first. Like a queue in front of an Apple store.
2. What is the retreival time complexity for the following data structures?
   - **Linked List** // O(n)
   - **Hash Table** // O(1)
   - **Binary Search Trees** // O(log(n))
3. What are some advantages to using a Hash Tables over an array in JavaScript?
   // Hash tables retrieval time, O(1), is faster than arrays, O(n).
   // Since a hash table's data is structured into key-value pairs, manipulating it is much easier than with arrays (where you'd have to know the index, yuck).
   // Arrays are generally limited in size, hash tables have no size limit.
   // Hash tables are so complicated to understand, that once you do, you'll develop fond memories for week 1 at Lambda when you were struggling to understand the difference between `null` and `undefined`.
