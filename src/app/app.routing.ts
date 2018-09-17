import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentsListComponent } from './components/contents-list.components';
import { ContentNewComponent } from './components/content-new.components';
import { ContentEditComponent } from './components/content-edit.components';

const appRoutes: Routes = [
	{path: '', component: ContentsListComponent},
	{path: 'new-content', component: ContentNewComponent},
	{path: 'edit-content/:id', component: ContentEditComponent},
	{path: '**', component: ContentsListComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);