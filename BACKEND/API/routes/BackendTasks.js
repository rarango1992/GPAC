const express = require("express");
const router = express.Router();
const taskModel = require("../models/task");
const userModel = require("../models/user");
const auth = require("../middlewares/auth");
const joi = require("joi");

router.post("/AddTask", auth, (req, res, next) => {
  const schemaTask = joi.object({
    userId: joi.string().alphanum().min(24).max(24).required(),
    title: joi.string().max(255).required(),
    description: joi.string().required(),
    endDate: joi.string().min(10).max(10).required(),
  });
  const { error } = schemaTask.validate(req.body);
  if (error) {
    const response = {
      data: error.details,
      msg: "API Error.",
      code: 3,
    };
    res.send(response);
  } else {
    userModel.findOne({ _id: req.body.userId }, (err, db) => {
      if (!err) {
        if (db) {
          const date = new Date();
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const dia = day.toString();
          const mes = month.toString();
          let today = "";
          if (day < 10) today = "0";
          today += dia + "/";
          if (month < 10) today += "0";
          today += mes + "/" + year;
          const registro = new taskModel({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            status: 1,
            priority: 2,
            endDate: req.body.endDate,
            updateDate: today,
          });
          registro.save((err) => {
            if (!err) {
              const response = {
                data: registro,
                msg: "Task created in DB.",
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
        } else {
          const response = {
            data: {},
            msg: "User not found in DB.",
            code: 10,
          };
          res.send(response);
        }
      } else {
        const response = {
          data: err.toString(),
          msg: "API Error",
          code: 1,
        };
        res.send(response);
      }
    });
  }
});

router.post("/SearchTasks", auth, (req, res, next) => {
  const schemaGet = joi.object({
    filter: {
      userId: joi.string().alphanum().min(24).max(24),
      title: joi.string().max(255),
      description: joi.string(),
      status: joi.number().min(1).max(3),
      priority: joi.number().min(0).max(2),
      tags: {
        text: joi.string(),
      },
      notes: {
        text: joi.string(),
      },
      endDate: joi.string().min(10).max(10),
      updateDate: joi.string().min(10).max(10),
    },
    order: {
      status: joi.string().valid("asc", "desc"),
      priority: joi.string().valid("asc", "desc"),
      title: joi.string().valid("asc", "desc"),
      endDate: joi.string().valid("asc", "desc"),
      updateDate: joi.string().valid("asc", "desc"),
    },
  });
  const { error } = schemaGet.validate(req.body);
  if (error) {
    const response = {
      data: error.details,
      msg: "API Error.",
      code: 3,
    };
    res.send(response);
  } else {
    let filter = {};
    if (req.body.filter) {
      if (req.body.filter.userId) filter.userId = req.body.filter.userId;
      if (req.body.filter.title) {
        let regexp = new RegExp("^" + req.body.filter.title);
        filter.title = regexp;
      }
      if (req.body.filter.description) {
        let regexp = new RegExp("^" + req.body.filter.description);
        filter.description = regexp;
      }
      if (req.body.filter.status) filter.status = req.body.filter.status;
      if (req.body.filter.priority) filter.priority = req.body.filter.priority;
      if (req.body.filter.endDate) filter.endDate = req.body.filter.endDate;
      if (req.body.filter.updateDate)
        filter.updateDate = req.body.filter.updateDate;
      if (req.body.filter.tags) {
        let regexp = new RegExp("^" + req.body.filter.tags.text);
        filter["tags.text"] = regexp;
      }
      if (req.body.filter.notes) {
        let regexp = new RegExp("^" + req.body.filter.notes.text);
        filter["notes.text"] = regexp;
      }
    }

    let order = req.body.order;

    taskModel.find(filter, (err, db) => {
      if (!err) {
        if (order) {
          if (order.status === "asc") {
            db.sort((a, b) => {
              return a.status - b.status;
            });
          } else {
            if (order.status === "desc") {
              db.sort((a, b) => {
                return b.status - a.status;
              });
            }
          }
          if (order.priority === "asc") {
            db.sort((a, b) => {
              return b.priority - a.priority;
            });
          } else {
            if (order.priority === "desc") {
              db.sort((a, b) => {
                return a.priority - b.priority;
              });
            }
          }
          if (order.title === "asc") {
            db.sort((a, b) => {
              let fa = a.title.toLowerCase(),
                fb = b.title.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            });
          } else {
            if (order.title === "desc") {
              db.sort((a, b) => {
                let fa = a.title.toLowerCase(),
                  fb = b.title.toLowerCase();

                if (fa < fb) {
                  return 1;
                }
                if (fa > fb) {
                  return -1;
                }
                return 0;
              });
            }
          }
          if (order.endDate === "asc") {
            db.sort((a, b) => {
              let aArray = a.endDate.split("/"),
                bArray = b.endDate.split("/");

              let fa = aArray[1] + "/" + aArray[0] + "/" + aArray[2],
                fb = bArray[1] + "/" + bArray[0] + "/" + bArray[2];

              let da = new Date(fa),
                db = new Date(fb);

              return da - db;
            });
          } else {
            if (order.endDate === "desc") {
              db.sort((a, b) => {
                let aArray = a.endDate.split("/"),
                  bArray = b.endDate.split("/");

                let fa = aArray[1] + "/" + aArray[0] + "/" + aArray[2],
                  fb = bArray[1] + "/" + bArray[0] + "/" + bArray[2];

                let da = new Date(fa),
                  db = new Date(fb);

                return db - da;
              });
            }
          }
          if (order.updateDate === "asc") {
            db.sort((a, b) => {
              let aArray = a.updateDate.split("/"),
                bArray = b.updateDate.split("/");

              let fa = aArray[1] + "/" + aArray[0] + "/" + aArray[2],
                fb = bArray[1] + "/" + bArray[0] + "/" + bArray[2];

              let da = new Date(fa),
                db = new Date(fb);

              return da - db;
            });
          } else {
            if (order.updateDate === "desc") {
              db.sort((a, b) => {
                let aArray = a.updateDate.split("/"),
                  bArray = b.updateDate.split("/");

                let fa = aArray[1] + "/" + aArray[0] + "/" + aArray[2],
                  fb = bArray[1] + "/" + bArray[0] + "/" + bArray[2];

                let da = new Date(fa),
                  db = new Date(fb);

                return db - da;
              });
            }
          }
        }

        const response = {
          data: db,
          msg: "Tasks List.",
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

router.get("/GetTasks", auth, (req, res, next) => {
  taskModel.find( (err, db) => {
    if (!err) {
      const response = {
        data: db,
        msg: "Tasks List.",
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
});

router.get("/GetTasksByUser/:userId", auth, (req, res, next) => {
  const schemaGet = joi.object({
    userId: joi.string().alphanum().min(24).max(24).required(),
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
      userId: req.params.userId,
    };
    taskModel.find(filter, (err, db) => {
      if (!err) {
        const response = {
          data: db,
          msg: "Tasks List.",
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

router.put("/UpdateTask", auth, (req, res, next) => {
  const schemaTask = joi.object({
    userId: joi.string().alphanum().min(24).max(24).required(),
    _id: joi.string().alphanum().min(24).max(24).required(),
    title: joi.string().max(255),
    description: joi.string(),
    endDate: joi.string().min(10).max(10),
    notes: joi.array().items(
      joi.object({
        text: joi.string().required(),
        date: joi.string().min(10).max(10).required(),
      })
    ),
    tags: joi.array().items(
      joi.object({
        text: joi.string().required(),
        color: joi
          .string()
          .valid(
            "primary",
            "secondary",
            "danger",
            "warning",
            "success",
            "info",
            "dark",
            "light",
            "white",
            "muted"
          )
          .required(),
      })
    ),
  });
  const { error } = schemaTask.validate(req.body);
  if (error) {
    const response = {
      data: error.details,
      msg: "API Error.",
      code: 3,
    };
    res.send(response);
  } else {
    const filter = {
      userId: req.body.userId,
      _id: req.body._id,
    };

    let newData = {};

    if (req.body.title) newData.title = req.body.title;
    if (req.body.description) newData.description = req.body.description;
    if (req.body.status) newData.status = req.body.status;
    if (req.body.priority) newData.priority = req.body.priority;
    if (req.body.endDate) newData.endDate = req.body.endDate;
    if (req.body.notes) newData.notes = req.body.notes;
    if (req.body.tags) newData.tags = req.body.tags;

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dia = day.toString();
    const mes = month.toString();
    let today = "";
    if (day < 10) today = "0";
    today += dia + "/";
    if (month < 10) today += "0";
    today += mes + "/" + year;

    newData.updateDate = today;

    taskModel.findOneAndUpdate(filter, newData, (err, db) => {
      if (!err) {
        if (db) {
          taskModel.findOne({ _id: db._id }, (err, dbUpdated) => {
            if (!err) {
              if (dbUpdated) {
                const response = {
                  data: dbUpdated,
                  msg: "Task updated in DB.",
                  code: 200,
                };
                res.send(response);
              } else {
                const response = {
                  data: {},
                  msg: "Task not found in DB.",
                  code: 10,
                };
                res.send(response);
              }
            } else {
              const response = {
                data: err.toString(),
                msg: "API Error",
                code: 1,
              };
              res.send(response);
            }
          });
        } else {
          const response = {
            data: {},
            msg: "Task not found in DB.",
            code: 10,
          };
          res.send(response);
        }
      } else {
        const response = {
          data: err.toString(),
          msg: "API Error",
          code: 1,
        };
        res.send(response);
      }
    });
  }
});

router.delete("/DeleteTask", auth, (req, res, next) => {
  const schemaTask = joi.object({
    _id: joi.string().alphanum().min(24).max(24).required(),
  });
  const { error } = schemaTask.validate(req.body);
  if (error) {
    const response = {
      data: error.details,
      msg: "API Error.",
      code: 3,
    };
    res.send(response);
  } else {
    taskModel.findOneAndDelete({ _id: req.body._id }, (err, db) => {
      if (!err) {
        if (db) {
          const response = {
            data: { db },
            msg: "Task deleted in DB.",
            code: 200,
          };
          res.send(response);
        } else {
          const response = {
            data: {},
            msg: "Task not found in DB.",
            code: 10,
          };
          res.send(response);
        }
      } else {
        const response = {
          data: err.toString(),
          msg: "API Error",
          code: 1,
        };
        res.send(response);
      }
    });
  }
});

module.exports = router;
