//створюю клас Cell який представляє одну клітинку поля.

export default class Cell {
  constructor(row, col, value) {
    this.row = row; //індекс рядка
    this.col = col; //індекс колонки
    this.value = value; // значення клітинки (емодзі)
  }
}
