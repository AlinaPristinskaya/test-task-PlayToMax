export function renderHex(container, board, onClick) {
  const rows = board.rows;
  const cols = board.cols;

  const size = 28; // радиус
  const hexW = Math.sqrt(3) * size;
  const hexH = 2 * size;
  const vStep = 1.5 * size;

  const width = cols * hexW + hexW / 2 + 20;
  const height = rows * vStep + size + 20;

  const svg = makeSvg(width, height);
  svg.classList.add("hex-svg");

  for (let r = 0; r < rows; r++) {
    const shift = (r % 2) * (hexW / 2);

    for (let c = 0; c < cols; c++) {
      const cell = board.grid[r][c];

      const cx = 10 + shift + c * hexW + hexW / 2;
      const cy = 10 + r * vStep + size;

      const poly = svgPolygon(hexPoints(cx, cy, size), cell.value ? "hex-cell" : "hex-cell hex-empty");
      if (cell.value) poly.addEventListener("click", () => onClick(r, c));

      svg.appendChild(poly);

      if (cell.value) svg.appendChild(svgText(cx, cy + 1, cell.value));
    }
  }

  container.appendChild(svg);
}

function makeSvg(w, h) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "420");
  return svg;
}

function hexPoints(cx, cy, size) {
  const angles = [90, 150, 210, 270, 330, 30].map((a) => (Math.PI / 180) * a);
  return angles
    .map((a) => `${cx + size * Math.cos(a)},${cy + size * Math.sin(a)}`)
    .join(" ");
}

function svgPolygon(points, className) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  el.setAttribute("points", points);
  el.setAttribute("class", className);
  return el;
}

function svgText(x, y, text) {
  const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
  t.setAttribute("x", x);
  t.setAttribute("y", y);
  t.setAttribute("text-anchor", "middle");
  t.setAttribute("dominant-baseline", "middle");
  t.setAttribute("class", "cell-emoji");
  t.textContent = text;
  return t;
}
