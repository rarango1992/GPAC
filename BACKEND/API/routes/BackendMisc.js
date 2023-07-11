const express = require("express");
const router = express.Router();
const statusModel = require("../models/status");
const priorityModel = require("../models/priority");
const auth = require("../middlewares/auth");
const joi = require("joi");

router.get("/GetStatusByCode/:code", auth, (req, res, next) => {
  const schemaGet = joi.object({
    code: joi.number().min(1).max(3).required(),
  });
  const { error } = schemaGet.validate(req.params);
  if (error) {
    const response = {
      data: error.details,
      msg: "API Error.",
      code: 3,
    };
    res.send(response);
  } else {
    let filter = {
      code: req.params.code,
    };
    statusModel.findOne(filter, (err, db) => {
      if (!err) {
        const response = {
          data: db,
          msg: "Status Title.",
          code: 200,
        };
        res.send(response);
      } else {
        const response = {
          data: err.toString(),
          msg: "API Error.",
          code: 1,
        };
        res.send(response);
      }
    });
  }
});

router.get("/GetPriorityByCode/:code", auth, (req, res, next) => {
    const schemaGet = joi.object({
      code: joi.number().min(0).max(2).required(),
    });
    const { error } = schemaGet.validate(req.params);
    if (error) {
      const response = {
        data: error.details,
        msg: "API Error.",
        code: 3,
      };
      res.send(response);
    } else {
      let filter = {
        level: req.params.code,
      };
      priorityModel.findOne(filter, (err, db) => {
        if (!err) {
          const response = {
            data: db,
            msg: "Priority Title.",
            code: 200,
          };
          res.send(response);
        } else {
          const response = {
            data: err.toString(),
            msg: "API Error.",
            code: 1,
          };
          res.send(response);
        }
      });
    }
  });

module.exports = router;
