import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../api';
import { Observable } from 'rxjs';
import { Thumbnail } from '../../types/thumbnail';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor(private http: HttpClient) { }

    validateFile(file: File): boolean {
        return file.type === 'video/mp4' && file.size <= 25 * 1024 * 1024;
    }

    uploadFile(file: File): Observable<{ filename: string }> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<{ filename: string }>(API.PostUploadFile(), formData);
    }

    getThumbnails(filename: string): Observable<{ thumbnails: Thumbnail[] }> {
        return this.http.post<{ thumbnails: Thumbnail[] }>(
            API.GetThumbnails(),
            { filename }
        )
    }
}
