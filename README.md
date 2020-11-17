# "Median maintenance" algorithm

This algorithm is an example of a less obvious application of heaps data structures. In this problem, you are presented with a sequence of numbers, one by one; assume for simplicity that they are distinct. Each time you receive a new number, your responsibility is to reply with the
median element of all the numbers you’ve seen thus far.

One approach for this problem would be to recompute the median from scratch in every iteration, but computing the median of a length-n array requires _O_(_n_) time, so this solution requires _O_(_i_) time in each round _i_. Alternatively, we could keep the elements seen so far in a sorted array, so that it's easy to compute the median element in constant time. The drawback is that updating the sorted array when a new number arrives requires linear time (_O_(_n_)).

## Solution using heaps

Using heaps, we can do better and solve the median maintenance problem in just _logarithmic_ time per round. The key idea is to maintain two heaps that will be balanced and store each one half of the elements. The heaps will grant access to the highest element of the heap that contains the lower values and to the lowest element of the heap that contains the higher elements, with running time of _O_(log*i*) for the heap operations.

> More information about this solution can be found in the book [Algorithms Illuminated Part 2, by Tim Roughgarden](http://algorithmsilluminated.org).
