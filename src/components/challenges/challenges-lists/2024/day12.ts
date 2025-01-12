export const day = {
  day: 12,
  title: "Day 12: Garden Groups",
  stars: 2,
  story: `Why not search for the Chief Historian near the gardener and his massive farm? There's plenty of food, so The Historians grab something to eat while they search.

You're about to settle near a complex arrangement of garden plots when some Elves ask if you can lend a hand. They'd like to set up fences around each region of garden plots, but they can't figure out how much fence they need to order or how much it will cost. They hand you a map (your puzzle input) of the garden plots.

Each garden plot grows only a single type of plant and is indicated by a single letter on your map. When multiple garden plots are growing the same type of plant and are touching (horizontally or vertically), they form a region. For example:

AAAA
BBCD
BBCC
EEEC
This 4x4 arrangement includes garden plots growing five different types of plants (labeled A, B, C, D, and E), each grouped into their own region.

In order to accurately calculate the cost of the fence around a single region, you need to know that region's area and perimeter.

The area of a region is simply the number of garden plots the region contains. The above map's type A, B, and C plants are each in a region of area 4. The type E plants are in a region of area 3; the type D plants are in a region of area 1.

Each garden plot is a square and so has four sides. The perimeter of a region is the number of sides of garden plots in the region that do not touch another garden plot in the same region. The type A and C plants are each in a region with perimeter 10. The type B and E plants are each in a region with perimeter 8. The lone D plot forms its own region with perimeter 4.

Visually indicating the sides of plots in each region that contribute to the perimeter using - and |, the above map's regions' perimeters are measured as follows:

+-+-+-+-+
|A A A A|
+-+-+-+-+     +-+
              |D|
+-+-+   +-+   +-+
|B B|   |C|
+   +   + +-+
|B B|   |C C|
+-+-+   +-+ +
          |C|
+-+-+-+   +-+
|E E E|
+-+-+-+
Plants of the same type can appear in multiple separate regions, and regions can even appear within other regions. For example:

OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
The above map contains five regions, one containing all of the O garden plots, and the other four each containing a single X plot.

The four X regions each have area 1 and perimeter 4. The region containing 21 type O plants is more complicated; in addition to its outer edge contributing a perimeter of 20, its boundary with each X region contributes an additional 4 to its perimeter, for a total perimeter of 36.

Due to "modern" business practices, the price of fence required for a region is found by multiplying that region's area by its perimeter. The total price of fencing all regions on a map is found by adding together the price of fence for every region on the map.

In the first example, region A has price 4 * 10 = 40, region B has price 4 * 8 = 32, region C has price 4 * 10 = 40, region D has price 1 * 4 = 4, and region E has price 3 * 8 = 24. So, the total price for the first example is 140.

In the second example, the region with all of the O plants has price 21 * 36 = 756, and each of the four smaller X regions has price 1 * 4 = 4, for a total price of 772 (756 + 4 + 4 + 4 + 4).

Here's a larger example:

RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
It contains:

A region of R plants with price 12 * 18 = 216.
A region of I plants with price 4 * 8 = 32.
A region of C plants with price 14 * 28 = 392.
A region of F plants with price 10 * 18 = 180.
A region of V plants with price 13 * 20 = 260.
A region of J plants with price 11 * 20 = 220.
A region of C plants with price 1 * 4 = 4.
A region of E plants with price 13 * 18 = 234.
A region of I plants with price 14 * 22 = 308.
A region of M plants with price 5 * 12 = 60.
A region of S plants with price 3 * 8 = 24.
So, it has a total price of 1930.

What is the total price of fencing all regions on your map?`,
  firstStar: (input: string): number => {
    const garden = input.split("\r\n").map((row) => Array.from(row));

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    const getGroups = (grid: string[][]) => {
      const rows = grid.length;
      const cols = grid[0].length;
      const visited = Array.from({ length: rows }, () =>
        Array(cols).fill(false),
      );
      const groups: {
        [key: string]: {
          row: number;
          col: number;
          intersectionCount: number;
        }[][];
      } = {};

      const isValid = (row: number, col: number, char: string): boolean =>
        row >= 0 &&
        row < rows &&
        col >= 0 &&
        col < cols &&
        !visited[row][col] &&
        grid[row][col] === char;

      const countIntersections = (
        row: number,
        col: number,
        char: string,
      ): number =>
        directions.reduce((count, [dRow, dCol]) => {
          const newRow = row + dRow;
          const newCol = col + dCol;
          return (
            count +
            (newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            grid[newRow][newCol] === char
              ? 1
              : 0)
          );
        }, 0);

      const dfs = (
        row: number,
        col: number,
        char: string,
        group: { row: number; col: number; intersectionCount: number }[],
      ) => {
        visited[row][col] = true;
        group.push({
          row,
          col,
          intersectionCount: countIntersections(row, col, char),
        });
        for (const [dRow, dCol] of directions) {
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (isValid(newRow, newCol, char)) dfs(newRow, newCol, char, group);
        }
      };

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (!visited[row][col]) {
            const char = grid[row][col];
            const group: {
              row: number;
              col: number;
              intersectionCount: number;
            }[] = [];
            dfs(row, col, char, group);
            if (!groups[char]) groups[char] = [];
            groups[char].push(group);
          }
        }
      }

      return groups;
    };

    return Object.values(getGroups(garden))
      .flat()
      .reduce((price, group) => {
        const area = group.length;
        const perimeter = group.reduce(
          (acc, { intersectionCount }) => acc + 4 - intersectionCount,
          0,
        );
        return price + area * perimeter;
      }, 0);
  },
  secondStar: (input: string): number => {
    const garden = input.split("\r\n").map((row) => Array.from(row));

    const directions = [
      [0, 1], // right
      [1, 0], // down
      [0, -1], // left
      [-1, 0], // up
    ];

    const diagonals = [
      [1, 1], // bottom-right
      [1, -1], // bottom-left
      [-1, -1], // top-left
      [-1, 1], // top-right
    ];

    const isValidPosition = (
      row: number,
      col: number,
      rows: number,
      cols: number,
    ): boolean => row >= 0 && row < rows && col >= 0 && col < cols;

    const countVertices = (
      row: number,
      col: number,
      char: string,
      grid: string[][],
    ): number => {
      const rows = grid.length;
      const cols = grid[0].length;

      const hasNeighbor = ([dRow, dCol]: number[]): boolean => {
        const newRow = row + dRow;
        const newCol = col + dCol;
        return (
          isValidPosition(newRow, newCol, rows, cols) &&
          grid[newRow][newCol] === char
        );
      };

      const [right, down, left, up] = directions.map(hasNeighbor);
      const [br, bl, tl, tr] = diagonals.map(hasNeighbor);

      let verticesCount = 0;
      if (!right && !down) verticesCount++;
      if (!down && !left) verticesCount++;
      if (!left && !up) verticesCount++;
      if (!up && !right) verticesCount++;

      if (up && tr && !right) verticesCount++;
      if (down && br && !right) verticesCount++;
      if (up && tl && !left) verticesCount++;
      if (down && bl && !left) verticesCount++;

      return verticesCount;
    };

    const getGroups = (grid: string[][]) => {
      const rows = grid.length;
      const cols = grid[0].length;
      const visited = Array.from({ length: rows }, () =>
        Array(cols).fill(false),
      );
      const groups: Record<
        string,
        { row: number; col: number; verticesCount: number }[][]
      > = {};

      const dfs = (
        row: number,
        col: number,
        char: string,
        group: { row: number; col: number; verticesCount: number }[],
      ) => {
        visited[row][col] = true;
        group.push({
          row,
          col,
          verticesCount: countVertices(row, col, char, grid),
        });

        for (const [dRow, dCol] of directions) {
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (
            isValidPosition(newRow, newCol, rows, cols) &&
            !visited[newRow][newCol] &&
            grid[newRow][newCol] === char
          ) {
            dfs(newRow, newCol, char, group);
          }
        }
      };

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (!visited[row][col]) {
            const char = grid[row][col];
            const group: { row: number; col: number; verticesCount: number }[] =
              [];
            dfs(row, col, char, group);

            if (!groups[char]) groups[char] = [];
            groups[char].push(group);
          }
        }
      }

      return groups;
    };

    const groups = getGroups(garden);

    return Object.values(groups)
      .flat()
      .reduce((price, group) => {
        const area = group.length;
        const vertices = group.reduce(
          (acc, { verticesCount }) => acc + verticesCount,
          0,
        );
        return price + area * vertices;
      }, 0);
  },
};
