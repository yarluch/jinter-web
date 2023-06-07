import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {InterestCardData} from "../../interfaces/interest/interestCardData";
import {InterestControllerService} from "../interest-controller.service";
import {ListCardData} from "../../interfaces/listCardData";
import {GameModel} from "../../interfaces/interest/specificData/gameModel";
import {map} from "rxjs";
import {InterestPageData} from "../../interfaces/interest/interestPageData";
import {Tag} from "../../interfaces/interest/tags/tag";
import {TagTranslation} from "../../interfaces/interest/translations/tagTranslation";
import {BookModel} from "../../interfaces/interest/specificData/bookModel";
import {MovieModel} from "../../interfaces/interest/specificData/movieModel";

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  interest: string = ''
  constructor(private http: HttpClient,
              private interestControllerService: InterestControllerService) {
    interestControllerService.getCurrentInterestObserver()
      .subscribe(interest => this.interest = interest);
  }

  getPopular() {
    return this.http.get<Array<InterestCardData>>(`${environment.URL}/${this.interest}/popular`);
  }

  getSystemRecommendations() {
    let path = this.interest != 'games' ? this.interest : 'g';
    return this.http.get<Array<ListCardData>>(`${environment.URL}/${path}/recommendationlists/system`);
  }

  getInterest(id: string) {

    switch (this.interest) {
      case 'books':
        return this.getBook(id).pipe(
          map((book: BookModel): InterestPageData => {
            return this.bookToInterest(book);
          })
        );

      case 'movies':
        return this.getMovie(id).pipe(
          map((movie: MovieModel): InterestPageData => {
            return this.movieToInterest(movie);
          })
        );

      default:
        return this.getGame(id).pipe(
          map((game: GameModel): InterestPageData => {
            return this.gameToInterest(game);
          })
        );
    }
  }
  private getGame(id: string) {
    return this.http.get<GameModel>(`${environment.URL}/games/${id}`);
  }

  private getBook(id: string) {
    return this.http.get<BookModel>(`${environment.URL}/books/${id}`);
  }

  private getMovie(id: string) {
    return this.http.get<MovieModel>(`${environment.URL}/movies/${id}`);
  }

  private gameToInterest(game: GameModel): InterestPageData {
    let tags = Array<Tag>();

    for (let platform of game.platforms) {
      tags.push({
        id: platform.id,
        name: platform.name,
        translations: Array<TagTranslation>()
      })
    }

    return {
      ageRestriction: game.ageRestriction,
      averageCustomerReviewRate: game.averageCustomerReviewRate,
      customerRate: game.customerRate,
      description: game.description,
      id: game.id,
      isLiked: game.isLiked,
      mainPhotoUrl: game.mainPhotoUrl,
      name: game.name,
      releaseDate: game.releaseDate,
      status: game.customerGameStatus,
      tags: tags,
      genres: game.genres,
      trailerUrl: game.trailerUrl,
      photos: game.photos,
      translations: game.translations
    }
  }

  private bookToInterest(book: BookModel): InterestPageData {
    return {
      ageRestriction: book.ageRestriction,
      averageCustomerReviewRate: book.averageCustomerReviewRate,
      customerRate: book.customerRate,
      description: book.description,
      id: book.id,
      isLiked: book.isLiked,
      mainPhotoUrl: book.mainPhotoUrl,
      name: book.name,
      releaseDate: book.releaseDate,
      status: book.customerBookStatus,
      tags: book.tags,
      genres: book.genres,
      trailerUrl: book.trailerUrl,
      photos: book.photos,
      translations: book.translations
    }
  }

  private movieToInterest(movie: MovieModel) {
    return {
      ageRestriction: movie.ageRestriction,
      averageCustomerReviewRate: movie.averageCustomerReviewRate,
      customerRate: movie.customerRate,
      description: movie.description,
      id: movie.id,
      isLiked: movie.isLiked,
      mainPhotoUrl: movie.mainPhotoUrl,
      name: movie.name,
      releaseDate: movie.releaseDate,
      status: movie.customerMovieStatus,
      tags: movie.tags,
      genres: movie.genres,
      trailerUrl: movie.trailerUrl,
      photos: movie.photos,
      translations: movie.translations
    }
  }
}
