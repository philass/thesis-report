echo "compiling wasm-multicore"
EMCFLAGS="-s INITIAL_MEMORY=201326592 -s PTHREAD_POOL_SIZE=12" futhark wasm-multicore prefix_sum.fut -o prefix_sum_wasm_mc
echo "compiling wasm"
# Setting additional memory is optional for sequential wasm
EMCFLAGS="-s INITIAL_MEMORY=201326592" futhark wasm prefix_sum.fut -o prefix_sum_wasm_seq

echo "compiling multicore"
futhark multicore prefix_sum.fut -o prefix_sum_mc
echo "compiling c"
futhark c prefix_sum.fut -o prefix_sum_seq


