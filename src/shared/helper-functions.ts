export function prettyFormatDate(uglyDate: string): string {
    const date = new Date(uglyDate);
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
}
