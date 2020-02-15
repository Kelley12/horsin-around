export function prettyFormatDate(uglyDate: string): string {
    const date = new Date(uglyDate);
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
}

export function formatMySQLDate(normalDate: string): string {
    const date = new Date(normalDate);
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
}
