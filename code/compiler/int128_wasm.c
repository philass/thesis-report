static uint64_t futrts_mul_hi64(uint64_t x, uint64_t y)
{
  uint64_t a = x >> 32, b = x & 0xffffffff;
  uint64_t c = y >> 32, d = y & 0xffffffff;
  uint64_t ac = a * c;
  uint64_t bc = b * c;
  uint64_t ad = a * d;
  uint64_t bd = b * d;
  uint64_t mid34 = (bd >> 32) + (bc & 0xffffffff) + (ad & 0xffffffff);
  uint64_t upper64 = ac + (bc >> 32) + (ad >> 32) + (mid34 >> 32);
  return upper64;
}
