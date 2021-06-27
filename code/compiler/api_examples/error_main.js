  if (_futhark_entry_scale(this.ctx, out, in0, in1.ptr) > 0) {
    _free(out0);
    to_free.forEach(f => f.free());
    throw this.get_error();
  }