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

	getContent(id) {
		return this._http.get(this.url + 'content/' + id)
							.pipe(map(res => res.json()));
	}

	getContents() {
		return this._http.get(this.url + 'contents')
							.pipe(map(res => res.json()));
	}

	getCategoryReports(periodo) {
		return this._http.get(this.url + 'contents/category/reports/' + periodo)
							.pipe(map(res => res.json()));
	}

	getSubCategoryReports(periodo) {
		return this._http.get(this.url + 'contents/subcategory/reports/' + periodo)
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

	editContent(id: String, content: Content) {
		let json = JSON.stringify(content);
		let params = json;
		let headers = new Headers({'Content-Type': 'application/json'});

		return this._http.put(this.url + 'content/' + id, params, {headers: headers})
								.pipe(map(res => res.json()));
	}

	deleteContent(id: String) {
		return this._http.delete(this.url + 'content/' + id)
								.pipe(map(res => res.json()));
	}
}