class FutharkOpaque {
  constructor(ctx, ptr, ffree) { 
    this.ctx = ctx; this.ptr = ptr; this.ffree = ffree; 
  }
  free() { this.ffree(this.ctx, this.ptr); }
}