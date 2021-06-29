tuple(in0, in1, in2, in3, in4) {
  var out = [1, 8, 4, 4].map(n => _malloc(n));
  var to_free = [];
  var do_free = () => { out.forEach(_free); to_free.forEach(f => f.free()); };
  if (in4 instanceof Array) {
    in4 = this.new_f32_2d_from_jsarray(in4); to_free.push(in4);
  }
  if (_futhark_entry_tuple(this.ctx, ...out, in0, in1, in2, in3, in4.ptr) > 0) {
    do_free();
    throw this.get_error();
  }
  var result0 = HEAP8[out[0] >> 0]!==0;
  var result1 = HEAPF64[out[1] >> 3];
  var result2 = new FutharkOpaque(this.ctx, HEAP32[out[2] >> 2],
                                  _futhark_free_opaque_8021f38c);
  var result3 = this.new_f32_1d_from_ptr(HEAP32[out[3] >> 2]);
  do_free();
  return [result0, result1, result2, result3];
}
