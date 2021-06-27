get_error() {
  var ptr = _futhark_context_get_error(this.ctx);
  var len = HEAP8.subarray(ptr).indexOf(0);
  var str = String.fromCharCode(...HEAP8.subarray(ptr, ptr + len));
  _free(ptr);
  return str;
}