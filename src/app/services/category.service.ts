import {map} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Category} from '../models/category';
import {GLOBAL} from './global';

@Injectable()
export class CategoryService {
	public url: string;

	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}

	getCategories() {
		return this._http.get(this.url + 'categories')
							.pipe(map(res => res.json()));
	}

	addCategory(category: Category) {
		let json = JSON.stringify(category);
		let params = json;
		let headers = new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url + 'category', params, {headers: headers})
								.pipe(map(res => res.json()));
	}
}