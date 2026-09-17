import dayjs from "dayjs";

export function archive(value: string | number): string {
    const date = new Date(value);
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
