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
  async getAll(conditions = {}, projection = null, options) {
    try {
      const data = await Model.find(conditions, projection, options)
      return data
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
   * @return {Promise<any>}
   */
  async create(data) {
    try {
      const created = await Model.create(data)
      return created
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
  async findOne(conditions = {}, projection = null, options) {
    try {
      const data = await Model.findOne(conditions, projection, options)
      return data
    } catch (e) {
      throw mongoErrorsHandler(e, Model.modelName)
    }
  },

  /**
   * Find by id and update
   *
   * @param id
   * @param data
   * @return {Promise<any>}
   */
  async updateById(id, data) {
    try {
      const data = await Model.findByIdAndUpdate(id, data, { new: true })
      return data
    } catch (e) {
      throw mongoErrorsHandler(e, Model.modelName)
    }
  },
})

exports.createRepository = createRepository
