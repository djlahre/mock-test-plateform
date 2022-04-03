"use strict";
const Joi = require("joi");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {
    static validate(data) {
      const schema = Joi.object({
        UserId: Joi.string().uuid().required(),
        subjectAssessmentIds: Joi.array().required(),
      });
      return schema.validateAsync(data, { abortEarly: false });
    }

    static associate(models) {
      models.User.hasMany(Faculty);
      Faculty.belongsTo(models.User);
    }
  }
  Faculty.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      subjectAssessmentIds: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Faculty",
    }
  );
  return Faculty;
};
