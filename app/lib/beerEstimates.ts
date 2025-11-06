// Estimaciones simplificadas para prototipo
export function estimateOG(malts: string[]): number {
  const base = 1.040;
  const bonus = malts.includes('caramelo') ? 0.004 : 0;
  return +(base + bonus).toFixed(3);
}
export function estimateFG(yeasts: string[]): number {
  const base = 1.010;
  const dry = yeasts.includes('us05') ? -0.002 : 0;
  return +(base + dry).toFixed(3);
}
export function estimateABV(og: number, fg: number): number {
  return +(((og - fg) * 131.25)).toFixed(1);
}
export function estimateIBU(hops: string[], boilTime: number): number {
  const intensity = hops.length * (boilTime / 60);
  return Math.round(intensity * 12);
}
