import Board from './Board.js';
// створюю клас Game який обробляє кліки,
// викликає логіку Board та рендерить поле
export default class Game {
  constructor(containerId, matrix) {
    this.container = document.getElementById(containerId);
    //отримую контейнер, у який буду рендерити поле
    this.board = new Board(matrix);
    //створюю екземпляр класу Board і передаю туди матрицю
    this.render();
  }

  render() {
    this.container.innerHTML = ''; // Я очищаю контейнер
    // Я проходжу по кожному рядку матриці і по кожній клітинці в рядку
    this.board.grid.forEach((row) => {
      row.forEach((cell) => {
        // створюю саме button для кожної клітинки тому що зручно
        // за допомогою властивості disabled уникнути повторних кліків по тій самій групі

        const button = document.createElement('button');
        button.classList.add('cell'); // це для стилів

        button.name = cell.value;
        button.textContent = cell.value;

        // Якщо клітинка "видалена" — кнопка стає неактивною
        if (!cell.value) {
          button.disabled = true;
        }
        // обробник кліку на кнопку
        button.addEventListener('click', () => {
          //викликаю метод пошуку групи
          const group = this.board.findGroup(cell.row, cell.col);

          console.log(
            `Виявлено групу з ${group.length} елементів типу ${cell.value}`
          );
          //видаляю знайдену групу
          this.board.removeGroup(group);
          // перемальовую поле
          this.render();
        });

        this.container.appendChild(button);
      });
    });
  }
}
