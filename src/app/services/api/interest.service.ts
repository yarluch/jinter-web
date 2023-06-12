import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {InterestCardData} from "../../interfaces/interest/interestCardData";
import {InterestControllerService} from "../interest-controller.service";
import {ListCardData} from "../../interfaces/list/listCardData";
import {GameModel} from "../../interfaces/interest/specificData/gameModel";
import {map} from "rxjs";
import {InterestPageData} from "../../interfaces/interest/interestPageData";
import {Tag} from "../../interfaces/interest/tags/tag";
import {TagTranslation} from "../../interfaces/interest/translations/tagTranslation";
import {BookModel} from "../../interfaces/interest/specificData/bookModel";
import {MovieModel} from "../../interfaces/interest/specificData/movieModel";
import {BookListModel} from "../../interfaces/list/specificData/bookListModel";
import {ListPageData} from "../../interfaces/list/listPageData";
import {GameListModel} from "../../interfaces/list/specificData/gameListModel";
import {MovieListModel} from "../../interfaces/list/specificData/movieListModel";
import {CurrentUserDataService} from "../current-user-data.service";
import {GameReviewModel} from "../../interfaces/review/specificData/gameReviewModel";
import {ReviewCardData} from "../../interfaces/review/reviewCardData";
import {BookReviewModel} from "../../interfaces/review/specificData/bookReviewModel";
import {MovieReviewModel} from "../../interfaces/review/specificData/movieReviewModel";

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

  private movieToInterest(movie: MovieModel): InterestPageData {
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

  getList(id: string) {
    switch (this.interest) {
      case 'books':
        return this.getBookList(id).pipe(
          map((bookList: BookListModel): ListPageData => {
            return this.bookListToInterestList(bookList);
          })
        );

      case 'movies':
        return this.getMovieList(id).pipe(
          map((movieList: MovieListModel): ListPageData => {
            return this.movieListToInterestList(movieList);
          })
        );

      default:
        return this.getGameList(id).pipe(
          map((gameList: GameListModel): ListPageData => {
            return this.gameListToInterestList(gameList);
          })
        );
    }
  }

  private getGameList(id: string) {
    return this.http.get<GameListModel>(`${environment.URL}/g/recommendationlists/${id}`);
  }

  private getBookList(id: string) {
    return this.http.get<BookListModel>(`${environment.URL}/books/recommendationlists/${id}`);
  }

  private getMovieList(id: string) {
    return this.http.get<MovieListModel>(`${environment.URL}/movies/recommendationlists/${id}`);
  }

  private gameListToInterestList(gameList: GameListModel): ListPageData {
    return {
      coverColor: gameList.coverColor,
      creator: gameList.creator,
      id: gameList.id,
      interests: gameList.games,
      isAddedToOwnLists: gameList.isAddedToOwnLists,
      name: gameList.name,
      nameUa: gameList.nameUa,
      ownerProfile: gameList.ownerProfile,
      photoUrl: gameList.photoUrl,
      privacyStatus: gameList.privacyStatus,
      type: gameList.type
    };
  }

  private bookListToInterestList(bookList: BookListModel): ListPageData {
    return {
      coverColor: bookList.coverColor,
      creator: bookList.creator,
      id: bookList.id,
      interests: bookList.books,
      isAddedToOwnLists: bookList.isAddedToOwnLists,
      name: bookList.name,
      nameUa: bookList.nameUa,
      ownerProfile: bookList.ownerProfile,
      photoUrl: bookList.photoUrl,
      privacyStatus: bookList.privacyStatus,
      type: bookList.type
    };
  }

  private movieListToInterestList(movieList: MovieListModel): ListPageData {
    return {
      coverColor: movieList.coverColor,
      creator: movieList.creator,
      id: movieList.id,
      interests: movieList.movies,
      isAddedToOwnLists: movieList.isAddedToOwnLists,
      name: movieList.name,
      nameUa: movieList.nameUa,
      ownerProfile: movieList.ownerProfile,
      photoUrl: movieList.photoUrl,
      privacyStatus: movieList.privacyStatus,
      type: movieList.type
    };
  }

  getUserActivityList(userId: string, activityStatus: number) {
    return this.http.get<Array<InterestCardData>>(
      `${environment.URL}/${this.interest.slice(0, this.interest.length-1)}-activity/user/${userId}/status/${activityStatus}/${this.interest}`);
  }

  getUserLists(userId: string) {
    let path = this.interest != 'games' ? this.interest : 'g';
    return this.http.get<Array<ListCardData>>(`${environment.URL}/${path}/recommendationlists/user/${userId}`);
  }

  getUserReviews(userId: string) {
    switch (this.interest) {
      case 'books':
        return this.getUserBookReviews(userId).pipe(
          map((bookReviews: Array<BookReviewModel>): Array<ReviewCardData> => {
            let result = Array<ReviewCardData>();
            for (const review of bookReviews) {
              result.push(this.bookReviewToReviewData(review));
            }
            return result;
          })
        );

      case 'movies':
        return this.getUserMovieReviews(userId).pipe(
          map((movieReviews: Array<MovieReviewModel>): Array<ReviewCardData> => {
            let result = Array<ReviewCardData>();
            for (const review of movieReviews) {
              result.push(this.movieReviewToReviewData(review));
            }
            return result;
          })
        );

      default:
        return this.getUserGameReviews(userId).pipe(
          map((gameReviews: Array<GameReviewModel>): Array<ReviewCardData> => {
            let result = Array<ReviewCardData>();
            for (const review of gameReviews) {
              result.push(this.gameReviewToReviewData(review));
            }
            return result;
          })
        );
    }
  }

  private getUserGameReviews(userId: string) {
    return this.http.get<Array<GameReviewModel>>(`${environment.URL}/users/${userId}/game-reviews`);
  }
  private getUserBookReviews(userId: string) {
    return this.http.get<Array<BookReviewModel>>(`${environment.URL}/users/${userId}/book-reviews`);
  }
  private getUserMovieReviews(userId: string) {
    return this.http.get<Array<MovieReviewModel>>(`${environment.URL}/users/${userId}/movie-reviews`);
  }

  private gameReviewToReviewData(review: GameReviewModel): ReviewCardData{
    return {
      author: review.author,
      id: review.id,
      interest: {
        id: review.game.id,
        translations: review.game.translations
      },
      isLikedByLoggedUser: review.isLikedByLoggedUser,
      rate: review.rate,
      reviewDescription: review.reviewDescription,
      reviewTitle: review.reviewTitle
    }
  }
  private bookReviewToReviewData(review: BookReviewModel): ReviewCardData{
    return {
      author: review.author,
      id: review.id,
      interest: {
        id: review.book.id,
        translations: review.book.translations
      },
      isLikedByLoggedUser: review.isLikedByLoggedUser,
      rate: review.rate,
      reviewDescription: review.reviewDescription,
      reviewTitle: review.reviewTitle
    }
  }

  private movieReviewToReviewData(review: MovieReviewModel): ReviewCardData{
    return {
      author: review.author,
      id: review.id,
      interest: {
        id: review.movie.id,
        translations: review.movie.translations
      },
      isLikedByLoggedUser: review.isLikedByLoggedUser,
      rate: review.rate,
      reviewDescription: review.reviewDescription,
      reviewTitle: review.reviewTitle
    }
  }

  getInterestReviews(interestId: string) {
    switch (this.interest) {
      case 'books':
        return this.getInterestBookReviews(interestId).pipe(
          map((bookReviews: Array<BookReviewModel>): Array<ReviewCardData> => {
            let result = Array<ReviewCardData>();
            for (const review of bookReviews) {
              result.push(this.bookReviewToReviewData(review));
            }
            return result;
          })
        );

      case 'movies':
        return this.getInterestMovieReviews(interestId).pipe(
          map((movieReviews: Array<MovieReviewModel>): Array<ReviewCardData> => {
            let result = Array<ReviewCardData>();
            for (const review of movieReviews) {
              result.push(this.movieReviewToReviewData(review));
            }
            return result;
          })
        );

      default:
        return this.getInterestGameReviews(interestId).pipe(
          map((gameReviews: Array<GameReviewModel>): Array<ReviewCardData> => {
            let result = Array<ReviewCardData>();
            for (const review of gameReviews) {
              result.push(this.gameReviewToReviewData(review));
            }
            return result;
          })
        );
    }
  }

  private getInterestGameReviews(interestId: string) {
    return this.http.get<Array<GameReviewModel>>(`${environment.URL}/games/${interestId}/reviews`);
  }
  private getInterestBookReviews(interestId: string) {
    return this.http.get<Array<BookReviewModel>>(`${environment.URL}/books/${interestId}/reviews`);
  }
  private getInterestMovieReviews(interestId: string) {
    return this.http.get<Array<MovieReviewModel>>(`${environment.URL}/movies/${interestId}/reviews`);
  }
}
