PROG=${1%.fut}
BASE=${PROG##*/}
echo "compiling wasm-multicore"
# Initial memory of 201326592 is 192 megabytes
MEMORY=$((2147483648-64*2**10)) # 2gb approx

EMCFLAGS="-s INITIAL_MEMORY=$MEMORY -s PTHREAD_POOL_SIZE=12" futhark wasm-multicore $PROG.fut -o ${BASE}_wmc
echo "compiling wasm"
# Setting additional memory is optional for sequential wasm
EMCFLAGS="-s INITIAL_MEMORY=$MEMORY" futhark wasm $PROG.fut -o ${BASE}_wc

echo "compiling multicore"
futhark multicore $PROG.fut -o ${BASE}_mc
echo "compiling c"
futhark c $PROG.fut -o ${BASE}_c
