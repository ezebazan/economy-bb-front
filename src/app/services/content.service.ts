import {map} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Content} from '../models/content';
import {GLOBAL} from './global';

@Injectable()
export class ContentService {
	public url: string;

	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}

	getContents() {
		return this._http.get(this.url + 'contents')
							.pipe(map(res => res.json()));
	}

	getCategoryReports() {
		return this._http.get(this.url + 'contents/category/reports')
							.pipe(map(res => res.json()));
	}

	getSubCategoryReports() {
		return this._http.get(this.url + 'contents/subcategory/reports')
							.pipe(map(res => res.json()));
	}

	getContentsCategoryFather(category_father, periodo) {
		return this._http.get(this.url + 'contents/category_father/' + category_father + '/' + periodo)
							.pipe(map(res => res.json()));
	}

	addContent(content: Content) {
		let json = JSON.stringify(content);
		let params = json;
		let headers = new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url + 'content', params, {headers: headers})
								.pipe(map(res => res.json()));
	}
}