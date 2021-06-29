var cfg = _futhark_context_config_new();
var ctx = _futhark_context_new(cfg);

var input = 42;
var out_ptr = _malloc(4);
_futhark_entry_increment(ctx, out_ptr, input);
var result = HEAP32[out_ptr >> 2];
_free(out_ptr);

console.log(result);

_futhark_context_free(ctx);
_futhark_context_config_free(cfg);