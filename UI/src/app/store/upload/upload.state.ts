import { Details } from "../../types/details";
import { Thumbnail } from "../../types/thumbnail";

export interface UploadState {
    isOpen: boolean,
    isLoading: boolean,
    thumbnails: Array<Thumbnail> | null,
    filename: string | null,
    thumbnailFileName: string | null,
    details: Details | null,
    visibility: number | null,
    uploader: string | null
}
export const initialUploadState: UploadState = {
    isOpen: false,
    filename: null,
    isLoading: false,
    thumbnailFileName: null,
    thumbnails: null,
    details: null,
    visibility: null,
    uploader: null
};
