class FutharkContext {
  constructor() { ... }
  free() { ... }
  new_f32_2d_from_jsarray(array2d) {
    return this.new_f32_2d(array2d.flat(), array2d.length, array2d[0].length);
  }
  new_f32_2d(array, d0, d1) {
    console.assert(array.length === d0*d1);
    var copy = _malloc(array.length << 2);
    HEAPF32.set(array, copy >> 2);
    var ptr = _futhark_new_f32_2d(this.ctx, copy, BigInt(d0), BigInt(d1));
    _free(copy);
    return this.new_f32_2d_from_ptr(ptr);
  }
  new_f32_2d_from_ptr(ptr) {
    return new FutharkArray(this.ctx, ptr, 'f32', 2, HEAPF32,
      _futhark_shape_f32_2d, _futhark_values_raw_f32_2d, _futhark_free_f32_2d);
  }
  scale(in0, in1) {
    var out0 = _malloc(4);
    var to_free = [];
    if (in1 instanceof Array) {
      in1 = this.new_f32_2d_from_jsarray(in1);
      to_free.push(in1);
    }
    futhark_entry_scale(this.ctx, ...out, in0, in1.ptr);
    var result0 = this.new_f32_2d_from_ptr(HEAP32[out0 >> 2]);
    _free(out0);
    to_free.forEach(f => f.free());
    return result0;
  }
}