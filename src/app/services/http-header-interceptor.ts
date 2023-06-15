import {Injectable} from "@angular/core";
import {HttpHandler, HttpRequest} from "@angular/common/http";

@Injectable()
export class HttpHeaderInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('ngrok-skip-browser-warning', 'true')
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
