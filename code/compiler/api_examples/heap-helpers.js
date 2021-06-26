function viewHeap(ptr, array_type, length) {
  return new array_type(Module.HEAPU8.buffer, ptr, length);
}

function copyToHeap(ta) {
  var bytes = new Uint8Array(ta.buffer, ta.byteOffset, ta.byteLength);
  var ptr = _malloc(bytes.length);
  Module.HEAPU8.set(bytes, ptr);
  return ptr;
}