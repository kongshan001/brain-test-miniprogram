/**
 * Generates inline SVG data URIs for question illustrations.
 * Each helper returns a data:image/svg+xml URI ready for <img src>.
 */

function svgUri(body: string): string {
  const encoded = encodeURIComponent(body.trim());
  return `data:image/svg+xml,${encoded}`;
}

// --- Spatial ---

export function cubeSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="30" y="50" width="120" height="120" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="3"/>
      <rect x="60" y="20" width="120" height="120" rx="4" fill="#BFDBFE" stroke="#2563EB" stroke-width="3"/>
      <line x1="30" y1="50" x2="60" y2="20" stroke="#2563EB" stroke-width="3"/>
      <line x1="150" y1="50" x2="180" y2="20" stroke="#2563EB" stroke-width="3"/>
      <line x1="30" y1="170" x2="60" y2="140" stroke="#2563EB" stroke-width="3"/>
      <line x1="150" y1="170" x2="180" y2="140" stroke="#2563EB" stroke-width="3"/>
    </svg>
  `);
}

export function clockSvg(hour: number): string {
  const hAngle = (hour % 12) * 30;
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="85" fill="#FEF3C7" stroke="#F59E0B" stroke-width="4"/>
      <circle cx="100" cy="100" r="4" fill="#F59E0B"/>
      <line x1="100" y1="100" x2="100" y2="40" stroke="#1F2937" stroke-width="4" stroke-linecap="round"
        transform="rotate(${hAngle} 100 100)"/>
      <line x1="100" y1="100" x2="140" y2="100" stroke="#1F2937" stroke-width="3" stroke-linecap="round"/>
      ${[1,2,3,4,5,6,7,8,9,10,11,12].map(i => {
        const a = i * 30 * Math.PI / 180;
        const x = 100 + 70 * Math.sin(a);
        const y = 100 - 70 * Math.cos(a);
        return `<text x="${x}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="600" fill="#1F2937">${i}</text>`;
      }).join('')}
    </svg>
  `);
}

export function triangleSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180">
      <polygon points="100,15 185,165 15,165" fill="#DBEAFE" stroke="#2563EB" stroke-width="3"/>
      <text x="100" y="140" text-anchor="middle" font-size="18" fill="#1E40AF" font-weight="600">3条边</text>
    </svg>
  `);
}

export function squareSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180">
      <rect x="25" y="15" width="150" height="150" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="3"/>
      <text x="100" y="100" text-anchor="middle" font-size="18" fill="#1E40AF" font-weight="600">4条边</text>
    </svg>
  `);
}

export function pentagonSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 190">
      <polygon points="100,10 185,70 165,165 35,165 15,70" fill="#DBEAFE" stroke="#2563EB" stroke-width="3"/>
      <text x="100" y="120" text-anchor="middle" font-size="18" fill="#1E40AF" font-weight="600">5条边</text>
    </svg>
  `);
}

export function coneTopViewSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="70" fill="#DBEAFE" stroke="#2563EB" stroke-width="3"/>
      <circle cx="100" cy="100" r="12" fill="#2563EB"/>
      <line x1="100" y1="30" x2="100" y2="170" stroke="#93C5FD" stroke-width="1.5" stroke-dasharray="4"/>
      <line x1="30" y1="100" x2="170" y2="100" stroke="#93C5FD" stroke-width="1.5" stroke-dasharray="4"/>
    </svg>
  `);
}

export function cylinderSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <ellipse cx="100" cy="140" rx="70" ry="20" fill="#BFDBFE" stroke="#2563EB" stroke-width="3"/>
      <rect x="30" y="50" width="140" height="90" fill="#DBEAFE" stroke="none"/>
      <line x1="30" y1="50" x2="30" y2="140" stroke="#2563EB" stroke-width="3"/>
      <line x1="170" y1="50" x2="170" y2="140" stroke="#2563EB" stroke-width="3"/>
      <ellipse cx="100" cy="50" rx="70" ry="20" fill="#EFF6FF" stroke="#2563EB" stroke-width="3"/>
    </svg>
  `);
}

export function mobiusSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140">
      <path d="M20 70 Q60 20 140 70 Q180 100 120 60 Q60 20 80 100 Q100 140 180 70"
        fill="none" stroke="#7C3AED" stroke-width="4" stroke-linecap="round"/>
      <circle cx="20" cy="70" r="4" fill="#7C3AED"/>
      <circle cx="180" cy="70" r="4" fill="#7C3AED"/>
    </svg>
  `);
}

export function diceSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="25" y="25" width="150" height="150" rx="12" fill="#FEF3C7" stroke="#F59E0B" stroke-width="3"/>
      <circle cx="70" cy="70" r="10" fill="#1F2937"/>
      <circle cx="130" cy="130" r="10" fill="#1F2937"/>
      <circle cx="100" cy="100" r="10" fill="#1F2937"/>
      <circle cx="130" cy="70" r="10" fill="#1F2937"/>
      <circle cx="70" cy="130" r="10" fill="#1F2937"/>
    </svg>
  `);
}

