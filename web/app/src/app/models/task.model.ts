import { BaseModel } from "./base.model";

export class Task extends BaseModel<Task> {
    public title!: string;
    public description!: string;
    public status!: string;

    constructor(model?: Partial<Task>) {
      super(model);
    }
}
