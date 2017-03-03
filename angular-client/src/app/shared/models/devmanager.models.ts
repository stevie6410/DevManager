export class Department {
    id: number;
    name: string;
    owner: string;
    supportedSystems: SupportedSystem[];
}

export class SupportedSystem {
    id: number;
    name: string;
    description: string;
}

export class SoftwarePackage {
    Id: number;
    Name: string;
    Description: string;
}

export class ReportSpecHeader {
    Id: number;
    reportName: string;
    createdDate: Date;
    preparedBy: string;
    businessArea: string;
    reportType: string;
    reportingTool: string;
    businessOwner: string;
    businessPurpose: string;
    stdVsAdHocDesc: string;
    requiresWorldData: boolean;
    requiresWorldDataNotes: string;
    requiresLocalDataStorage: boolean;
    requiresLocalDataStorageNotes: string;
    requiresApplicationInterface: boolean;
    requiresApplicationInterfaceNotes: string;
    groupOrderByDesc: string;
    subTotalSummaryDesc: string;
    notes: string;
    onDemmandDelivery: boolean;
    onDemmandDeliveryNotes: string;
    emailSubscription: boolean;
    emailSubscriptionNotes: string;
    excelDataConnection: boolean;
    excelDataConnectionNotes: string;
    liveDashboard: boolean;
    liveDashboardNotes: string;
    softwarePackageId: number;
    devRequestId: number;
    reportSpecDataSelections: any[];
    reportSpecFilters: any[];
    softwarePackage: SoftwarePackage;
    reportSpecParameters: any[];
    reportSpecSourceDatas: ReportSpecSourceData[];
}

export class ReportSpecSourceData{
    Id: number;
    ElementName: string;
    ReportSpecificationId: number;
    SourceSystem: string;
    TableName: string;
    TableNameId: string;
    RowPosition: number;
}