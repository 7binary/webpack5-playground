async function start() {
  return await Promise.resolve('OK');
}

class Util {
  static id = new Date();
}

console.log(Util.id);
start().then(console.log);

