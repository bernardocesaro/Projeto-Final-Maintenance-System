const express = require("express");
const router  = express.Router();

const {
    getAllLocals,
    getLocalById,
    createLocal,
    updateLocal,
    deleteLocal,
} = require("../controllers/localController");

router.get("/", getAllLocals);
router.get("/:id", getLocalById);
router.post("/", createLocal);
router.put("/:id", updateLocal);
router.delete("/:id", deleteLocal);

module.exports = router;