export const day = {
  day: 6,
  title: "Day 6: Guard Gallivant",
  stars: 2,
  story: `The Historians use their fancy device again, this time to whisk you all away to the North Pole prototype suit manufacturing lab... in the year 1518! It turns out that having direct access to history is very convenient for a group of historians.

You still have to be careful of time paradoxes, and so it will be important to avoid anyone from 1518 while The Historians search for the Chief. Unfortunately, a single guard is patrolling this part of the lab.

Maybe you can work out where the guard will go ahead of time so that The Historians can search safely?

You start by making a map (your puzzle input) of the situation. For example:

....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
The map shows the current position of the guard with ^ (to indicate the guard is currently facing up from the perspective of the map). Any obstructions - crates, desks, alchemical reactors, etc. - are shown as #.

Lab guards in 1518 follow a very strict patrol protocol which involves repeatedly following these steps:

If there is something directly in front of you, turn right 90 degrees.
Otherwise, take a step forward.
Following the above protocol, the guard moves up several times until she reaches an obstacle (in this case, a pile of failed suit prototypes):

....#.....
....^....#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
Because there is now an obstacle in front of the guard, she turns right before continuing straight in her new facing direction:

....#.....
........>#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
Reaching another obstacle (a spool of several very long polymers), she turns right again and continues downward:

....#.....
.........#
..........
..#.......
.......#..
..........
.#......v.
........#.
#.........
......#...
This process continues for a while, but the guard eventually leaves the mapped area (after walking past a tank of universal solvent):

....#.....
.........#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#v..
By predicting the guard's route, you can determine which specific positions in the lab will be in the patrol path. Including the guard's starting position, the positions visited by the guard before leaving the area are marked with an X:

....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..
In this example, the guard will visit 41 distinct positions on your map.

Predict the path of the guard. How many distinct positions will the guard visit before leaving the mapped area?`,
  firstStarFunction: (input: string): number => {
    type Directions = "^" | ">" | "v" | "<";
    const directions: Directions[] = ["^", ">", "v", "<"];
    let currentDirection: Directions = "^";
    let hasLeft = false;
    const visited = new Set<string>();

    const map = input.split("\n").map((row, rowId) =>
      Array.from(row).map((char, colId) => {
        if (directions.includes(char as Directions)) {
          visited.add(`${rowId},${colId}`);
          currentDirection = char as Directions;
          return { isVisited: true, isObstacle: false };
        }
        return {
          isVisited: false,
          isObstacle: char === "#",
        };
      }),
    );

    const rotate = (direction: Directions): Directions => {
      const index = (directions.indexOf(direction) + 1) % directions.length;
      return directions[index];
    };

    const getNextStep = (row: number, col: number, direction: Directions) => {
      switch (direction) {
        case "v":
          return [row + 1, col];
        case ">":
          return [row, col + 1];
        case "<":
          return [row, col - 1];
        default:
          return [row - 1, col];
      }
    };

    const isInBounds = (row: number, col: number) => {
      return row >= 0 && row < map.length && col >= 0 && col < map[0].length;
    };

    let [currentRow, currentCol] = Array.from(visited)[0]
      .split(",")
      .map(Number);
    while (!hasLeft) {
      const [r, c] = getNextStep(currentRow, currentCol, currentDirection);

      if (isInBounds(r, c)) {
        if (map[r][c].isObstacle) {
          currentDirection = rotate(currentDirection);
        } else {
          currentRow = r;
          currentCol = c;
          if (!visited.has(`${r},${c}`)) {
            visited.add(`${r},${c}`);
            map[r][c].isVisited = true;
          }
        }
      } else {
        hasLeft = true;
      }
    }
    return visited.size;
  },
  secondStarFunction: (input: string): unknown => {
    type Directions = "^" | ">" | "v" | "<";
    type Cell = {
      isVisited: boolean;
      isObstacle: boolean;
      startingPoint: boolean;
    };
    const directions: Directions[] = ["^", ">", "v", "<"];
    let currentDirection: Directions = "^";
    const visited = new Set<string>();

    const map: Cell[][] = input.split("\n").map((row, rowId) =>
      Array.from(row).map((char, colId) => {
        if (directions.includes(char as Directions)) {
          visited.add(`${rowId},${colId}`);
          currentDirection = char as Directions;
          return { isVisited: true, isObstacle: false, startingPoint: true };
        }
        return {
          isVisited: false,
          isObstacle: char === "#",
          startingPoint: false,
        };
      }),
    );

    const rotate = (direction: Directions): Directions => {
      const index = (directions.indexOf(direction) + 1) % directions.length;
      return directions[index];
    };

    const getNextStep = (row: number, col: number, direction: Directions) => {
      switch (direction) {
        case "v":
          return [row + 1, col];
        case ">":
          return [row, col + 1];
        case "<":
          return [row, col - 1];
        default:
          return [row - 1, col];
      }
    };

    const isInBounds = (map: Cell[][], row: number, col: number) => {
      return row >= 0 && row < map.length && col >= 0 && col < map[0].length;
    };

    const startingPosition = Array.from(visited)[0].split(",").map(Number);
    const [startRow, startCol] = startingPosition;

    const simulatePatrol = (
      map: Cell[][],
      obstruction: [number, number] | null,
    ): boolean => {
      let [row, col] = [startRow, startCol];
      let direction = currentDirection;
      const loopCheck = new Set<string>();

      if (obstruction) {
        const [obsRow, obsCol] = obstruction;
        map[obsRow][obsCol].isObstacle = true;
      }

      while (true) {
        const state = `${row},${col},${direction}`;
        if (loopCheck.has(state)) {
          if (obstruction) {
            const [obsRow, obsCol] = obstruction;
            map[obsRow][obsCol].isObstacle = false;
          }
          return true;
        }
        loopCheck.add(state);
        const [nextRow, nextCol] = getNextStep(row, col, direction);
        if (isInBounds(map, nextRow, nextCol)) {
          const cell = map[nextRow][nextCol];
          if (cell.isObstacle) {
            direction = rotate(direction);
          } else {
            row = nextRow;
            col = nextCol;
          }
        } else {
          break;
        }
      }

      if (obstruction) {
        const [obsRow, obsCol] = obstruction;
        map[obsRow][obsCol].isObstacle = false;
      }

      return false;
    };
    let validObstructionCount = 0;

    map.forEach((row, rowId) => {
      row.forEach((cell, colId) => {
        if (!cell.isObstacle && !cell.startingPoint) {
          if (simulatePatrol(map, [rowId, colId])) {
            validObstructionCount++;
          }
        }
      });
    });

    return validObstructionCount;
  },
};
