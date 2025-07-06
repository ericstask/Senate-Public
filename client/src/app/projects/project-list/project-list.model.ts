export class ProjectListItem {
  public title: string;
  public description: string;
  public _id: string;
  public createdAt: Date;

  constructor(title: string, description: string, id: string, createdAt: Date) {
    this.title = title;
    this.description = description;
    this._id = '';
    this.createdAt = createdAt;
  }
}
