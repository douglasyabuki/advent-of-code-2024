export const day = {
  day: 8,
  title: "Day 8: Resonant Collinearity",
  stars: 2,
  story: `You find yourselves on the roof of a top-secret Easter Bunny installation.

While The Historians do their thing, you take a look at the familiar huge antenna. Much to your surprise, it seems to have been reconfigured to emit a signal that makes people 0.1% more likely to buy Easter Bunny brand Imitation Mediocre Chocolate as a Christmas gift! Unthinkable!

Scanning across the city, you find that there are actually many such antennas. Each antenna is tuned to a specific frequency indicated by a single lowercase letter, uppercase letter, or digit. You create a map (your puzzle input) of these antennas. For example:

............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
The signal only applies its nefarious effect at specific antinodes based on the resonant frequencies of the antennas. In particular, an antinode occurs at any point that is perfectly in line with two antennas of the same frequency - but only when one of the antennas is twice as far away as the other. This means that for any pair of antennas with the same frequency, there are two antinodes, one on either side of them.

So, for these two antennas with frequency a, they create the two antinodes marked with #:

..........
...#......
..........
....a.....
..........
.....a....
..........
......#...
..........
..........
Adding a third antenna with the same frequency creates several more antinodes. It would ideally add four antinodes, but two are off the right side of the map, so instead it adds only two:

..........
...#......
#.........
....a.....
........a.
.....a....
..#.......
......#...
..........
..........
Antennas with different frequencies don't create antinodes; A and a count as different frequencies. However, antinodes can occur at locations that contain antennas. In this diagram, the lone antenna with frequency capital A creates no antinodes but has a lowercase-a-frequency antinode at its location:

..........
...#......
#.........
....a.....
........a.
.....a....
..#.......
......A...
..........
..........
The first example has antennas with two different frequencies, so the antinodes they create look like this, plus an antinode overlapping the topmost A-frequency antenna:

......#....#
...#....0...
....#0....#.
..#....0....
....0....#..
.#....A.....
...#........
#......#....
........A...
.........A..
..........#.
..........#.
Because the topmost A-frequency antenna overlaps with a 0-frequency antinode, there are 14 total unique locations that contain an antinode within the bounds of the map.

Calculate the impact of the signal. How many unique locations within the bounds of the map contain an antinode?`,
  firstStarFunction: (input: string): number => {
    type Location = {
      rowId: number;
      colId: number;
    };
    const antennas: Record<string, Location[]> = {};
    const antinodesLocations = new Set();

    const initialMap: Location[][] = input.split("\r\n").map((row, rowId) =>
      Array.from(row).map((place, colId) => {
        if (place !== ".") {
          if (!antennas?.[place]) {
            antennas[place] = [{ rowId, colId }];
          } else {
            antennas[place].push({ rowId, colId });
          }
        }
        return {
          rowId,
          colId,
        };
      }),
    );
    const getDistance = (a: Location, b: Location) => {
      return { dc: b.colId - a.colId, dr: b.rowId - a.rowId };
    };
    const getAntinodesLocations = (a: Location, b: Location) => {
      const { dc, dr } = getDistance(a, b);
      return [
        { colId: a.colId - dc, rowId: a.rowId - dr },
        { colId: b.colId + dc, rowId: b.rowId + dr },
      ];
    };
    const isInBounds = (rowId: number, colId: number) => {
      return (
        rowId >= 0 &&
        rowId < initialMap.length &&
        colId >= 0 &&
        colId < initialMap[0].length
      );
    };
    const placeAntiNodes = (a: Location, b: Location) => {
      const antinodes = getAntinodesLocations(a, b);
      antinodes.forEach(({ rowId, colId }) => {
        const stringified = JSON.stringify({ rowId, colId });
        if (
          isInBounds(rowId, colId) &&
          !antinodesLocations.has({
            stringified,
          })
        ) {
          antinodesLocations.add(stringified);
        }
      });
    };
    Object.values(antennas).forEach((locations) => {
      if (locations?.length > 1)
        for (let i = 0; i < locations.length - 1; i++) {
          for (let j = i + 1; j < locations.length; j++) {
            placeAntiNodes(locations[i], locations[j]);
          }
        }
    });
    return Array.from(antinodesLocations).length;
  },
  secondStarFunction: (input: string): number => {
    type Location = {
      rowId: number;
      colId: number;
    };
    const antennas: Record<string, Location[]> = {};
    const antinodesLocations = new Set<string>();

    const initialMap: Location[][] = input.split("\r\n").map((row, rowId) =>
      Array.from(row).map((place, colId) => {
        if (place !== ".") {
          if (!antennas[place]) {
            antennas[place] = [];
          }
          if (
            !antennas[place].some(
              (loc) => loc.rowId === rowId && loc.colId === colId,
            )
          ) {
            antennas[place].push({ rowId, colId });
          }
        }
        return { rowId, colId };
      }),
    );

    const getDistance = (a: Location, b: Location) => {
      return { dr: b.rowId - a.rowId, dc: b.colId - a.colId };
    };

    const normalizeSteps = (
      dr: number,
      dc: number,
    ): { stepRow: number; stepCol: number } => {
      const greatestCommonDivisor = Math.abs(getGreatestCommonDivisor(dr, dc));
      return {
        stepRow: dr / greatestCommonDivisor,
        stepCol: dc / greatestCommonDivisor,
      };
    };

    const getGreatestCommonDivisor = (a: number, b: number): number => {
      return b === 0 ? Math.abs(a) : getGreatestCommonDivisor(b, a % b);
    };

    const serializeLocation = (location: Location): string => {
      return `${location.rowId},${location.colId}`;
    };

    const isInBounds = (rowId: number, colId: number): boolean => {
      return (
        rowId >= 0 &&
        rowId < initialMap.length &&
        colId >= 0 &&
        colId < initialMap[0].length
      );
    };

    const addLineToAntinodes = (a: Location, b: Location) => {
      const { dr, dc } = getDistance(a, b);
      const { stepRow, stepCol } = normalizeSteps(dr, dc);

      let i = a;
      while (isInBounds(i.rowId, i.colId)) {
        antinodesLocations.add(serializeLocation(i));
        i = { rowId: i.rowId - stepRow, colId: i.colId - stepCol };
      }

      let j = b;
      while (isInBounds(j.rowId, j.colId)) {
        antinodesLocations.add(serializeLocation(j));
        j = { rowId: j.rowId + stepRow, colId: j.colId + stepCol };
      }
    };

    Object.values(antennas).forEach((locations) => {
      const length = locations.length;
      if (length > 1) {
        for (let i = 0; i < length - 1; i++) {
          for (let j = i + 1; j < length; j++) {
            addLineToAntinodes(locations[i], locations[j]);
          }
        }
      }
    });

    return antinodesLocations.size;
  },
};
