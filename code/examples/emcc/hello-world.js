var load_module = require("./concat.js");
load_module().then((instance) => {
  var hello = "hello ";
  var alen = hello.length;
  var a = instance._malloc(alen + 1);
  new TextEncoder().encodeInto(hello, instance.HEAPU8.subarray(a, a + alen)); 
  var world = "world!";
  var blen = world.length;
  var b = instance._malloc(blen + 1);
  new TextEncoder().encodeInto(world, instance.HEAPU8.subarray(b, b + blen));
  var c = instance._concat(a, b);
  var cend = instance.HEAPU8.indexOf(0, c);
  console.log(new TextDecoder().decode(instance.HEAPU8.subarray(c, cend)));
  instance._free(c);
  instance._free(b);
  instance._free(a);
})
