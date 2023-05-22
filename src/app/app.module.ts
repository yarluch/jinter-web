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

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    InterestCardComponent,
    SliderComponent,
    HomePageComponent,
    AboutPageComponent,
    ListCardComponent,
    InterestPageComponent
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
        path: ':interestType',
        component: HomePageComponent
      },
      {
        path: 'about',
        component: AboutPageComponent
      },
      {
        path: 'interest/:interestId',
        component: InterestPageComponent
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
