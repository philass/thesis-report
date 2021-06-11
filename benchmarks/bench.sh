./compile.sh
RUNS=$2
echo "c"
echo $1 | ./prefix_sum_seq -t /dev/stdout
echo "c"
echo $1 | ./prefix_sum_seq -t /dev/stdout
for i in 0 1 2 4 8 12 16
do
  echo "multicore" $i
  echo $1 | ./prefix_sum_mc -t /dev/stdout --num-threads=$i
done
echo "wasm"
echo $1 | node ./prefix_sum_wasm_seq -t /dev/stdout
for i in 0 1 2 4 8 12 16
do
  echo "wasm-multicore" $i
  echo $1 | timeout 1 node --experimental-wasm-threads ./prefix_sum_wasm_mc -t /dev/stdout --num-threads=$i
done