export function mirrorSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180">
      <rect x="95" y="10" width="10" height="160" fill="#CBD5E1" rx="2"/>
      <circle cx="60" cy="70" r="20" fill="#DBEAFE" stroke="#2563EB" stroke-width="2.5"/>
      <rect x="42" y="100" width="36" height="50" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="2.5"/>
      <circle cx="140" cy="70" r="20" fill="#FEE2E2" stroke="#EF4444" stroke-width="2.5"/>
      <rect x="122" y="100" width="36" height="50" rx="4" fill="#FEE2E2" stroke="#EF4444" stroke-width="2.5"/>
      <text x="60" y="160" text-anchor="middle" font-size="12" fill="#2563EB">你</text>
      <text x="140" y="160" text-anchor="middle" font-size="12" fill="#EF4444">镜像</text>
    </svg>
  `);
}

export function symmetrySvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160">
      <line x1="100" y1="10" x2="100" y2="150" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="6"/>
      <rect x="55" y="30" width="40" height="40" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" transform="rotate(-15 75 50)"/>
      <rect x="105" y="30" width="40" height="40" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" transform="rotate(15 125 50)"/>
    </svg>
  `);
}

// --- Number ---

export function numberLineSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
      <line x1="15" y1="40" x2="185" y2="40" stroke="#2563EB" stroke-width="2"/>
      ${[0,1,2,3,4,5,6,7,8,9,10].map(i => {
        const x = 15 + i * 17;
        return `<line x1="${x}" y1="35" x2="${x}" y2="45" stroke="#2563EB" stroke-width="1.5"/><text x="${x}" y="65" text-anchor="middle" font-size="10" fill="#64748B">${i}</text>`;
      }).join('')}
      <circle cx="15" cy="40" r="5" fill="#2563EB"/>
    </svg>
  `);
}

export function fractionSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140">
      <rect x="20" y="10" width="160" height="50" rx="6" fill="#DBEAFE"/>
      <rect x="20" y="80" width="160" height="50" rx="6" fill="#DBEAFE" stroke="#2563EB" stroke-width="2"/>
      <rect x="20" y="10" width="160" height="50" rx="6" fill="#BFDBFE" stroke="#2563EB" stroke-width="2"/>
      <text x="100" y="40" text-anchor="middle" font-size="18" fill="#1E40AF" font-weight="600">1/2 + 1/4</text>
      <text x="100" y="112" text-anchor="middle" font-size="18" fill="#1E40AF" font-weight="600">= ?</text>
    </svg>
  `);
}

export function pieChartSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="75" fill="#DBEAFE" stroke="#2563EB" stroke-width="3"/>
      <line x1="100" y1="25" x2="100" y2="175" stroke="#93C5FD" stroke-width="2"/>
      <line x1="100" y1="100" x2="163" y2="137" stroke="#93C5FD" stroke-width="2"/>
      <circle cx="100" cy="100" r="5" fill="#2563EB"/>
    </svg>
  `);
}

export function barChartSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160">
      <line x1="40" y1="140" x2="180" y2="140" stroke="#94A3B8" stroke-width="2"/>
      <rect x="50" y="80" width="25" height="60" rx="3" fill="#2563EB"/>
      <rect x="87" y="50" width="25" height="90" rx="3" fill="#7C3AED"/>
      <rect x="124" y="30" width="25" height="110" rx="3" fill="#F59E0B"/>
      <rect x="161" y="60" width="25" height="80" rx="3" fill="#22C55E"/>
    </svg>
  `);
}

// --- Logic ---

export function patternDotsSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
      <circle cx="20" cy="40" r="10" fill="#2563EB"/>
      <circle cx="60" cy="40" r="10" fill="#2563EB"/>
      <circle cx="100" cy="40" r="10" fill="#2563EB"/>
      <circle cx="140" cy="40" r="10" fill="#CBD5E1"/>
      <circle cx="180" cy="40" r="10" fill="#CBD5E1"/>
      <text x="160" y="36" font-size="24" fill="#64748B" font-weight="600">?</text>
    </svg>
  `);
}

export function sequenceSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 90">
      <rect x="5" y="20" width="30" height="40" rx="6" fill="#DBEAFE"/>
      <text x="20" y="46" text-anchor="middle" font-size="13" fill="#1E40AF" font-weight="600">2</text>
      <text x="45" y="45" font-size="16" fill="#94A3B8">→</text>
      <rect x="55" y="20" width="30" height="40" rx="6" fill="#DBEAFE"/>
      <text x="70" y="46" text-anchor="middle" font-size="13" fill="#1E40AF" font-weight="600">4</text>
      <text x="95" y="45" font-size="16" fill="#94A3B8">→</text>
      <rect x="105" y="20" width="30" height="40" rx="6" fill="#DBEAFE"/>
      <text x="120" y="46" text-anchor="middle" font-size="13" fill="#1E40AF" font-weight="600">8</text>
      <text x="145" y="45" font-size="16" fill="#94A3B8">→</text>
      <rect x="155" y="20" width="30" height="40" rx="6" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/>
      <text x="170" y="46" text-anchor="middle" font-size="13" fill="#F59E0B" font-weight="600">?</text>
    </svg>
  `);
}

