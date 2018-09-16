import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {ContentService} from '../services/content.service';
import {CoinService} from '../services/coin.service';
import {CardService} from '../services/card.service';
import {PaymentService} from '../services/payment.service';
import {SubcategoryService} from '../services/subcategory.service';
import {CategoryService} from '../services/category.service';
import {Content} from '../models/content';
import {Coin} from '../models/coin';
import {Card} from '../models/card';
import {Payment} from '../models/payment';
import {Subcategory} from '../models/subcategory';
import {Category} from '../models/category';

@Component({
	selector: 'contents-list',
	templateUrl: '../views/contents-list.html',
	providers: [ContentService, CoinService, CardService, PaymentService, SubcategoryService, CategoryService]
})

export class ContentsListComponent implements OnInit {
	public titulo: string;
	public category_father_50: Content[];
	public category_father_30: Content[];
	public category_father_20: Content[];
	public coins: Coin[];
	public cards: Card[];
	public payments: Payment[];
	public categories: Category[];
	public subcategories: Subcategory[];
	public subcategoryReports: Content[];
	public categoryReports: Content[];
	public errorMessage: any;
	public chk_gasto: boolean;
	public chk_ingreso: boolean;
	public title: string;
	public equilibrio: number;
	public periodo: string;
	public fecha: Date;
	public meses: string[];

	constructor(
			private _route: ActivatedRoute,
			private _router: Router,
			private _contentService: ContentService,
			private _coinService: CoinService,
			private _cardService: CardService,
			private _paymentService: PaymentService,
			private _subcategoryService: SubcategoryService,
			private _categoryService: CategoryService
		){
		this.titulo = "Listado de contenidos:";
	}

	ngOnInit() {
		this.obtenerPeriodo();
		this.getContentsCategoryFather('Economía 50', 'Economía 30', 'Economía 20', this.periodo);
		this.getCoins();
		this.getPayments();
		this.getCategories();
		this.getSubCategoryReports();
		this.getCategoryReports();
	}

	obtenerPeriodo() {
		this.meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		this.fecha = new Date();
		this.periodo = this.meses[this.fecha.getMonth()];
	}

	getContentsCategoryFather(categoryFather_1, categoryFather_2, categoryFather_3, periodo) {
		this._contentService.getContentsCategoryFather(categoryFather_1, periodo).subscribe(
				result => {
					this.category_father_50 = result.contents;

					if(!this.category_father_50) {
						alert("Error en el servidor");
					}
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null) {
						console.log(this.errorMessage);
					}
				}
			);

		this._contentService.getContentsCategoryFather(categoryFather_2, periodo).subscribe(
				result => {
					this.category_father_30 = result.contents;

					if(!this.category_father_30) {
						alert("Error en el servidor");
					}
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null) {
						console.log(this.errorMessage);
					}
				}
			);

		this._contentService.getContentsCategoryFather(categoryFather_3, periodo).subscribe(
				result => {
					this.category_father_20 = result.contents;

					if(!this.category_father_20) {
						alert("Error en el servidor");
					}
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null) {
						console.log(this.errorMessage);
					}
				}
			);
	}

	getCoins() {
		this._coinService.getCoins().subscribe(
				result => {
					this.coins = result.coins;

					if(!this.coins) {
						alert("Error en el servidor");
					}
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null) {
						console.log(this.errorMessage);
					}
				}
			);
	}

	getCards() {
		this._cardService.getCards().subscribe(
				result => {
					this.cards = result.cards;

					if(!this.cards) {
						alert("Error en el servidor");
					}
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null) {
						console.log(this.errorMessage);
					}
				}
			);
	}

	getPayments() {
		this._paymentService.getPayments().subscribe(
				result => {
					this.payments = result.payments;

					if(!this.payments) {
						alert("Error en el servidor");
					}
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null) {
						console.log(this.errorMessage);
					}
				}
			);
	}

	getCategories() {
		this._categoryService.getCategories().subscribe(
				result => {
					this.categories = result.categories;
					
					if(!this.categories) {
						alert("Error en el servidor");
					}
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null) {
						console.log(this.errorMessage);
					}
				}
			);
	}

	getCategoryReports() {
		this._contentService.getCategoryReports().subscribe(
				result => {
					this.categoryReports = result.reports;

					if(!this.categoryReports) {
						alert("Error en el servidor");
					}
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null) {
						console.log(this.errorMessage);
					}
				}
			);
	}

	getSubCategoryReports() {
		this._contentService.getSubCategoryReports().subscribe(
				result => {
					this.subcategoryReports = result.reports;

					if(!this.subcategoryReports) {
						alert("Error en el servidor");
					}
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null) {
						console.log(this.errorMessage);
					}
				}
			);
	}
}