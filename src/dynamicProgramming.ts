// deno-lint-ignore-file no-explicit-any
function memoize<R, T extends (...args: any[]) => R>(f:T): T {
  const memory = new Map<string,R>()
  const memoizedF = (...args: any[]) => {
    if (!memory.get(args.toString())) {
      memory.set(args.toString(), f(...args))
    }
    return memory.get(args.toString());
  };
  return memoizedF as T
}

let fib = (n: bigint): bigint => {
  if (n < 3n) {
    return 1n;
  }
  return fib(n - 1n) + fib(n - 2n);
}

const fibTabulated = (n: bigint): bigint => {
  if (n < 3n) {
    return 1n;
  }
  const values = [0n,1n,1n]
  for (let i = 3n; i <= n; i++) {
    values[Number(i)] = values[Number(i) - 1] + values[Number(i) - 2];
  }
  return values[Number(n)]
}

fib = memoize(fib);

export {fib, fibTabulated}