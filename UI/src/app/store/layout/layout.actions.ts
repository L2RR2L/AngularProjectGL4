import { createAction, props } from '@ngrx/store';

export const toggleDrawer = createAction('[Layout] Toggle Drawer');
export const setDrawer = createAction(
  '[Layout] Set Drawer',
  props<{ isDrawerOpen: boolean }>()
);
