import { DataType, Difficulty, Jlpt, ReviewType, Transitivity } from "../../shared/models/custom-types.model";

export interface CardFilter {
  user: string;
  type?: DataType;
  reviewType?: ReviewType;
  lesson?: string;
  source?: string;
  tags?: string[];
  jlpt?: Jlpt;
  difficulty?: Difficulty;
  transitivity?: Transitivity;
}
