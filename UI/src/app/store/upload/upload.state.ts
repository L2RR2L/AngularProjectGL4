export interface UploadState {
    filename: string | null,
    isLoading: boolean,
    thumbnailFilename: string | null,
    thumbnails: any | null,
    details: any | null,
    visibility: any | null,
}
export const initialUploadState: UploadState = {
    filename: null,
    isLoading: false,
    thumbnailFilename: null,
    thumbnails: null,
    details: null,
    visibility: null,
};
