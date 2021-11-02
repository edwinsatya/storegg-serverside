const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const statusMessage = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: statusMessage,
      };

      const category = await Category.find();
      res.render("admin/category/view_category", {
        category,
        alert,
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        const errMsg = Object.values(err.errors).map((val) => val);
        req.flash("alertMessage", `${errMsg.join()}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      } else {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      }
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create");
    } catch (err) {
      if (err.name === "ValidationError") {
        const errMsg = Object.values(err.errors).map((val) => val);
        req.flash("alertMessage", `${errMsg.join()}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      } else {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      }
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.create({ name });

      req.flash("alertMessage", "Add new category has been success");
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (err) {
      if (err.name === "ValidationError") {
        const errMsg = Object.values(err.errors).map((val) => val);
        req.flash("alertMessage", `${errMsg.join()}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      } else {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      }
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      res.render("admin/category/edit", {
        category,
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        const errMsg = Object.values(err.errors).map((val) => val);
        req.flash("alertMessage", `${errMsg.join()}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      } else {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      }
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name) {
        throw {
          name: "ValidationError",
          errors: {
            message: "Name must be filled",
          },
        };
      }
      await Category.findByIdAndUpdate(id, {
        name,
      });

      req.flash("alertMessage", "Edit category has been success");
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (err) {
      if (err.name === "ValidationError") {
        const errMsg = Object.values(err.errors).map((val) => val);
        req.flash("alertMessage", `${errMsg.join()}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      } else {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      }
    }
  },
  actonDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Category.findByIdAndDelete(id);

      req.flash("alertMessage", "Delete category has been success");
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (err) {
      if (err.name === "ValidationError") {
        const errMsg = Object.values(err.errors).map((val) => val);
        req.flash("alertMessage", `${errMsg.join()}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      } else {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/category");
      }
    }
  },
};
