import { applyCollectionQuery } from '../../../util/database/queries';
import { CollectionQuery } from '../../../util/database/validators';
import { from } from 'rxjs';
import { Movie } from './models';

export const SORTING_FIELDS = ['_id', 'title', 'director', 'year', 'metascore'];

export namespace MoviesMethods {
  export const model = new Movie().getModelForClass(Movie);

  export const findAll = (query: CollectionQuery) => from(
    applyCollectionQuery(query)(() => model.find())
  );

  export const findById = (id: string) => from(
    model.findById(id).exec()
  );

  export const findOneByImdbID = (imdbId: string) => from(
    model.findOne({ imdbId }).exec()
  );
}
