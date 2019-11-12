const mongoErrorsHandler = require('./mongoErrorsHandler')

const createRepository = Model => ({
  /**
   * Get all entities
   *
   * @param {Object} conditions
   * @param {Object|String} projection
   * @param {Object} options
   * @return {*}
   */
  getAll: async (conditions = {}, projection = null, options) => {
    try {
      return await Model.find(conditions, projection, options)
    } catch (e) {
      throw mongoErrorsHandler(e, Model.modelName)
    }
  },

  /**
   * Get entity by id
   *
   * @param {string} id - mongo id
   * @return {Query}
   */
  getById: id => Model.findById(id),

  /**
   * Create new entity
   *
   * @param {Object | Array} data - model data to create entity
   * @return {Promise<void>}
   */
  create: async data => {
    try {
      return await Model.create(data)
    } catch (e) {
      throw mongoErrorsHandler(e, Model.modelName)
    }
  },

  /**
   * Delete by id
   * @param {string} id - mongo id
   * @return {Query}
   */
  deleteById: id => Model.findByIdAndDelete(id),

  /**
   * Find one by conditions
   *
   * @param conditions
   * @param projection
   * @param options
   * @return {Promise<*|TSchema>}
   */
  findOne: async (conditions = {}, projection = null, options) => {
    try {
      return await Model.findOne(conditions, projection, options)
    } catch (e) {
      throw mongoErrorsHandler(e, Model.modelName)
    }
  },

  /**
   * Find by id and update
   *
   * @param id
   * @param data
   * @return {Promise<void>}
   */
  updateById: async (id, data) => {
    try {
      return await Model.findByIdAndUpdate(id, data, { new: true })
    } catch (e) {
      throw mongoErrorsHandler(e, Model.modelName)
    }
  },
})

module.exports = {
  createRepository,
}
