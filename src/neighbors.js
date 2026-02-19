// квадрат
export function getSquareNeighbors(row, col, rows, cols, grid) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  return collectNeighbors(dirs, row, col, rows, cols, grid);
}

// треугольник
export function getTriangleNeighbors(row, col, rows, cols, grid) {
  const up = (row + col) % 2 === 0;

  const dirs = up
    ? [
        [0, -1],
        [0, 1],
        [1, 0],
      ]
    : [
        [0, -1],
        [0, 1],
        [-1, 0],
      ];

  return collectNeighbors(dirs, row, col, rows, cols, grid);
}

// hex
export function getHexNeighbors(row, col, rows, cols, grid) {
  const evenDirs = [
    [-1, -1], [-1, 0],
    [0, -1], [0, 1],
    [1, -1], [1, 0],
  ];

  const oddDirs = [
    [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, 0], [1, 1],
  ];

  const dirs = row % 2 === 0 ? evenDirs : oddDirs;

  return collectNeighbors(dirs, row, col, rows, cols, grid);
}

// общая функция (чтобы не дублировать код)
function collectNeighbors(dirs, row, col, rows, cols, grid) {
  const res = [];

  for (const [dr, dc] of dirs) {
    const r = row + dr;
    const c = col + dc;

    if (r >= 0 && r < rows && c >= 0 && c < cols) {
      res.push(grid[r][c]);
    }
  }

  return res;
}
