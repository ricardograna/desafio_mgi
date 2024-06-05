import { BaseModel } from "./base.model";

export class Task extends BaseModel<Task> {
    public title!: string;
    public description!: string;
    public dt_expected_completion!: string;
    public status!: string;

    constructor(model?: Partial<Task>) {
      super(model);
    }
}
