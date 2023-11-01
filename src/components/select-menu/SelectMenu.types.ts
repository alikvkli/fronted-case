export type TSelectMenu = {
    data: string[] | undefined;
    selected: string[];
    setSelected: (value: string[]) => void;
}