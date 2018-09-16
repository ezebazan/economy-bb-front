import {map} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Card} from '../models/card';
import {GLOBAL} from './global';

@Injectable()
export class CardService {
	public url: string;

	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}

	getCards() {
		return this._http.get(this.url + 'cards')
							.pipe(map(res => res.json()));
	}

	addCard(card: Card) {
		let json = JSON.stringify(card);
		let params = json;
		let headers = new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url + 'card', params, {headers: headers})
								.pipe(map(res => res.json()));
	}
}