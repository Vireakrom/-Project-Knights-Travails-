function knightMoves(start, end) {
  const MOVES = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  const key = ([x, y]) => `${x},${y}`;
  const onBoard = ([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8;

  const queue = [start];
  const visited = new Set([key(start)]);
  const parent = new Map();

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x === end[0] && y === end[1]) break;

    for (const [dx, dy] of MOVES) {
      const next = [x + dx, y + dy];
      if (!onBoard(next) || visited.has(key(next))) continue;
      visited.add(key(next));
      parent.set(key(next), [x, y]);
      queue.push(next);
    }
  }

  const path = [end];
  let cur = key(end);
  while (parent.has(cur)) {
    const p = parent.get(cur);
    path.unshift(p);
    cur = key(p);
  }
  return path;
}

function printMoves(start, end) {
  const path = knightMoves(start, end);
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((sq) => console.log(`  [${sq}]`));
}

printMoves([0, 0], [3, 3]);
printMoves([3, 3], [0, 0]);
printMoves([0, 0], [7, 7]);
