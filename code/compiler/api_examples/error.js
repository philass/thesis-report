get_error() {
  var ptr = _futhark_context_get_error(this.ctx);
  var end = HEAP8.indexOf(0, ptr);
  var str = String.fromCharCode(...HEAP8.subarray(ptr, end));
  _free(ptr);
  return str;
}