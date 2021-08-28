import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/components/loading/loading.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.loadingService.addLoading();
        return next
            .handle(request)
            .pipe(finalize(() => this.loadingService.removeLoading()));
    }
}
