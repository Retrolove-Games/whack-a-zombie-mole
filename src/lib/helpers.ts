/**
 * Generate random number with exclusion.
 * @param lengthOfArray 
 * @param indexToExclude 
 * @returns Number
 */
export function getRandomWithOneExclusion(lengthOfArray: number, indexToExclude: number): number {
  var rand = null; //an integer

  while (rand === null || rand === indexToExclude) {
    rand = ~~(Math.random() * (lengthOfArray - 1));
  }

  return rand;
}

/**
 * Generate random number with exclusion.
 * @param lengthOfArray 
 * @param exclude
 * @returns Number
 */
export function getRandomWithExclusions(lengthOfArray: number, exclude: Array<number>): number {
  var rand = null; //an integer

  while (rand === null || exclude.includes(rand)) {
    rand = ~~(Math.random() * (lengthOfArray - 1));
  }

  return rand;
}
