export class CrudTableConfig {
    public cols: CrudTableColConfig[]
    public editable: boolean;
    public selectionMode: string;
}

export class CrudTableColConfig {
    public name: string;
    public label: string;
    public editable: boolean;
}