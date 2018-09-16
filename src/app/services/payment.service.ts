import {map} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Payment} from '../models/payment';
import {GLOBAL} from './global';

@Injectable()
export class PaymentService {
	public url: string;

	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}

	getPayments() {
		return this._http.get(this.url + 'payments')
							.pipe(map(res => res.json()));
	}

	addPayment(payment: Payment) {
		let json = JSON.stringify(payment);
		let params = json;
		let headers = new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url + 'payment', params, {headers: headers})
								.pipe(map(res => res.json()));
	}
}