import { ErrorHandler,Injectable,Injector, NgZone} from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Observable} from 'rxjs/Observable'

import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private notificationService: NotificationService,
              private injector: Injector,
              private ngZone: NgZone) {
    super()
  }
  handleError(errorResponse: HttpErrorResponse | any) {

    if(errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message
      this.ngZone.run(()=> {
        switch(errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin()
            break;
          case 403:
            this.notificationService.notify( message || 'Não Autorizado')
            break;
          case 404:
            this.notificationService.notify(message || 'Recurso não encontrado. Favor informar o adminstrador')
            break;
          case 500:
            this.notificationService.notify(message || 'Erro interno. Favor informar o adminstrador')
            break;
        }
      })
    }
    super.handleError(errorResponse)
      /*let errorMessage: string
      if(error instanceof HttpErrorResponse) {
        const body = error.error
        errorMessage =`Erro ${error.status} ao acessar a URL
          ${error.url} - ${error.statusText  || ''} ${body}
        `
      }else {
        errorMessage = error.message? error.message : error.toString()
      }*/
  }
}
