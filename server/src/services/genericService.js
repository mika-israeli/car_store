const service = (model) => {
  /**
   * returns all documents in the collection
   * @returns {Promise<*>}
   */
  const getAll = async () => {
    return await model.find();
  };
  /**
   * returns a document by id
   * @param {ObjectId} id
   * @returns
   */
  const getById = async (id) => {
    return await model.findById(id);
  };
  /**
   * creates a new document in the collection
   * @param {Object} data
   * @returns {Promise<*>}
   */
  const add = async (item) => {
    const newItem = new model(item);
    return await newItem.save();
  };
  /**
   * updates a document in the collection
   * @param {ObjectId} id
   * @param {Object} item
   * @returns
   */
  const update = async (id, item) => {
    return await model.findByIdAndUpdate(id, item);
  };
  /**
   * deletes a document in the collection
   * @param {ObjectId} id
   * @returns
   */
  const remove = async (id) => {
    return await model.findByIdAndRemove(id);
  };
  /**
   * returns a document where the given field matches the given value
   * @param {String} field
   * @param {Object} value
   * @returns
   */
  const getByField = async (field, value) => {
    field.toLowerCase();
    value.toLowerCase();
    console.log(field, value);
    return await model.find({ [field]: value });
  };
  return { getAll, getById, add, update, remove, getByField };
};

module.exports = service;
