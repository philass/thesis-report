#include <string.h>
#include <stdlib.h>
char* concat(const char* a, const char* b) {
  int alen = strlen(a);
  int blen = strlen(b);
  char* res = malloc(alen + blen + 1);
  strcpy(res, a);
  strcpy(res + alen, b);
  return res;
}
