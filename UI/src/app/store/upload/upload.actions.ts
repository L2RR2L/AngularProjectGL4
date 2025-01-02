import { createAction, props } from '@ngrx/store';

export const setLoading = createAction(
    '[Upload] Set Loading',
    props<{ isLoading: boolean }>()
);

export const setVideoFile = createAction(
    '[Channel] Set Video File',
    props<{ filename: string | null }>()
);

export const setThumbnails = createAction(
    '[Channel] Set Thumbnails',
    props<{ thumbnails: any | null }>()
);

export const setThumbnail = createAction(
    '[Channel] Set Thumbnail',
    props<{ thumbnailFileName: string | null }>()
);

export const setDetails = createAction(
    '[Channel] Set Details',
    props<{ details: any | null }>()
);

export const setVisibility = createAction(
    '[Channel] Set Visibility',
    props<{ visibility: any | null }>()
);

export const resetUpload = createAction('[Channel] Reset Upload');