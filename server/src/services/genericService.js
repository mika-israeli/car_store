const moment = require('moment')

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
    console.log("adding" + item)
    const newItem = new model(item);
    return await newItem.save();
  };
   /**
   * Creates number of rows in the collection
   * @param {List<Objects>} dataArray
   * @returns {Promise<*>}
   */
  const addAll = async (items) => {
    const newItem = model.collection.insertMany(items)
    return newItem;
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
    return await model.findByIdAndRemove({manufacturer : id});
  };

/**
 *  this function will reset the DB to the number of day's you want to go back in time.
 *  recives the number of days to go back
 * @param {int} date 
 */
  const removeByDaysBack = async (numOfDays)=>{
    let date = moment().subtract(numOfDays,'days').toDate()
    model.find({Timestamp : {$lte : date}}).remove().exec().then(()=>{
      console.log(`DB reseted seccssefuly to ${date}`)
    }).catch(err => console.error(err))
  }
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
  return { getAll, getById, add, update, remove, getByField,addAll,removeByDaysBack };
};

module.exports = service;
