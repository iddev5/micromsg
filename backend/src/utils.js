
export function stringifySafe(obj) {
    return JSON.stringify(obj, (_, v) => typeof v === 'bigint' ? v.toString() : v);
}