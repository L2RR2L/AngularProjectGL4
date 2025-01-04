import { createReducer, on } from '@ngrx/store';
import { initialUploadState } from './upload.state';
import { resetUpload, setDetails, setLoading, setOpen, setThumbnail, setThumbnails, setVideoFile, setVisibility } from './upload.actions';

export const uploadReducer = createReducer(
    initialUploadState,
    on(setOpen, (state, { isOpen }) => ({
        ...state,
        isOpen,
    })),

    on(setLoading, (state, { isLoading }) => ({
        ...state,
        isLoading,
    })),

    on(setVideoFile, (state, { filename }) => ({
        ...state,
        filename,
    })),

    on(setThumbnails, (state, { thumbnails }) => ({
        ...state,
        thumbnails,
    })),

    on(setThumbnail, (state, { thumbnailFileName }) => ({
        ...state,
        thumbnailFileName,
    })),

    on(setDetails, (state, { details }) => ({
        ...state,
        details,
    })),

    on(setVisibility, (state, { visibility }) => ({
        ...state,
        visibility,
    })),

    on(resetUpload, (state) => ({
        ...initialUploadState,
    }))
);
