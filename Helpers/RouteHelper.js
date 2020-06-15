/**
 * THIS IS SERVER SIDE VALIDATION
 * HAPPENS BEFORE CONTROLLER
 */
const Joi = require("joi");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.status(400).json(result.error);
      }

      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),

    dataEntrySchema: Joi.object().keys({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(30).email().required(),
      password: Joi.string().min(3).max(20).required(),
    }),
  },
};
