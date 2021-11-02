const Nominal = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const statusMessage = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: statusMessage,
      };

      const nominal = await Nominal.find();
      res.render("admin/nominal/view_nominal", {
        nominal,
        alert,
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        const errMsg = Object.values(err.errors).map((val) => val);
        req.flash("alertMessage", `${errMsg.join()}`);
        req.flash("alertStatus", "danger");
        res.redirect("/nominal");
      } else {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/nominal");
      }
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create");
    } catch (err) {
      if (err.name === "ValidationError") {
        const errMsg = Object.values(err.errors).map((val) => val);
        req.flash("alertMessage", `${errMsg.join()}`);
        req.flash("alertStatus", "danger");
        res.redirect("/nominal");
      } else {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/nominal");
      }
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { coinName, coinQty, coinPrice } = req.body;
      await Nominal.create({ coinName, coinQty, coinPrice });

      req.flash("alertMessage", "Add new coin has been success");
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (err) {
      if (err.name === "ValidationError") {
        const errMsg = Object.values(err.errors).map((val) => val);
        req.flash("alertMessage", `${errMsg.join()}`);
        req.flash("alertStatus", "danger");
        res.redirect("/nominal");
      } else {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/nominal");
      }
    }
  },
  // viewEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const category = await Category.findById(id);

  //     res.render("admin/category/edit", {
  //       category,
  //     });
  //   } catch (err) {
  //     if (err.name === "ValidationError") {
  //       const errMsg = Object.values(err.errors).map((val) => val);
  //       req.flash("alertMessage", `${errMsg.join()}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/category");
  //     } else {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/category");
  //     }
  //   }
  // },
  // actionEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { name } = req.body;
  //     if (!name) {
  //       throw {
  //         name: "ValidationError",
  //         errors: {
  //           message: "Name must be filled",
  //         },
  //       };
  //     }
  //     await Category.findByIdAndUpdate(id, {
  //       name,
  //     });

  //     req.flash("alertMessage", "Edit category has been success");
  //     req.flash("alertStatus", "success");

  //     res.redirect("/category");
  //   } catch (err) {
  //     if (err.name === "ValidationError") {
  //       const errMsg = Object.values(err.errors).map((val) => val);
  //       req.flash("alertMessage", `${errMsg.join()}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/category");
  //     } else {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/category");
  //     }
  //   }
  // },
  // actonDelete: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     await Category.findByIdAndDelete(id);

  //     req.flash("alertMessage", "Delete category has been success");
  //     req.flash("alertStatus", "success");

  //     res.redirect("/category");
  //   } catch (err) {
  //     if (err.name === "ValidationError") {
  //       const errMsg = Object.values(err.errors).map((val) => val);
  //       req.flash("alertMessage", `${errMsg.join()}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/category");
  //     } else {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/category");
  //     }
  //   }
  // },
};
