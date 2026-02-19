import Board from "./Board.js";

import {
  getSquareNeighbors,
  getTriangleNeighbors,
  getHexNeighbors,
} from "./neighbors.js";

import { renderSquare } from "./renderers/squareRenderer.js";
import { renderTriangle } from "./renderers/triangleRenderer.js";
import { renderHex } from "./renderers/hexRenderer.js";

export default class Game {
  constructor(containerId, matrix, type = "square") {
    // Получаем контейнер, куда будем рендерить
    this.container = document.getElementById(containerId);

    // Тип сетки: square / triangle / hex
    this.type = type;

    // 🔥 Выбираем стратегию соседей
    let getNeighbors;

    if (type === "triangle") {
      getNeighbors = getTriangleNeighbors;
    } else if (type === "hex") {
      getNeighbors = getHexNeighbors;
    } else {
      getNeighbors = getSquareNeighbors;
    }

    // 🔥 Создаём один универсальный Board
    this.board = new Board(matrix, getNeighbors);

    // Первый рендер
    this.render();
  }

  // Обработчик клика по ячейке
  handleCellClick = (row, col) => {
    // Находим группу
    const group = this.board.findGroup(row, col);

    // Если пусто — ничего не делаем
    if (!group.length) return;

    console.log(
      `[${this.type}] group size: ${group.length}, value: ${this.board.grid[row][col].value}`
    );

    // Удаляем группу
    this.board.removeGroup(group);

    // Перерисовываем поле
    this.render();
  };

  // Рендер
  render() {
    // Очищаем контейнер
    this.container.innerHTML = "";

    // 🔥 Выбираем нужный renderer

    if (this.type === "triangle") {
      renderTriangle(this.container, this.board, this.handleCellClick);
      return;
    }

    if (this.type === "hex") {
      renderHex(this.container, this.board, this.handleCellClick);
      return;
    }

    // По умолчанию — квадрат
    renderSquare(this.container, this.board, this.handleCellClick);
  }
}
