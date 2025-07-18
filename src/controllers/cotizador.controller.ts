import { Request, Response } from "express";

// Constantes
const TARIFA_BASE = 2000;
const MAX_TARIMAS = 26;
const PESO_MAXIMO_TARIMA = 500;
const DESCUENTOS_VOLUMEN: [number, number, number][] = [
  [1, 1, 0.00],
  [2, 4, 0.05],
  [5, 9, 0.10],
  [10, 14, 0.15],
  [15, 20, 0.20]
];
const DESCUENTO_ANTICIPADO = 0.10;
const RECARGO_URGENCIA = 0.25;

function getDescuentoVolumen(tarimas: number): number {
  for (const [min, max, descuento] of DESCUENTOS_VOLUMEN) {
    if (tarimas >= min && tarimas <= max) return descuento;
  }
  return 0;
}

export const cotizarEnvio = (req: Request, res: Response) => {
  try {
    const { tarimas, peso_por_tarima, fecha_envio } = req.body;
    console.log("Solicitud de cotización recibida:", req.body);

    if (!tarimas || !peso_por_tarima || !fecha_envio) {
      console.log("Faltan datos requeridos");
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    if (tarimas > MAX_TARIMAS) {
      console.log("Supera el máximo de tarimas");
      return res.status(400).json({ error: `El máximo permitido es ${MAX_TARIMAS} tarimas` });
    }
    if (peso_por_tarima > PESO_MAXIMO_TARIMA) {
      console.log("Supera el peso máximo por tarima");
      return res.status(400).json({ error: `El peso máximo por tarima es ${PESO_MAXIMO_TARIMA} kg` });
    }

    // Calcular días de anticipación
    const fechaEnvio = new Date(fecha_envio);
    const hoy = new Date();
    const dias_anticipacion = Math.floor((fechaEnvio.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    console.log("Días de anticipación:", dias_anticipacion);

    // Descuento por volumen
    const descuento_volumen = getDescuentoVolumen(tarimas);
    let precio_por_tarima = TARIFA_BASE * (1 - descuento_volumen);
    let precio_total = precio_por_tarima * tarimas;
    console.log("Precio por tarima después de descuento volumen:", precio_por_tarima);

    // Descuento por compra anticipada
    if (dias_anticipacion > 3) {
      precio_total *= (1 - DESCUENTO_ANTICIPADO);
      console.log("Aplicando descuento por anticipación");
    }
    // Recargo por urgencia
    if (dias_anticipacion < 2) {
      precio_total *= (1 + RECARGO_URGENCIA);
      console.log("Aplicando recargo por urgencia");
    }

    console.log("Precio total calculado:", precio_total);

    return res.json({
      fecha_envio,
      tarimas,
      peso_por_tarima,
      dias_anticipacion,
      precio_total: Math.round(precio_total * 100) / 100
    });
  } catch (err) {
    console.error("Error en la cotización:", err);
    return res.status(500).json({ error: "Error en la cotización" });
  }
};