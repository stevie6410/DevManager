export class CRUDMetadata{
    entityName: string;
    entityNamePlural: string;
    apiName: string;

    listCols: ColumnDef[];
    detailCols: ColumnDef[];
}

export class ColumnDef {
    name: string;
    label: string;
    date?: boolean;
    values?: any[];
    required?: boolean;
    routerLink?: string;
    routerParam?: string;
}
