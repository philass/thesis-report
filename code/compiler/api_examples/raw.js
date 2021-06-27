var typed_array = new Float32Array([0.5, 0.4, 0.3, 0.2, 0.1, 0.0]);

var cfg = _futhark_context_config_new();
var ctx = _futhark_context_new(cfg);

var copy = copyToHeap(typedArray);
var in_ptr = _futhark_new_f32_2d(ctx, copy, 3n, 2n);
Module._free(copy);

var out_ptr = Module._malloc(4);
_futhark_entry_scale(ctx, out_ptr, 0.5, in_ptr)
_futhark_free_f32_2d(ctx, in_ptr);

var ptr = HEAP32[out_ptr >> 2];
Module._free(out_ptr);

var shape_ptr = _futhark_shape_f32_2d(ctx, ptr) >> 3;
var shape = Array.from(HEAP64.subarray(shape_ptr, shape_ptr + 2));

var values_ptr = _futhark_values_raw_f32_2d(ctx, ptr) >> 2;
var length = Number(shape[0] * shape[1]);
var values = HEAPF32.subarray(values_ptr, values_ptr + length);

console.log(values, shape);
_futhark_free_f32_2d(ctx, ptr);

_futhark_context_free(ctx);
_futhark_context_config_free(cfg);