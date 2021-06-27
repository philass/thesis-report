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
    _futhark_entry_increment(this.ctx, out0, in0);
    var result0 = HEAP32[out0 >> 2];
    _free(out0);
    return result0;
  }
}