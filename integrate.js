var num_workers = 4;
var result = 0;
var counter = 0;
workers = [];

for (var i = 0; i < num_workers; i++) {
  workers.push(new Worker('worker.js'));
}

for (var i = 0; i < num_workers; i++) {
  workers[i].onmessage = function (event) {
    counter += 1;
    result += event.data;
    if (counter == num_workers) console.log(result);
  }
}

for (var i = 0; i < num_workers; i++) {
  workers[i].postMessage(i);
}
