export const day = {
  day: 4,
  title: "Ceres Search",
  stars: 2,
  story: `"Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it. After a brief flash, you recognize the interior of the Ceres monitoring station!

As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could help her with her word search (your puzzle input). She only has to find one word: XMAS.

This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them. Here are a few ways XMAS might appear, where irrelevant characters have been replaced with .:


..X...
.SAMX.
.A..A.
XMAS.S
.X....
The actual word search will be full of letters instead. For example:

MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
In this word search, XMAS occurs a total of 18 times; here's the same word search again, but where letters not involved in any XMAS have been replaced with .:

....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX
Take a look at the little Elf's word search. How many times does XMAS appear?`,
  firstStar: (input: string): unknown => {
    const matrix = input.split("\n");
    const rows = matrix.length;
    const cols = matrix[0].length;
    let count = 0;
    const checkWord = (
      row: number,
      col: number,
      rowDirection: number,
      columnDirection: number,
      word: string,
    ) => {
      for (let i = 0; i < word.length; i++) {
        const r = row + rowDirection * i;
        const c = col + columnDirection * i;
        if (
          r < 0 ||
          r >= rows ||
          c < 0 ||
          c >= cols ||
          matrix[r][c] !== word[i]
        ) {
          return false;
        }
      }
      return true;
    };

    const words = ["XMAS", "SAMX"];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        for (const word of words) {
          if (checkWord(row, col, 0, 1, word)) count++;
          if (checkWord(row, col, 1, 0, word)) count++;
          if (checkWord(row, col, 1, 1, word)) count++;
          if (checkWord(row, col, 1, -1, word)) count++;
        }
      }
    }

    return count;
  },
  secondStar: (input: string): unknown => {
    const matrix = input.split("\n");
    const rows = matrix.length;
    const cols = matrix[0].length;
    let count = 0;

    const combinations = ["MS", "SM"];

    const isValidX = (row: number, col: number): boolean => {
      if (row - 1 < 0 || row + 1 >= rows || col - 1 < 0 || col + 1 >= cols) {
        return false;
      }
      const leftTopToRightBottom =
        matrix[row - 1][col - 1] + matrix[row + 1][col + 1];
      const rightTopToLeftBottom =
        matrix[row - 1][col + 1] + matrix[row + 1][col - 1];
      return (
        matrix[row][col] === "A" &&
        combinations.includes(leftTopToRightBottom) &&
        combinations.includes(rightTopToLeftBottom)
      );
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (isValidX(row, col)) {
          count++;
        }
      }
    }

    return count;
  },
};
