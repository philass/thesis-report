PROG=${1%.fut}
BASE=${PROG##*/}
INPUT=$2
INPUT_BASE=${INPUT%.*}

bash compile.sh $PROG.fut

echo "c"
cat $2 | ./${BASE}_c -t ${BASE}_c_${INPUT_BASE}
echo "multicore"
cat $2 | ./${BASE}_mc -t ${BASE}_mc_${INPUT_BASE}
echo "wasm"
cat $2 | node --experimental-wasm-simd ./${BASE}_wc -t /dev/stderr 2> ${BASE}_wc_${INPUT_BASE}
echo "wasm-multicore"
cat $2 | timeout 8 node --experimental-wasm-simd --experimental-wasm-threads ./${BASE}_wmc -t /dev/stderr 2> ${BASE}_wmc_${INPUT_BASE}

bash clean.sh $PROG.fut

echo "c mc wc wmc"
cat ${BASE}_{,m,w,wm}c_${INPUT_BASE}
 

# If i want to extract the compiled inputs I can use Soren's nifty one liner
# One line from here should than be taken from here and be pasted into data.in
# cat ${PROG}.fut | grep -o '^-- compiled input {[^\}]*' | cut -d' ' -f5-

