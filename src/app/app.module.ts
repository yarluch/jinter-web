import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {NgOptimizedImage} from "@angular/common";
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MissingTranslationService} from "./services/missing-translation.service";
import {InterestCardComponent} from './cards/interest-card/interest-card.component';
import {SliderComponent} from './slider/slider.component';
import {RouterModule} from "@angular/router";
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import { ListCardComponent } from './cards/list-card/list-card.component';
import { InterestPageComponent } from './pages/interest-page/interest-page.component';
import { AuthorCardComponent } from './cards/author-card/author-card.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { InterestSwitchComponent } from './interest-switch/interest-switch.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    InterestCardComponent,
    SliderComponent,
    HomePageComponent,
    AboutPageComponent,
    ListCardComponent,
    InterestPageComponent,
    AuthorCardComponent,
    ProfilePageComponent,
    InterestSwitchComponent
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationService},
      useDefaultLang: false,
    }),
    RouterModule.forRoot([
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: ':interest-type',
        component: HomePageComponent
      },
      {
        path: ':interest-type/about',
        component: AboutPageComponent
      },
      {
        path: ':interest-type/interest/:interestId',
        component: InterestPageComponent
      },
      {
        path: ':interest-type/profile/:userId',
        component: ProfilePageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}
