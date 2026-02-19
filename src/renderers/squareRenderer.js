export function renderSquare(container, board, onClick) {
  board.grid.forEach((row) => {
    row.forEach((cell) => {
      const button = document.createElement("button");
      button.classList.add("cell");
      button.textContent = cell.value || "";
      button.disabled = !cell.value;

      button.addEventListener("click", () => onClick(cell.row, cell.col));
      container.appendChild(button);
    });
  });
}
