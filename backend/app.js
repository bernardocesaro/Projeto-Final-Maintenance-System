const express = require("express");
const cors    = require("cors");

const categoryRoutes = require("./routes/categoryRoute");
const localRoutes = require("./routes/localRoute");
const equipmentRoutes = require("./routes/equipmentRoute");
const technicianRoutes = require("./routes/technicianRoute");
const serviceOrderRoutes = require("./routes/serviceOrderRoute");
const userRoutes = require("./routes/userRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", (req, res) => {
    console.log("API está funcionando!");
    res.status(200).json({
        status: "OK",
        message: "API está funcionando!",
        datetime: new Date().toISOString(),
    });
});

app.use("/categories", categoryRoutes);
app.use("/locals", localRoutes);
app.use("/equipments", equipmentRoutes);
app.use("/technicians", technicianRoutes);
app.use("/service-orders", serviceOrderRoutes);
app.use("/users", userRoutes);
app.use((req, res) => {
    console.warn(`Rota não encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        message: "Rota não encontrada!"
    });
});

module.exports = app;