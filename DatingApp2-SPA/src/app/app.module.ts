import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import {
	BsDropdownModule,
	TabsModule,
	BsDatepickerModule,
	PaginationModule,
	ButtonsModule,
	ModalModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberlistComponent } from './members/memberlist/memberlist.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/Photo-editor/Photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagmentComponent } from './admin/photo-managment/photo-managment.component';
import { AdminService } from './_services/admin.service';
import { EditRolesModalComponent } from './admin/edit-roles-modal/edit-roles-modal.component';

export function tokenGetter() {
	return localStorage.getItem('token');
}

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		RegisterComponent,
		HomeComponent,
		MemberlistComponent,
		ListsComponent,
		MessagesComponent,
		MemberCardComponent,
		MemberDetailComponent,
		MemberEditComponent,
		PhotoEditorComponent,
		TimeAgoPipe,
		MemberMessagesComponent,
		AdminPanelComponent,
		HasRoleDirective,
		UserManagementComponent,
		PhotoManagmentComponent,
		EditRolesModalComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgxGalleryModule,
		FileUploadModule,
		ModalModule.forRoot(),
		ButtonsModule.forRoot(),
		PaginationModule.forRoot(),
		BsDropdownModule.forRoot(),
		BsDatepickerModule.forRoot(),
		RouterModule.forRoot(appRoutes),
		TabsModule.forRoot(),
		JwtModule.forRoot({
			config: {
				// tslint:disable-next-line:object-literal-shorthand
				tokenGetter: tokenGetter,
				whitelistedDomains: ['localhost:5000'],
				blacklistedRoutes: ['localhost:5000/api/auth']
			}
		})
	],
	providers: [
		AuthService,
		ErrorInterceptorProvider,
		AlertifyService,
		AuthGuard,
		UserService,
		MemberDetailResolver,
		MemberListResolver,
		MemberEditResolver,
		PreventUnsavedChanges,
		ListsResolver,
		MessagesResolver,
		AdminService
	],
	bootstrap: [AppComponent],
	entryComponents: [EditRolesModalComponent]
})
export class AppModule {}
