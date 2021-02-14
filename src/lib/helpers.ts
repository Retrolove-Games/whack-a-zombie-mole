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
