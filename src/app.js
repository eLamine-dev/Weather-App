async function start() {
   const promise = await Promise.resolve('async working');

   console.log(promise);
}

start();

console.log('webpack working');
