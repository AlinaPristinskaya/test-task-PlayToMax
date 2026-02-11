import Cell from './Cell.js';
//створюю клас Поле з методами пошуку и видалення груп
export default class Board {
  constructor(matrix) {
    this.rows = matrix.length;
    this.cols = matrix[0].length;
    this.grid = matrix.map((row, r) =>
      row.map((value, c) => new Cell(r, c, value))
    ); // кожен елемент матриці перетворюю на об'єкт Cell (цей клас описаний в src/Cell.js)
  }

  findGroup(startRow, startCol) {
    // Починаю шукати групу для цього ...

    const targetValue = this.grid[startRow][startCol].value;
    // через this звертаюся до властивостей поточного об'єкта Board
    // 1 зберігаю значення клітинки, з якої починаю пошук а саме
    const stack = [this.grid[startRow][startCol]];
    // 2 створюю стек і додаю туди стартову клітинку
    // звідси я буду брати наступні клітинки які почнут додаватися після першої ітерації циклу
    const visited = new Set();
    // 3 щоб не зациклились бо одна клітинка додавалась би нескінченно
    // мені потрібен Set() (це вбудований в JS клас що не допускає дублікатів) з клітинками які вже відвіданні
    const group = []; // 4 Це буде група всіх знайдених однотипних елементів

    while (stack.length > 0) {
      //  5 запускаю цикл який працюватиме доти, доки в масиві стеку залишаються елементи для перевірки.
      const cell = stack.pop(); // в циклі я використовую pop, не shift()
      // бо хочу щоб видалявся останій елемент масиву стек, хоча і то і інше спраціє
      const key = `${cell.row},${cell.col}`; // записую ключ! щоб...

      if (visited.has(key)) continue; // не зациклитись
      visited.add(key);

      if (cell.value !== targetValue) continue; // тут вирішується чи входе цей елемент в групу інщі відсіюються

      group.push(cell); // 6 записую елемент в group

      const { row, col } = cell; // 7 і витягую їого координати 

      //щоб додати у стек нових сусідів якщо вони є

      if (row > 0)
        //перевіряю щоб поточний елемент не стояв в верхньму ряду
        stack.push(this.grid[row - 1][col]); // тоді додаю в стек сусіда зверху

      if (row < this.rows - 1)
        //перевіряю щоб поточний елемент не стояв в нижньому ряду
        stack.push(this.grid[row + 1][col]); // тоді додаю в стек сусіда знизу

      if (col > 0)
        //перевіряю щоб поточний елемент не стояв країній зліва
        stack.push(this.grid[row][col - 1]); // тоді додаю в стек сусіда зліва

      if (col < this.cols - 1)
        //перевіряю щоб поточний елемент не стояв країній праворуч
        stack.push(this.grid[row][col + 1]); // тоді додаю в стек сусіда зліва
    }

    return group;
  }

  // Видалення групи

  removeGroup(group) {
    group.forEach((cell) => {
      cell.value = '';
    });
  }
}
