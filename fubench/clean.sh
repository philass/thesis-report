PROG=${1%.fut}
BASE=${PROG##*/}

rm ${BASE}{_wmc,_wc,_c,_mc}
rm ${BASE}{_wmc,_wc,_c,_mc}.c
rm ${BASE}{_wmc,_wc}.wasm
rm ${BASE}_wmc.worker.js
