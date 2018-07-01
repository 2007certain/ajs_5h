import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from "../constants/urls";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataService {
    API_URL = API_URL.host;
    headers;
    access_token: String;
    public loading:Boolean = false;
    constructor(
        private httpClient: HttpClient
    ) {
        this.getToken();
        this.headers = {
            headers: new HttpHeaders({
                // "Content-Type": "application/x-www-form-urlencoded",
                "Content-Type": "application/json",
                "Authorization": "bearer " + this.access_token
            })
        };
    }
    
    getToken() {
        let data = JSON.parse(localStorage.getItem('data'));
        if (data) {
            this.access_token = data.access_token;
        } else {
            return false;
        }
    }

    getApiUrl() {
        return this.API_URL;
    }

    getData(url):Observable<any> {
        return this.httpClient.post(url, {}, this.headers);
    }

    postDataObject(url, data):Observable<any> {
        return this.httpClient.post(url, data, this.headers);
    }
}