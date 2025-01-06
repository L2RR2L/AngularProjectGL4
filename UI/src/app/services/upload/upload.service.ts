import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../api';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    constructor(private http: HttpClient) { }

    postUploadVideo(state: any) {
        return this.http.post(API.PostUploadVideo(), {
            ...state.details,
            uploader: state.uploader,
            thumbnailFilename: state.thumbnailFileName,
            visibility: state.visibility,
            filename: state.filename
        });
    }
}
