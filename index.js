import express from "express";
import puppeteer from "puppeteer";

const app = express();
app.use(express.json());

app.post("/presupuesto", async (req, res) => {
  const { dni } = req.body;
  if (!dni) return res.status(400).send("Falta DNI");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  try {
    await page.goto("https://access.generali.es", { waitUntil: "networkidle2" });

    // Aquí iría el flujo real que simula el acceso y pasos de Genernet
    // Por ahora devolvemos un número simulado para testeo
    await new Promise(r => setTimeout(r, 2000)); // Simula espera de navegación

    const importe = "56.78"; // Ejemplo
    await browser.close();
    res.json({ dni, importe });

  } catch (err) {
    await browser.close();
    res.status(500).json({ error: "Error al automatizar", detalle: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto", PORT);
});