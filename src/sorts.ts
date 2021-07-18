const swap = (arr: number[], i: number, j: number): void => {
  if (i !== j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

export const bubbleSort = (arr: number[]) => {
  const clonedArr = [...arr];
  for (let i = 0; i < clonedArr.length; i++) {
    let madeSwap = false;
    for (let j = 0; j < clonedArr.length - 1 - i; j++) {
      if (clonedArr[j] > clonedArr[j + 1]) {
        madeSwap = true;
        swap(clonedArr, j, j + 1);
      }
    }
    if (!madeSwap) {
      break;
    }
  }
  return clonedArr;
};

export const insertionSort = (arr: number[]) => {
  const clonedArr = [...arr];
  for (let i = 1; i < clonedArr.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (clonedArr[j] < clonedArr[j - 1]) {
        swap(clonedArr, j, j - 1);
      } else {
        break;
      }
    }
  }
  return clonedArr;
};

export const selectionSort = (arr: number[]) => {
  const clonedArr = [...arr];
  for (let i = 0; i < clonedArr.length; i++) {
    let minIndex = i;
    let min = clonedArr[minIndex];
    for (let j = i + 1; j < clonedArr.length; j++) {
      if (clonedArr[j] < min) {
        minIndex = j;
        min = clonedArr[minIndex]
      }
    }
    if (minIndex !== i) {
      swap(clonedArr, i, minIndex);
    }
  }
  return clonedArr;
};

const merge = (arr1: number[], arr2: number[]): number[] => {
  const clonedArr1: Array<number | undefined> = [...arr1];
  const clonedArr2: Array<number | undefined> = [...arr2];
  const arr = Array.from({ length: arr1.length + arr2.length }).fill(
    0,
  ) as Array<number>;
  arr.forEach((_, index) => {
    if (
      clonedArr1[0] !== undefined &&
      (clonedArr2[0] === undefined || clonedArr1[0] < clonedArr2[0])
    ) {
      arr[index] = clonedArr1[0];
      clonedArr1.shift();
    } else if (clonedArr2[0] !== undefined) {
      arr[index] = clonedArr2[0];
      clonedArr2.shift();
    }
  });
  return arr;
};

export const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) {
    return arr;
  }
  const separator = Math.floor(arr.length / 2);
  const leftHalf = arr.slice(0, separator);
  const rightHalf = arr.slice(separator);
  return merge(mergeSort(leftHalf), mergeSort(rightHalf));
};

const pivotArr = (arr: number[]): [number[], number, number[]] => {
  const clonedArr = [...arr];
  let pivotIndex = 0;
  const pivot = clonedArr[pivotIndex];
  for (let i = 1; i < clonedArr.length; i++) {
    if (clonedArr[i] < pivot) {
      pivotIndex++;
      swap(clonedArr, pivotIndex, i);
    }
  }
  swap(clonedArr, 0, pivotIndex);
  return [
    clonedArr.slice(0, pivotIndex),
    pivot,
    clonedArr.slice(pivotIndex + 1),
  ];
};

export const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) {
    return arr;
  }
  const [leftPart, pivot, rightPart] = pivotArr(arr);
  return [...quickSort(leftPart), pivot, ...quickSort(rightPart)];
};

const digitAtPos = (num: number, pos: number): number => {
  const normalizedNumber = num.toString().padStart(pos, "0");
  return +normalizedNumber[normalizedNumber.length - pos];
};

export const radixSort = (arr: number[]) => {
  let clonedArr = [...arr];
  let buckets: number[][] = Array.from({ length: 10 }, () => []);
  const longest = clonedArr.reduce(
    (
      prev,
      val,
    ) => (val.toString().length > prev ? val.toString().length : prev),
    0,
  );
  for (let i = 1; i <= longest; i++) {
    for (let j = 0; j < clonedArr.length; j++) {
      buckets[digitAtPos(clonedArr[j], i)].push(clonedArr[j]);
    }
    clonedArr = buckets.flat();
    buckets = buckets.map(() => []);
  }
  return clonedArr;
};
