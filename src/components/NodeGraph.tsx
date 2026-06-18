/**
 * Abstração visual de dados/IA — grafo de nós conectados.
 * SVG puro, sem imagens. Usado como elemento decorativo do hero.
 */
export default function NodeGraph({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 60, y: 70, r: 5, c: "#6360EC" },
    { x: 170, y: 40, r: 4, c: "#6E6A90" },
    { x: 250, y: 120, r: 6, c: "#89D6BC" },
    { x: 120, y: 160, r: 5, c: "#6360EC" },
    { x: 300, y: 60, r: 4, c: "#89D6BC" },
    { x: 210, y: 220, r: 5, c: "#89D6BC" },
    { x: 40, y: 230, r: 4, c: "#6360EC" },
    { x: 330, y: 190, r: 5, c: "#6360EC" },
  ];
  const edges = [
    [0, 1], [0, 3], [1, 4], [1, 2], [2, 4], [2, 5],
    [3, 6], [3, 5], [5, 7], [2, 7], [3, 0], [5, 6],
  ];

  return (
    <svg
      viewBox="0 0 380 280"
      fill="none"
      className={className}
      role="img"
      aria-label="Representação abstrata de uma rede de dados conectados"
    >
      <defs>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6360EC" stopOpacity="0.7" />
          <stop offset="1" stopColor="#89D6BC" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#edge)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.c}
          className="node-dot"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </svg>
  );
}
