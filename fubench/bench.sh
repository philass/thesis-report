PROG=${1%.fut}
BASE=${PROG##*/}
INPUT=$2

bash compile.sh $PROG.fut

echo "c"
cat $2 | ./${BASE}_seq -t /dev/stdout
echo "multicore"
cat $2 | ./${BASE}_mc -t /dev/stdout
echo "wasm"
cat $2 | node --experimental-wasm-simd ./${BASE}_wasm_seq -t /dev/stdout
echo "wasm-multicore"
cat $2 | timeout 1 node --experimental-wasm-simd --experimental-wasm-threads ./${BASE}_wasm_mc -t /dev/stdout

bash clean.sh $PROG.fut



# If i want to extract the compiled inputs I can use Soren's nifty one liner
# One line from here should than be taken from here and be pasted into data.in
# cat ${PROG}.fut | grep -o '^-- compiled input {[^\}]*' | cut -d' ' -f5-

