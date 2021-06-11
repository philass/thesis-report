PROG=${1%.fut}
BASE=${PROG##*/}

rm ${BASE}{_wasm_mc,_wasm_seq,_seq,_mc}
rm ${BASE}{_wasm_mc,_wasm_seq,_seq,_mc}.c
rm ${BASE}{_wasm_mc,_wasm_seq}.wasm
rm ${BASE}_wasm_mc.worker.js
