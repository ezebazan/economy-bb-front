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
	selector: 'content-new',
	templateUrl: '../views/add-new-content.html',
	providers: [ContentService, CoinService, CardService, PaymentService, SubcategoryService, CategoryService]
})

export class ContentNewComponent implements OnInit {
	public titulo: string;
	public coins: Coin[];
	public cards: Card[];
	public payments: Payment[];
	public categories: Category[];
	public subcategories: Subcategory[];
	public content_new: Content;
	public subcategory_new: Subcategory;
	public errorMessage: any;
	public chk_gasto: boolean;
	public chk_ingreso: boolean;
	public title: string;
	public fecha: Date;
	public meses: string[];
	public subcategory: string;

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
		this.titulo = "New Content:";
		this.chk_gasto = true;
		this.chk_ingreso = false;
		this.title = "Gasto";
	}

	ngOnInit() {
		this.content_new = new Content("","",0,"","","","","","","","","","","");
		console.log(this.content_new);
		this.subcategory_new = new Subcategory("","","");
		console.log(this.subcategory_new);
		this.getCoins();
		this.getPayments();
		this.getCategories();
	}

	obtenerSubcategorias(subcategory) {
		/* BOOTSTRAP DROPDOWN MENU - Update selected item text and image */
		$(".dropdown-menu li a").click(function () {
		    var selText = $(this).text();
		    var imgSource = $(this).find('img').attr('src');
		    var img = '<img src="' + imgSource + '"/>';        
		    $(this).parents('.btn-group').find('.dropdown-toggle').html(img + ' ' + selText + ' <span class="caret"></span>');
		});
		this.subcategory = subcategory;
	}

	verificarCargaContent(typeContent) {
		if(typeContent == 'ingreso') {
			this.chk_gasto = false;
			this.chk_ingreso = true;
			//$("#ingreso").css({"display": "none"});
			this.title = "Ingreso";
		} else if(typeContent == 'gasto') {
			this.chk_gasto = true;
			this.chk_ingreso = false;
			//$("#ingreso").css({"display": "block"});
			this.title = "Gasto";
		}
	}

	obtenerCard(payment) {
		if(payment == 'Crédito') {
			this.getCards();
		} else {
			this.cards = null;
		}
	}

	public onSubmit() {
		console.log(this.content_new);

		this.meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		this.fecha = new Date(this.content_new.date);
		this.content_new.periodo = this.meses[this.fecha.getMonth()];

		this.content_new.category = this.subcategory;

		if(this.content_new.category_father == 'Ingreso') {
			this.content_new.category_super = 'Ingreso';
			this.content_new.coin == '1'
			this.content_new.payment = '1';
			this.content_new.dues = '1';
			this.content_new.total_dues = '1';
		} else {
			this.content_new.category_super = 'Gasto';
			if(this.content_new.total_dues == '1') {
				this.content_new.dues == '1'
			}
		}
		this._contentService.addContent(this.content_new).subscribe(
				response => {
					if(!this.content_new) {
						alert("Error en el servidor");
					} else {
						this.content_new = response.content;
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

	public saveSubcategory() {
		console.log(this.subcategory_new);
		this._subcategoryService.addSubcategory(this.subcategory_new).subscribe(
				response => {
					if(!this.subcategory_new) {
						alert("Error en el servidor");
					} else {
						this.subcategory_new = response.subcategory;
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

	public getCategoryByFather(category_father) {
		this._subcategoryService.getCategoryByFather(category_father).subscribe(
				result => {
					this.subcategories = result.subcategories;

					if(!this.subcategories) {
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
}