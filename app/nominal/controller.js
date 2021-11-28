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
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findById(id);

      res.render("admin/nominal/edit", {
        nominal,
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
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQty, coinPrice } = req.body;

      console.log(coinQty, coinPrice, typeof coinQty);

      if (!coinName) {
        throw {
          name: "ValidationError",
          errors: {
            message: "Coin Name must be filled",
          },
        };
      } else if (!coinQty || !Number(coinQty)) {
        throw {
          name: "ValidationError",
          errors: {
            message: "Coin Qty must be filled",
          },
        };
      } else if (!coinPrice || !Number(coinPrice)) {
        throw {
          name: "ValidationError",
          errors: {
            message: "Coin Price must be filled",
          },
        };
      }
      await Nominal.findByIdAndUpdate(id, {
        coinName,
        coinQty,
        coinPrice,
      });

      req.flash("alertMessage", "Edit nominal has been success");
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
  actonDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Nominal.findByIdAndDelete(id);

      req.flash("alertMessage", "Delete nominal has been success");
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
};
