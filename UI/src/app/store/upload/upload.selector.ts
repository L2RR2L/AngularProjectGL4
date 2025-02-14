import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UploadState } from './upload.state';

export const selectUploadState = (state: AppState) => state.upload;

export const thumbnail = createSelector(
    selectUploadState,
    (state: UploadState) => state.thumbnailFileName
);

export const thumbnails = createSelector(
    selectUploadState,
    (state: UploadState) => state.thumbnails
);

export const filename = createSelector(
    selectUploadState,
    (state: UploadState) => state.filename
);

export const isLoading = createSelector(
    selectUploadState,
    (state: UploadState) => state.isLoading
);

export const isOpen = createSelector(
    selectUploadState,
    (state: UploadState) => state.isOpen
);

export const details = createSelector(
    selectUploadState,
    (state: UploadState) => state.details
);

export const visibility = createSelector(
    selectUploadState,
    (state: UploadState) => state.visibility
);
