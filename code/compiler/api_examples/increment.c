#include <stdio.h>
#include "increment.h"

int main() {
  // Initialize config and context
  struct futhark_context_config *cfg = futhark_context_config_new();
  struct futhark_context *ctx = futhark_context_new(cfg);

  int32_t res;
  futhark_entry_increment(ctx, &res, 42);
  printf("%d\n", (int) res);

  futhark_context_free(ctx);
  futhark_context_config_free(cfg);
}
