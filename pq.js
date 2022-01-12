const PriorityQueue = require("js-priority-queue");

var pq = new PriorityQueue({ comparator: function (a, b) { return b - a; }});

pq.queue(1);
pq.queue(2);
pq.queue(3);
pq.queue(4);

console.log(pq.length)

while(pq.length > 0) {
    console.log(pq.dequeue());
}

console.log(pq.length)
