import {map} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Coin} from '../models/coin';
import {GLOBAL} from './global';

@Injectable()
export class CoinService {
	public url: string;

	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}

	getCoins() {
		return this._http.get(this.url + 'coins')
							.pipe(map(res => res.json()));
	}

	addCoin(coin: Coin) {
		let json = JSON.stringify(coin);
		let params = json;
		let headers = new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url + 'coin', params, {headers: headers})
								.pipe(map(res => res.json()));
	}
}