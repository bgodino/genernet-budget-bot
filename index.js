import express from "express";
import puppeteer from "puppeteer";

const app = express();
app.use(express.json());

app.post("/presupuesto", async (req, res) => {
  const { dni, capital } = req.body;

  if (!dni || !capital) return res.status(400).send("DNI y capital son obligatorios");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://generali.es/arq_genernetPortalFormWeb/CRMPortal.po?mediatorCode=43855#");

    // Simulación de pasos
    await page.waitForSelector("#dni");
    await page.type("#dni", dni);

    // Suponiendo que el capital se selecciona con un selector
    await page.select("#capitalSelect", capital.toString());

    // Ir a pestaña recibos, seleccionar pago anual, extraer importe
    await page.waitForSelector("#totalImporte"); // ejemplo
    const importe = await page.$eval("#totalImporte", el => el.innerText);

    await browser.close();
    res.json({ importeAnual: importe });

  } catch (err) {
    await browser.close();
    res.status(500).send("Error en la simulación: " + err.message);
  }
});

app.listen(10000, () => {
  console.log("Servidor escuchando en el puerto 10000");
});