import { createAction, props } from '@ngrx/store';
import { Thumbnail } from '../../types/thumbnail';
import { Details } from '../../types/details';

export const setOpen = createAction(
    '[Upload] Set Open',
    props<{ isOpen: boolean }>()
);

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
    props<{ thumbnails: Array<Thumbnail> | null }>()
);

export const setThumbnail = createAction(
    '[Channel] Set Thumbnail',
    props<{ thumbnailFileName: string | null }>()
);

export const setDetails = createAction(
    '[Channel] Set Details',
    props<{ details: Details | null }>()
);

export const setVisibility = createAction(
    '[Channel] Set Visibility',
    props<{ visibility: number | null }>()
);

export const resetUpload = createAction('[Channel] Reset Upload');