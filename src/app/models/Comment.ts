export class Comment{
  private _comment:string;
  private _date:Date;
  private _idPost:number;
  constructor( comment:string,
               date:Date,
               idPost:number) {
    this._comment=comment;
    this._date=date;
    this._idPost=idPost;
  }

  get idPost(): number {
    return this._idPost;
  }

  set idPost(value: number) {
    this._idPost = value;
  }

  get comment(): string {
    return this._comment;
  }

  set comment(value: string) {
    this._comment = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }
}
