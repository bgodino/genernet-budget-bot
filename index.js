const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

app.post('/presupuesto', async (req, res) => {
  const { dni } = req.body;
  if (!dni) return res.status(400).json({ error: 'Falta DNI' });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  try {
    await page.goto('https://access.generali.es', { waitUntil: 'networkidle2' });

    // Aquí iría el login (rellenar usuario y contraseña)
    // await page.type('#usuario', 'TU_USUARIO');
    // await page.type('#clave', 'TU_CLAVE');
    // await page.click('#botonEntrar');
    // await page.waitForNavigation();

    // Simulación de pasos reales basada en tus pantallazos (por implementar):
    // Navegación por menús > Proyecto de seguro > Decesos > Familiar/Residentes
    // Introducir DNI, seleccionar modalidad, seleccionar capital adicional 1000€
    // Ir a pestaña Recibos, seleccionar pago Anual, leer importe

    const importeAnual = 42.80; // Simulado, reemplazar con scraping real

    await browser.close();
    res.json({ dni, importeAnual });

  } catch (error) {
    await browser.close();
    res.status(500).json({ error: 'Error en automatización', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});