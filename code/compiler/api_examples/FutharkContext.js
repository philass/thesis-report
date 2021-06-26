class FutharkContext {
    constructor() {
      this.cfg = futhark_context_config_new();
      this.ctx = futhark_context_new(this.cfg);
    }
    free() {
      futhark_context_free(this.ctx);
      futhark_context_config_free(this.cfg);
    }
    get_error() {
      var error_ptr = futhark_context_get_error(this.ctx);
      var error_msg = '';
      var next_char;
      for (var i = 0; 0 != (next_char = getValue(i + error_ptr, 'i8')); i++) {
        error_msg += String.fromCharCode(next_char);
      }
      return error_msg;
    }
    new_f32_2d(typedArray, d0, d1) {
      var copy = copyToHeap(typedArray);
      var ptr = futhark_new_f32_2d(this.ctx, copy, BigInt(d0), BigInt(d1));
      Module._free(copy);
      return this.new_f32_2d_from_ptr(ptr);
    }
    new_f32_2d_from_jsarray(a) {
      return this.new_f32_2d(Float32Array.from(a.flat()), a.length, a[0].length);
    }
    new_f32_2d_from_ptr(ptr) {
      return new FutharkArray(this.ctx, ptr, 'f32', 2, Float32Array, futhark_shape_f32_2d, futhark_values_raw_f32_2d, futhark_free_f32_2d);
    }
    scale(in0, in1) {
      var out = [4].map(n => Module._malloc(n));
      var to_free = [];
      var do_free = () => { out.forEach(Module._free); to_free.forEach(f => f.free()); };
      if (in1 instanceof Array) { in1 = this.new_f32_2d_from_jsarray(in1); to_free.push(in1); }
    
      if (futhark_entry_scale(this.ctx, ...out, in0, in1.ptr) > 0) {
        do_free();
        throw this.get_error();
      }
      var result0 = this.new_f32_2d_from_ptr(getValue(out[0], 'i32'));
    
      do_free();
      return result0;
    }
}