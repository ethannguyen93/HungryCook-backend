import Item from '../../models/items';

export default {
  items: async () => {
    try {
      const items = await Item.find();
      return items.map(item => ({ ...item._doc }));
    } catch (err) {
      throw err;
    }
  },
  createItem: async ({ itemInput: { name, quantity } }) => {
    const item = new Item({
      name,
      quantity,
    });
    try {
      const result = await item.save();
      return { ...result._doc };
    } catch (err) {
      throw err;
    }
  },
};
