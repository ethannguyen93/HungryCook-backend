import itemResolver from './items';
import userResolver from './users';

export default {
  ...itemResolver,
  ...userResolver,
};
