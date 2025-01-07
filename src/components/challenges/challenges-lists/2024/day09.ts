export const day = {
  day: 9,
  title: "Day 9: Disk Fragmenter",
  stars: 2,
  story: ``,
  firstStarFunction: (input: string | number): number => {
    const s = input.toString();
    const rawData = s.match(/(\d(\d|$))/g);
    const mappedDisk = rawData
      ? rawData.flatMap((group, matchIndex) => {
          return [
            ...new Array(parseInt(group[0])).fill(matchIndex),
            ...new Array(parseInt(group[1] ?? "0")).fill(null),
          ];
        })
      : [];

    const [filledIndexes, emptyIndexes]: number[][] = [[], []];
    mappedDisk.forEach((fileId, index) => {
      (fileId === null ? emptyIndexes : filledIndexes).push(index);
    });

    let emptyPointer = emptyIndexes.findIndex((i) => i >= filledIndexes.length);
    return filledIndexes.reduce((checksum, filledIndex) => {
      const position =
        filledIndex < filledIndexes.length
          ? filledIndex
          : emptyIndexes[--emptyPointer];
      return checksum + mappedDisk[filledIndex] * position;
    }, 0);
  },
  secondStarFunction: (input: string): number => {
    type File = {
      id: number | null;
      indexes: number[];
      freeSpace: number;
      usedSpace: number;
    };

    const parseDisk = (input: string): (number | null)[] => {
      const rawData = input.match(/(\d(\d|$))/g);
      return rawData
        ? rawData.flatMap((group, matchIndex) => [
            ...new Array(parseInt(group[0])).fill(matchIndex),
            ...new Array(parseInt(group[1] ?? "0")).fill(null),
          ])
        : [];
    };

    const groupValuesWithIndexes = (arr: (number | null)[]): File[] => {
      const grouped: File[] = [];
      let currentGroup: File = {
        id: arr[0],
        indexes: [],
        freeSpace: 0,
        usedSpace: 0,
      };

      arr.forEach((value, index) => {
        if (value === currentGroup.id) {
          currentGroup.indexes.push(index);
          if (value === null) {
            currentGroup.freeSpace++;
          } else {
            currentGroup.usedSpace++;
          }
        } else {
          grouped.push(currentGroup);
          currentGroup = {
            id: value,
            indexes: [index],
            freeSpace: value === null ? 1 : 0,
            usedSpace: value === null ? 0 : 1,
          };
        }
      });

      grouped.push(currentGroup);
      return grouped;
    };

    const locateFreeSpace = (file: File, groups: File[]): number => {
      return groups.findIndex((group) => group.freeSpace >= file.usedSpace);
    };

    const moveFile = (
      file: File,
      destination: number,
      groups: File[],
    ): void => {
      const targetGroup = groups[destination];
      const usedIndexes = targetGroup.indexes.slice(0, file.usedSpace);
      const remainingIndexes = targetGroup.indexes.slice(file.usedSpace);

      groups.splice(destination, 1, {
        id: file.id,
        indexes: usedIndexes,
        freeSpace: 0,
        usedSpace: file.usedSpace,
      });

      if (remainingIndexes.length > 0) {
        groups.splice(destination + 1, 0, {
          id: null,
          indexes: remainingIndexes,
          freeSpace: remainingIndexes.length,
          usedSpace: 0,
        });
      }

      groups.push({
        id: null,
        indexes: file.indexes,
        freeSpace: file.usedSpace,
        usedSpace: 0,
      });
    };

    const checkSum = (groups: File[]): number => {
      return groups
        .flatMap((group) =>
          group.indexes.map(() => (group.id !== null ? group.id : 0)),
        )
        .reduce((sum, id, idx) => sum + id * idx, 0);
    };

    const mappedDisk = parseDisk(input);
    const grouped = groupValuesWithIndexes(mappedDisk);
    const treatedGroup: File[] = [];
    const onHold: File[] = [];

    while (grouped.length > 0) {
      if (grouped[0].freeSpace === 0) {
        const firstGroup = grouped.shift()!;
        if (firstGroup.id !== null) treatedGroup.push(firstGroup);
      } else {
        const lastGroup = grouped.pop()!;
        const freeSpaceIdx = locateFreeSpace(lastGroup, grouped);

        if (freeSpaceIdx !== -1 && lastGroup.id !== null) {
          moveFile(lastGroup, freeSpaceIdx, grouped);
        } else {
          onHold.push(lastGroup);
        }
      }
    }

    return checkSum([...treatedGroup, ...onHold.reverse()]);
  },
};
