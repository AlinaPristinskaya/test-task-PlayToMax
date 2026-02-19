import Cell from "./Cell.js";

export default class Board {
  constructor(matrix, getNeighbors) {
    this.rows = matrix.length;
    this.cols = matrix[0].length;

    this.getNeighbors = getNeighbors; // 🔥 ключевая строка

    this.grid = matrix.map((row, r) =>
      row.map((value, c) => new Cell(r, c, value))
    );
  }

  findGroup(startRow, startCol) {
    const targetValue = this.grid[startRow][startCol].value;
    const stack = [this.grid[startRow][startCol]];
    const visited = new Set();
    const group = [];

    while (stack.length > 0) {
      const cell = stack.pop();
      const key = `${cell.row},${cell.col}`;

      if (visited.has(key)) continue;
      visited.add(key);

      if (cell.value !== targetValue) continue;

      group.push(cell);

      // 🔥 теперь вызываем переданную функцию
      const neighbors = this.getNeighbors(
        cell.row,
        cell.col,
        this.rows,
        this.cols,
        this.grid
      );

      neighbors.forEach((n) => stack.push(n));
    }

    return group;
  }

  removeGroup(group) {
    group.forEach((cell) => {
      cell.value = "";
    });
  }
}
