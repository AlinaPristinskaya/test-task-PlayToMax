// src/renderers/triangleRenderer.js
export function renderTriangle(container, board, onClick) {
  const rows = board.rows;
  const cols = board.cols;

  const s = 60; // сторона треугольника
  const h = (Math.sqrt(3) / 2) * s;

  const padding = 12;

  // треугольная мозаика: по ширине шаг s/2, по высоте шаг h
  const width = (cols - 1) * (s / 2) + s + padding * 2;
  const height = (rows - 1) * h + h + padding * 2;

  container.innerHTML = "";

  const svg = createSvg(width, height);
  svg.classList.add("tri-svg");

  // Отдельные группы: сначала полигоны, потом текст (чтобы текст был сверху)
  const polygonsLayer = svgGroup("tri-polygons");
  const textLayer = svgGroup("tri-text");

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = board.grid[r][c];

      const x = padding + c * (s / 2);
      const y = padding + r * h;

      const up = (r + c) % 2 === 0;

      const points = up
        ? `${x},${y + h} ${x + s / 2},${y} ${x + s},${y + h}`
        : `${x},${y} ${x + s},${y} ${x + s / 2},${y + h}`;

      const className = cell.value ? "tri-cell" : "tri-cell tri-empty";
      const poly = svgPolygon(points, className);

      // Клики только по непустым
      if (cell.value) {
        poly.style.cursor = "pointer";
        poly.addEventListener("click", () => onClick(r, c));
      } else {
        poly.style.cursor = "default";
      }

      polygonsLayer.appendChild(poly);

      // emoji (только если есть value)
      if (cell.value) {
        const cx = x + s / 2;
        const cy = up ? y + (2 * h) / 3 : y + h / 3;

        const t = svgText(cx, cy, cell.value);
        // ✅ гарантируем видимость прямо здесь
        t.setAttribute("fill", "#fff");
        t.setAttribute("font-size", "20");
        t.setAttribute("text-anchor", "middle");
        t.setAttribute("dominant-baseline", "middle");
        t.style.pointerEvents = "none";

        textLayer.appendChild(t);
      }
    }
  }

  svg.appendChild(polygonsLayer);
  svg.appendChild(textLayer);
  container.appendChild(svg);
}

/* =========================
   Helpers
========================= */

function createSvg(w, h) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "520"); // можно вынести в CSS
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  return svg;
}

function svgGroup(className) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("class", className);
  return g;
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
  t.textContent = text;
  return t;
}
