#include "main.h"

int main() {

  int arr_2d[12] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11};

  //initialize config and context
  struct futhark_context_config *cfg = futhark_context_config_new();
  struct futhark_context *ctx = futhark_context_new(cfg);

  // Turn array_2d into futhark typ
  struct futhark_i32_2d *fut_arr_2d = futhark_new_i32_2d(ctx, arr_2d, 3, 4);

  // Initialize futhark result array
  struct futhark_i32_1d *res;

  futhark_entry_col_sum(ctx, &res, fut_arr_2d);
  futhark_context_sync(ctx);

  const int64_t* shape = futhark_shape_i32_1d(ctx, res);

  printf("shape : %lld\n", *shape);

  int res_arr[*shape];
  futhark_values_i32_1d(ctx, res, res_arr);
  for (int i = 0; i < *shape; i++) 
    printf("%d\n", res_arr[i]);

  futhark_free_i32_1d(ctx, res);
  futhark_free_i32_2d(ctx, fut_arr_2d);

  futhark_context_free(ctx);
  futhark_context_config_free(cfg);
}
