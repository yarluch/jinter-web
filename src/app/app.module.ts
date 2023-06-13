import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import {RouteReuseStrategy, RouterModule} from "@angular/router";
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import { ListCardComponent } from './cards/list-card/list-card.component';
import { InterestPageComponent } from './pages/interest-page/interest-page.component';
import { AuthorCardComponent } from './cards/author-card/author-card.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { InterestSwitchComponent } from './interest-switch/interest-switch.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import {environment} from "../environments/environment.prod";
import {ReactiveFormsModule} from "@angular/forms";
import { LoginSignUpModalComponent } from './modals/login-sign-up-modal/login-sign-up-modal.component';
import {CustomRouteReuseStrategy} from "./custom-route-reuse-strategy";
import { TagChipComponent } from './chips/tag-chip/tag-chip.component';
import { GalleryCardComponent } from './cards/gallery-card/gallery-card.component';
import { GenreChipComponent } from './chips/genre-chip/genre-chip.component';
import { FullInfoInterestCardComponent } from './cards/full-info-interest-card/full-info-interest-card.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ReviewCardComponent } from './cards/review-card/review-card.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

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
    InterestSwitchComponent,
    NotFoundPageComponent,
    LoginSignUpModalComponent,
    TagChipComponent,
    GalleryCardComponent,
    GenreChipComponent,
    FullInfoInterestCardComponent,
    ListPageComponent,
    ReviewCardComponent,
    SearchPageComponent
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
        path: `${environment.NOT_FOUND_PAGE_PATH}`,
        component: NotFoundPageComponent
      },
      {
        path: ':interest-type',
        component: HomePageComponent
      },
      {
        path: `:interest-type/${environment.ABOUT_PAGE_PATH}`,
        component: AboutPageComponent
      },
      {
        path: `:interest-type/${environment.INTEREST_PAGE_PATH}/:interestId`,
        component: InterestPageComponent
      },
      {
        path: `:interest-type/${environment.LIST_PAGE_PATH}/:interestId`,
        component: ListPageComponent
      },
      {
        path: `:interest-type/${environment.PROFILE_PAGE_PATH}/:userId`,
        component: ProfilePageComponent
      },
      {
        path: '**',
        component: NotFoundPageComponent
      }
    ]),
    ReactiveFormsModule
  ],
  providers: [{provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}
