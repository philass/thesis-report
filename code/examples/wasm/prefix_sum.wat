 (module
   (import "env" "memory" (memory $memory 1))
   (export "prefixSum" (func $prefixSum))
   (func $prefixSum (param $size i32)
     (local $offs i32)
     (local $acc i32)
     (local $last i32)
     (local.set $offs (i32.const 4))
     (local.set $last (i32.mul (local.get $size) (i32.const 4)))
     (local.set $acc (i32.load (i32.const 0)))
     loop $forloop
       (local.set $acc (i32.add (local.get $acc) (i32.load (local.get $offs))))
       (i32.store (local.get $offs) (local.get $acc))
       (local.set $offs (i32.add (local.get $offs) (i32.const 4)))
       (br_if $forloop (i32.ne (local.get $offs) (local.get $last)))
     end $forloop
   )
 )