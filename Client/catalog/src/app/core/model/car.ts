import { Model } from "./model";

export class Car {
  id!: number;
  color!: string;
  volume!: number;
  description!: string;
  modelId!: number;
  model!: Model;
  price!: number;
}
