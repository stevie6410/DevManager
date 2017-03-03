import { Http, Response, RequestOptions } from '@angular/http';

export class ServiceHelper{

    get DefaultRequestOptions():RequestOptions{
        return new RequestOptions({
            withCredentials: true
        });
    }

    get apiPathRoot(): string {
        return "http://localhost:4201/api/";
    }
}