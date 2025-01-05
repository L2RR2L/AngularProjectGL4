import { Type } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";

export interface SideNavOption {
    svg: SafeHtml;
    name: string;
    path: string;
    notAuthenticatedTitle?: string;
    notAuthenticatedSubtitle?: string;
}

export abstract class SideNavOptionService {
    abstract getSideNavOption(): SideNavOption;
}