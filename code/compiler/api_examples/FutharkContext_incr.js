class FutharkContext {
  constructor() {
    this.cfg = _futhark_context_config_new();
    this.ctx = _futhark_context_new(this.cfg);
  }
  free() {
    _futhark_context_free(this.ctx);
    _futhark_context_config_free(this.cfg);
  }
  increment(in0) {
    var out0 = _malloc(4);
    if (_futhark_entry_increment(this.ctx, out0, in0) > 0) {
      _free(out0);
      throw "Bad call to futhark increment";
    }
    var result0 = viewHeap(out0, Int32Array, 1)[0];
    _free(out0);
    return result0;
  }
}