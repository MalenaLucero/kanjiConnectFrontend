import { Jlpt } from "src/app/shared/models/custom-types.model";

export interface GenericFilter {
  user?: string,
  searchList?: string[],
  jlpt?: Jlpt,
  lesson?: string,
  tags?: [],
  difficulty?: number[],
}

export interface SearchParams {
  search?: string,
  filter?: string,
}