export function logicVennSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180">
      <circle cx="100" cy="65" r="55" fill="#DBEAFE" stroke="#2563EB" stroke-width="2" opacity="0.7"/>
      <circle cx="60" cy="115" r="45" fill="#DDD6FE" stroke="#7C3AED" stroke-width="2" opacity="0.7"/>
      <circle cx="140" cy="115" r="45" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" opacity="0.7"/>
      <text x="100" y="50" text-anchor="middle" font-size="12" fill="#1E40AF" font-weight="600">A</text>
      <text x="40" y="135" text-anchor="middle" font-size="12" fill="#6D28D9" font-weight="600">B</text>
      <text x="160" y="135" text-anchor="middle" font-size="12" fill="#991B1B" font-weight="600">C</text>
    </svg>
  `);
}

export function pirateGoldSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140">
      <circle cx="100" cy="60" r="30" fill="#FEF3C7" stroke="#F59E0B" stroke-width="3"/>
      <text x="100" y="66" text-anchor="middle" font-size="14" fill="#B45309" font-weight="700">100</text>
      ${[0, 1, 2, 3, 4].map(i => {
        const x = 35 + i * 35;
        return `<circle cx="${x}" cy="120" r="14" fill="#DBEAFE" stroke="#2563EB" stroke-width="2"/><text x="${x}" y="125" text-anchor="middle" font-size="9" fill="#1E40AF">P${i+1}</text>`;
      }).join('')}
    </svg>
  `);
}

// --- Memory ---

export function periodicTableSvg(): string {
  return svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140">
      <rect x="10" y="10" width="40" height="40" rx="3" fill="#DBEAFE" stroke="#2563EB" stroke-width="2"/>
      <text x="30" y="35" text-anchor="middle" font-size="16" fill="#1E40AF" font-weight="700">H</text>
      <rect x="55" y="10" width="40" height="40" rx="3" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" opacity="0.5"/>
      <rect x="100" y="10" width="40" height="40" rx="3" fill="#DBEAFE" stroke="#2563EB" stroke-width="2"/>
      <text x="120" y="35" text-anchor="middle" font-size="16" fill="#1E40AF" font-weight="700">O</text>
      <rect x="10" y="55" width="40" height="40" rx="3" fill="#FEE2E2" stroke="#EF4444" stroke-width="2" opacity="0.5"/>
      <rect x="55" y="55" width="40" height="40" rx="3" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/>
      <text x="75" y="80" text-anchor="middle" font-size="16" fill="#B45309" font-weight="700">Au</text>
      <rect x="100" y="55" width="40" height="40" rx="3" fill="#DCFCE7" stroke="#22C55E" stroke-width="2"/>
      <text x="120" y="80" text-anchor="middle" font-size="14" fill="#166534" font-weight="700">Na</text>
    </svg>
  `);
}

export const TYPE_ICONS: Record<string, string> = {
  logic: '🧩',
  number: '🔢',
  spatial: '📐',
  memory: '🧠',
};

/**
 * Generate a relevant SVG image for a question based on its type and ID.
 * Returns undefined if no suitable illustration is available.
 */
export function getQuestionImage(type: string, id: string): string | undefined {
  const map: Record<string, () => string> = {
    S01: squareSvg,
    S02: pentagonSvg,
    S03: () => clockSvg(3),
    S05: cubeSvg,
    S07: squareSvg,
    S08: mirrorSvg,
    S09: diceSvg,
    S11: cubeSvg,
    S13: () => clockSvg(3),
    S17: coneTopViewSvg,
    S21: mobiusSvg,
    S34: () => clockSvg(6),
  };

  if (map[id]) return map[id]();

  // Generic illustrations by type
  const generic: Record<string, string> = {
    spatial: cubeSvg(),
    number: barChartSvg(),
    logic: sequenceSvg(),
    memory: periodicTableSvg(),
  };

  return generic[type];
}
