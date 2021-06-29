#include <stdio.h>
#include <stdlib.h>
#include "scale.h"

int main() {
  float scalar = 0.5;
  float arr_2d[12] = {0, 1, 2, 3, 
                      4, 5, 6, 7, 
                      8, 9, 10, 11};
  
  // Initialize config and context
  struct futhark_context_config *cfg = futhark_context_config_new();
  struct futhark_context *ctx = futhark_context_new(cfg);

  // Turn array_2d into futhark type
  struct futhark_f32_2d *fut_arr_2d = futhark_new_f32_2d(ctx, arr_2d, 3, 4);

  // Initialize futhark result array
  struct futhark_f32_2d *res;

  futhark_entry_scale(ctx, &res, scalar, fut_arr_2d);
  futhark_context_sync(ctx);

  const int64_t* shape = futhark_shape_f32_2d(ctx, res);

  float res_arr[shape[0] * shape[1]];
  futhark_values_f32_2d(ctx, res, res_arr);
  for (int i = 0; i < shape[0]; i++) {
    for (int j = 0; j < shape[1]; j++)
      printf("%f ", res_arr[i * shape[1] + j]);
    printf("\n");
  }

  futhark_free_f32_2d(ctx, res);
  futhark_free_f32_2d(ctx, fut_arr_2d);

  futhark_context_free(ctx);
  futhark_context_config_free(cfg);
}
