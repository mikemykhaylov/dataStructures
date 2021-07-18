import { createHash } from 'https://deno.land/std@0.101.0/hash/mod.ts';

export class HashTable {
  public keyMap: Array<Array<[string, string]>>;

  private hash(key: string) {
    const hash = createHash('md5');
    hash.update(key);
    return hash
      .toString()
      .split('')
      .reduce((acc: number, next) => {
        acc = (acc + next.charCodeAt(0)) % this.keyMap.length;
        return acc;
      }, 0);
  }

  constructor(length = 100) {
    this.keyMap = new Array<Array<[string, string]>>(length);
  }

  set(key: string, val: string) {
    const keyId = this.hash(key);
    this.keyMap[keyId] = []
    this.keyMap[keyId].push([key, val]);
  }
  get(key: string) {
    const keyId = this.hash(key);
    const pair = this.keyMap[keyId].find((val) => val[0] === key);
    if (pair) {
      return pair[1];
    }
  }

  public get keys(): string[] {
    return this.keyMap.reduce((accum: string[], next) => {
      if (next) {
        for (const pair of next) {
          accum.push(pair[0]);
        }
      }
      return accum;
    }, []);
  }

  public get values(): string[] {
    return this.keyMap.reduce((accum: string[], next) => {
      if (next) {
        for (const pair of next) {
          accum.push(pair[1]);
        }
      }
      return accum;
    }, []);
  }
}
