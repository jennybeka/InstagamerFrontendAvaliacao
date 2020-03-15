import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {

    private subject = new Subject<any>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // limpar mensagens de alerta na alteração de rota, a menos que o sinalizador 'keepAfterRouteChange' seja true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // manter apenas uma única alteração de rota
                    this.keepAfterRouteChange = false;
                } else {
                    // limpar alerta de mensagens
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'success', text: message });
    }

    handleErrorMessage(rawMessage: String): String {
        let realMessage: String;
        if (rawMessage.includes("Duplicate entry")) {
            realMessage = "Can't register. User already exists.";

        } else if (rawMessage.includes("connect ECONNREFUSED")) {
            realMessage = "Connection Error";
        } else {
            // Aqui serão mapeados as próximas mensagens
            //TODO mapear próximos erros
            // Se o erro não está mapeado, ele deve ser retornado para que seja visivel e entao possamos mapear depois
            realMessage = `Error 400 not mapped. Raw message: ${rawMessage}`;
        }

        // Retornamos a mensagem final após os mapeamentos
        return realMessage;
    }

    error(error: any, keepAfterRouteChange = false) {
        let message: String;
        console.log(error)
        switch (error['status']) {
            case 401: {
                message = 'Username or password is incorrect';
                break;
            }
            case 400: {
                // Como o erro 400 eh generico, temos de tratar a mensagem
                message = this.handleErrorMessage(error['error']['message']);
                break;
            }
            default: {
                // Status nao mapeado. Montar a mensagem com número do status e mensagem original
                message = `Status not mapped: ${error['status']}. Raw error message: ${error['error']['message']}`;
                break;
            }

        }

        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'error', text: message });
    }

    clear() {
        //limpe chamando subject.next () sem parâmetros
        this.subject.next();
    }
}