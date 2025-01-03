export interface UploadState {
    isOpen: boolean,
    isLoading: boolean,
    thumbnails: any | null,
    filename: string | null,
    thumbnailFileName: string | null,
    details: any | null,
    visibility: any | null,
}
export const initialUploadState: UploadState = {
    isOpen: false,
    filename: null,
    isLoading: false,
    thumbnailFileName: null,
    thumbnails: null,
    details: null,
    visibility: null,
};
