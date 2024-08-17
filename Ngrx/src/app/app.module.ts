import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { YoutubeLayoutComponent } from './components/layout/youtube-layout/youtube-layout.component';
import { UsersComponent } from './containers/users/users.component';
import { PostComponent } from './containers/post/post.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from './Service/http.service';
import { ApiService } from './Service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './reducer';
import { ManagerService } from './Service/manager.service';
import { ErrorComponent } from './components/error/error.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';  // For Responsive Layout

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    YoutubeLayoutComponent,
    UsersComponent,
    PostComponent,
    UserCardComponent,
    UserListComponent,
    ErrorComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,  // remove Circular depanday error
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    FlexModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(rootReducer),   // connect rootReducer to Store
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [HttpService , ApiService , ManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
