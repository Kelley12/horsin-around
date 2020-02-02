export function prettyFormatDate(uglyDate: string): string {
    const date = new Date(uglyDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}
