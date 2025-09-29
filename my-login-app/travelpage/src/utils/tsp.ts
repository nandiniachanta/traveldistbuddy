export interface Coord {
    name: string;
    lat: number;
    lng: number;
}

/**
 * Haversine distance in km between two coordinates
 */
export const haversine = (a: Coord, b: Coord): number => {
    const R = 6371; // Earth radius in km
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;

    const sinDlat = Math.sin(dLat / 2);
    const sinDlng = Math.sin(dLng / 2);
    const aa = sinDlat * sinDlat + sinDlng * sinDlng * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
    return R * c;
};

/**
 * TSP memoized (Held-Karp) without returning to start
 */
export const tspMemoized = (coords: Coord[]): { path: Coord[]; minCost: number } => {
    const n = coords.length;
    const memo: Map<string, number> = new Map();
    const parent: Map<string, number> = new Map();

    const VISITED_ALL = (1 << n) - 1;

    const tsp = (pos: number, mask: number): number => {
        if (mask === VISITED_ALL) return 0; // all visited, stop here

        const key = `${pos}|${mask}`;
        if (memo.has(key)) return memo.get(key)!;

        let min = Infinity;
        for (let next = 0; next < n; next++) {
            if ((mask & (1 << next)) === 0) {
                const newCost = haversine(coords[pos], coords[next]) + tsp(next, mask | (1 << next));
                if (newCost < min) {
                    min = newCost;
                    parent.set(key, next);
                }
            }
        }

        memo.set(key, min);
        return min;
    };

    const minCost = tsp(0, 1 << 0); // start from first city

    // Reconstruct path
    const path: Coord[] = [];
    let mask = 1;
    let pos = 0;

    while (mask !== VISITED_ALL) {
        path.push(coords[pos]);
        const key = `${pos}|${mask}`;
        const next = parent.get(key);
        if (next === undefined) break; // no next city
        mask |= 1 << next;
        pos = next;
    }

    // push last city
    path.push(coords[pos]);

    console.log("Final reconstructed path:", path.map(c => c.name));
    console.log("Minimum distance (km):", minCost.toFixed(2));

    return { path, minCost };
};
