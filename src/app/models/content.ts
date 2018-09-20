export class Content {
	constructor(
		public _id: string,
		public name_content: string,
		public amount: number,
		public is_pay: string,
		public coin: string,
		public payment: string,
		public card: string,
		public dues: string,
		public total_dues: string,
		public category: string,
		public category_father: string,
		public category_super: string,
		public date: string,
		public periodo: string,
		public totalAmount: number
	){}
}