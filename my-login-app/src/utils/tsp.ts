export interface Coord {
  lat: number;
  lng: number;
}

// Haversine distance between two coordinates
export const haversine = (a: Coord, b: Coord): number => {
  const R = 6371; // Earth radius in km
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
};

// Memoized TSP using bitmask
export const tspMemoized = (coords: Coord[]): { minCost: number; path: Coord[] } => {
  console.log("Inside tspMemoized, received coords:", coords);

  const n = coords.length;

  // Precompute distance matrix
  const dist: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dist[i][j] = haversine(coords[i], coords[j]);
    }
  }

  // DP table and parent tracker
  const dp: number[][] = Array.from({ length: 1 << n }, () => Array(n).fill(-1));
  const parent: number[][] = Array.from({ length: 1 << n }, () => Array(n).fill(-1));

  const tsp = (mask: number, pos: number): number => {
    if (mask === (1 << n) - 1) return dist[pos][0]; // return to start
    if (dp[mask][pos] !== -1) return dp[mask][pos];

    let ans = Infinity;
    for (let next = 0; next < n; next++) {
      if ((mask & (1 << next)) === 0) {
        const newCost = dist[pos][next] + tsp(mask | (1 << next), next);
        if (newCost < ans) {
          ans = newCost;
          parent[mask][pos] = next;
          console.log(`Updated parent[${mask}][${pos}] = ${next}`);
        }
      }
    }

    dp[mask][pos] = ans;
    return ans;
  };

  const minCost = tsp(1, 0);

  // Reconstruct path
  const path: Coord[] = [];
  let mask = 1;
  let pos = 0;

  while (path.length < n) {
    path.push(coords[pos]);
    const next = parent[mask][pos];

    if (next === -1 || next === undefined) {
      console.error(`Invalid parent at mask=${mask}, pos=${pos}`);
      break;
    }

    pos = next;
    mask |= (1 << pos);
  }

  path.push(coords[0]); // return to start
  console.log("Final reconstructed path:", path);

  return { minCost, path };
};