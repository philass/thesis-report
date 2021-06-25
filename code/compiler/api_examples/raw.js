var typed_array = new Float32Array([0.5, 0.4, 0.3, 0.2, 0.1, 0.0]);

var cfg = futhark_context_config_new();
var ctx = futhark_context_new(cfg);

var copy = copyToHeap(typedArray);
var in_ptr = futhark_new_f32_2d(ctx, copy, 3n, 2n);
Module._free(copy);

var out_ptr = Module._malloc(4);
futhark_entry_scale(ctx, out_ptr, 0.5, in_ptr)
futhark_free_f32_2d(ctx, in_ptr);

var ptr = getValue(out_ptr, 'i32');
Module._free(out_ptr);

var shape_ptr = futhark_shape_f32_2d(ctx, ptr);
var shape = viewHeap(s, BigUint64Array, 2);

var values_ptr = futhark_values_raw_f32_2d(ctx, ptr);
var values = viewHeap(s, Float32Array, Number(shape[0] * shape[1]));

console.log(values, shape);
futhark_free_f32_2d(ctx, ptr);

futhark_context_free(ctx);
futhark_context_config_free(cfg);