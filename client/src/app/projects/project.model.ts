export class Project {
  public title: string;
  public description: string;
  public content: string;
  public _id?: string;

  constructor(title: string, description: string, id: string, content: string) {
    this.title = title;
    this.description = description;
    this.content = content;
    if (id !== '') this._id = id;
    else this._id = '';
  }
}
