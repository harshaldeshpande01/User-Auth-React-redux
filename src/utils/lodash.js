import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

export const _map = (array, callback) => map(array, callback);

export const _orderBy = (collection, iteratees = [], orders = []) =>
  orderBy(collection, iteratees, orders);
