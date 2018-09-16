import {map} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Subcategory} from '../models/subcategory';
import {GLOBAL} from './global';

@Injectable()
export class SubcategoryService {
	public url: string;

	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}

	getCategoryFather() {
		return this._http.get(this.url + 'categoryFather')
							.pipe(map(res => res.json()));
	}

	getCategoryByFather(categoryFather) {
		return this._http.get(this.url + 'subcategories/' + categoryFather)
							.pipe(map(res => res.json()));
	}

	addSubcategory(subcategory: Subcategory) {
		let json = JSON.stringify(subcategory);
		let params = json;
		let headers = new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url + 'subcategory', params, {headers: headers})
								.pipe(map(res => res.json()));
	}
}