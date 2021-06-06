let main (n : i64) : i64 = 
   let arr = scan (+) 0 (iota n)
   in arr[n-1]


