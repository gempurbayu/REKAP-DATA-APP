export function toPercentByCategory(nominal_jenis: number | undefined, total: number | undefined) {
    const res = Math.round((nominal_jenis || 0) / (total || 0) * 100);
    return res;
}