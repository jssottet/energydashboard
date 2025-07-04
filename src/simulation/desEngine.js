export class EventQueue {
  constructor() {
    this.queue = [];
  }

  push(event) {
    this.queue.push(event);
    this.queue.sort((a, b) => a.time - b.time);
  }

  next() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}
