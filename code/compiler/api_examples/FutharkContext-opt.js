class FutharkContext {
    constructor(num_threads) {
      this.cfg = _futhark_context_config_new();
      if (num_threads) _futhark_context_config_set_num_threads(this.cfg, num_threads);
      this.ctx = _futhark_context_new(this.cfg);
    }
    
}