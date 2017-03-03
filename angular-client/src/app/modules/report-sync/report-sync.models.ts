export class DBObject{
    id: number;
    guid: string;
    databaseName: string;
    schemaName: string;
    objectName: string;
    lastEventType: string;
    createdOn: Date;
    createdBy: string;
    lastModifiedBy: string;
    lastModifiedOn: Date;
    live: boolean;
    objectKey: string;
    objectType: string;
    isInPackage: boolean;
}

export class DBObjectChange{
    deployOrder: number;
    eventDate: Date;
    eventType: string;
    eventDDL: string;
    databaseName: string;
    schemaName: string;
    objectName: string;
    type: string;
    hostName: string;
    ipAddress: string;
    programName: string;
    loginName: string;
    guid: string;
    id: number;
}

export class Package{
    id: number;
    name: string;
    description: string;
    ticketRef: string;
    createdOn: Date;
    createdBy: string;
    status: string;
    packageDbObjects: DBObject[];
    packageReports: SSRSReport[];
    eventLog: DeploymentEvent[];
    deployments: Deployment[];
}

export class DeploymentEvent{
    message: string;
    timestamp: Date;
    notes: string;
}

export class SSRSReport{
    id: number;
    name: string;
    reportId: string;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string;
    path: string;
    type: number;
    description: string;
    package: Package;
}

export class DeployPackageStatus{
    name: string;
}

export class DBObjectRequestDefinition{
    databaseName: string;
    schemaName: string;
    objectName: string;
}

export class DBObjectKeyRequestDefinition{
    objectKey: string;
}

export class Deployment{
    id: number;
    deployEnvironment: Environment;
    deploy_environment_id: number;
    status: string;
    deployedBy: string;
    deployedOn: Date;
    createdOn: Date;
    createdBy: string;
    package: Package;
    package_id: number;
    deploymentEvents: DeploymentEvent[];
}

export class Environment{
    id: number;
    serverName: string;
    databaseName: string;
    username: string;
    password: string;
    useWindowsAuth: boolean;
    name: string;
    category: string;
}