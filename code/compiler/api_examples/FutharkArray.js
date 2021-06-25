class FutharkArray {
  constructor(ctx, ptr, type_name, dim, array_type, fshape, fvalues, ffree) {
    this.ctx = ctx;
    this.ptr = ptr;
    this.type_name = type_name;
    this.dim = dim;
    this.array_type = array_type;
    this.fshape = fshape;
    this.fvalues = fvalues;
    this.ffree = ffree;
  }
  futharkType() { return this.type_name; }
  free() { this.ffree(this.ctx, this.ptr); }
  shape() {
    var s = this.fshape(this.ctx, this.ptr);
    return Array.from(viewHeap(s, BigUint64Array, this.dim));
  }
  toTypedArray(dims = this.shape()) {
    var length = Number(dims.reduce((a, b) => a * b));
    var v = this.fvalues(this.ctx, this.ptr);
    return viewHeap(v, this.array_type, length);
  }
  toArray() {
    var dims = this.shape();
    var ta = this.toTypedArray(dims);
    return (function nest(offs, ds) {
      var d0 = Number(ds[0]);
      if (ds.length === 1) {
        return Array.from(ta.subarray(offs, offs + d0));
      } else {
        var d1 = Number(ds[1]);
        return Array.from(Array(d0), (x,i) => nest(offs + i * d1, ds.slice(1)));
      }
    })(0, dims);
  }
}