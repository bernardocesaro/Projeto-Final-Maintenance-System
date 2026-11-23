const express = require("express");
const router  = express.Router();

const {
    getAllServiceOrders,
    getServiceOrderById,
    createServiceOrder,
    updateServiceOrder,
    deleteServiceOrder,
} = require("../controllers/serviceOrderController");

router.get("/", getAllServiceOrders);
router.get("/:id", getServiceOrderById);
router.post("/", createServiceOrder);
router.put("/:id", updateServiceOrder);
router.delete("/:id", deleteServiceOrder);

module.exports = router;