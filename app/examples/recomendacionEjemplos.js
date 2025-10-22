/**
 * Ejemplo de uso del algoritmo de recomendación
 * Este archivo muestra cómo integrar el sistema en el formulario
 */

import { calcularRecomendacionProductos } from "../utils/productRecommendation";

// ============================================
// EJEMPLO 1: Perro Adulto Mediano
// ============================================

const ejemploPerro = {
  q1: "Perro",
  q2: "Max",
  q2b: "2020-03-15", // Fecha de nacimiento
  q3_perro: "Mediano",
  q4_perro: "Adulto",
  q5_perro: "Media",
  q6_perro: "15",
  q7_perro: "2-3",
  q8_perro: "Sí",
  q9_perro: [],
  q10_perro: "Mixta",
  q11_perro: "Salmón + Pesc zanahoria",
};

const resultadoPerro = calcularRecomendacionProductos(ejemploPerro);

console.log("=== RECOMENDACIÓN PARA PERRO ===");
console.log(`Mascota: ${resultadoPerro.nombreMascota}`);
console.log(`Calorías diarias: ${resultadoPerro.kcalDiarias} kcal`);
console.log(`Tipo: ${resultadoPerro.tipoAlimentacion}`);
console.log("\nProducto Seco:");
console.log(`- ${resultadoPerro.recomendacion.productoSeco.nombre}`);
console.log(`- ${resultadoPerro.recomendacion.productoSeco.gramosDiarios}g/día`);
console.log(`- Tamaño: ${resultadoPerro.recomendacion.productoSeco.varianteRecomendada.cantidad}`);
console.log("\nProducto Húmedo:");
console.log(`- ${resultadoPerro.recomendacion.productoHumedo.nombre}`);
console.log(`- ${resultadoPerro.recomendacion.productoHumedo.gramosDiarios}g/día`);

// ============================================
// EJEMPLO 2: Cachorro Raza Grande
// ============================================

const ejemploCachorro = {
  q1: "Perro",
  q2: "Rocky",
  q2b: "2024-08-20", // 2 meses
  q3_perro: "Grande",
  q4_perro: "Cachorro",
  q5_perro: "Media", // Se ignorará, cachorros usan valor fijo
  q6_perro: "8",
  q7_perro: "1 o menos",
  q8_perro: "No",
  q9_perro: [],
  q10_perro: "Seca",
  q11_perro: "Salmón Cachorro + Lata cachorro",
};

const resultadoCachorro = calcularRecomendacionProductos(ejemploCachorro);

console.log("\n=== RECOMENDACIÓN PARA CACHORRO ===");
console.log(`Mascota: ${resultadoCachorro.nombreMascota}`);
console.log(`Calorías diarias: ${resultadoCachorro.kcalDiarias} kcal`);
console.log(`Factor edad aplicado: ${resultadoCachorro.factores.factorEdad}`);
console.log("\nProducto:");
console.log(`- ${resultadoCachorro.recomendacion.productoSeco.nombre}`);
console.log(`- ${resultadoCachorro.recomendacion.productoSeco.gramosDiarios}g/día`);

// ============================================
// EJEMPLO 3: Gato Adulto Esterilizado
// ============================================

const ejemploGato = {
  q1: "Gato",
  q2: "Luna",
  q2b: "2021-05-10",
  q3_gato: "Adulto",
  q5_gato: "4.2",
  q6_gato: "Sí",
  q7_gato: ["Sobrepeso"],
  q8_gato: "Mixta",
};

const resultadoGato = calcularRecomendacionProductos(ejemploGato);

console.log("\n=== RECOMENDACIÓN PARA GATO ===");
console.log(`Mascota: ${resultadoGato.nombreMascota}`);
console.log(`Calorías diarias: ${resultadoGato.kcalDiarias} kcal`);
console.log(`Factores: FACT=${resultadoGato.factores.FACT}, FACT2=${resultadoGato.factores.FACT2}`);
console.log("\nProducto Seco:");
console.log(`- ${resultadoGato.recomendacion.productoSeco.nombre}`);
console.log(`- ${resultadoGato.recomendacion.productoSeco.gramosDiarios}g/día`);
console.log("\nProducto Húmedo:");
console.log(`- ${resultadoGato.recomendacion.productoHumedo.nombre}`);
console.log(`- ${resultadoGato.recomendacion.productoHumedo.gramosDiarios}g/día`);

// ============================================
// EJEMPLO 4: Gatito Pequeño
// ============================================

const ejemploGatito = {
  q1: "Gato",
  q2: "Mochi",
  q2b: "2024-07-15", // 3 meses
  q3_gato: "Gatito",
  q4_gato_gatito: "1-4 meses",
  q5_gato: "1.2",
  q6_gato: "No",
  q7_gato: [],
  q8_gato: "Seca",
};

const resultadoGatito = calcularRecomendacionProductos(ejemploGatito);

console.log("\n=== RECOMENDACIÓN PARA GATITO ===");
console.log(`Mascota: ${resultadoGatito.nombreMascota}`);
console.log(`Calorías diarias: ${resultadoGatito.kcalDiarias} kcal`);
console.log(`Producto: ${resultadoGatito.recomendacion.productoSeco.nombre}`);
console.log(`Cantidad: ${resultadoGatito.recomendacion.productoSeco.gramosDiarios}g/día`);

// ============================================
// EJEMPLO 5: Perro Senior con Sobrepeso
// ============================================

const ejemploSenior = {
  q1: "Perro",
  q2: "Bobby",
  q2b: "2014-11-20", // 10 años
  q3_perro: "Pequeño",
  q4_perro: "Senior",
  q5_perro: "Baja",
  q6_perro: "8",
  q7_perro: "Muchos (Más de 3)",
  q8_perro: "Sí",
  q9_perro: ["Sobrepeso", "Problemas articulares"],
  q10_perro: "Seca",
  q11_perro: "¡Sorpréndeme!",
};

const resultadoSenior = calcularRecomendacionProductos(ejemploSenior);

console.log("\n=== RECOMENDACIÓN PARA SENIOR ===");
console.log(`Mascota: ${resultadoSenior.nombreMascota}`);
console.log(`Calorías diarias: ${resultadoSenior.kcalDiarias} kcal`);
console.log(`Producto especial: ${resultadoSenior.recomendacion.productoSeco.nombre}`);
console.log(`Cantidad reducida: ${resultadoSenior.recomendacion.productoSeco.gramosDiarios}g/día`);
console.log(`Factores aplicados:`);
console.log(`- Edad Senior: ${resultadoSenior.factores.factorEdad}`);
console.log(`- Actividad Baja: ${resultadoSenior.factores.varActividad}`);
console.log(`- Esterilizado: ${resultadoSenior.factores.factEsterilizado}`);
console.log(`- Muchos snacks: ${resultadoSenior.factores.factSnacks}`);

// ============================================
// RESULTADO ESPERADO
// ============================================

/*
EJEMPLO 1 - Perro Adulto Mediano:
- Kcal/día: ~678 kcal
- Seco: RETORN ADULT SALMON - 153g/día (3kg recomendado)
- Húmedo: PESCADO CON ZANAHORIA - 156g/día

EJEMPLO 2 - Cachorro Grande:
- Kcal/día: ~1100 kcal (factor edad 2.0)
- Seco: RETORN PUPPY SALMON - 319g/día (3-6kg recomendado)

EJEMPLO 3 - Gato Esterilizado:
- Kcal/día: ~225 kcal (fórmula gato esterilizado)
- Seco: RETORN CAT LIGHT STERILIZED - 57g/día (2kg)
- Húmedo: POLLO CON CONEJO - 60g/día

EJEMPLO 4 - Gatito:
- Kcal/día: ~300 kcal (factor gatito joven)
- Seco: RETORN CAT KITTEN - 72g/día (2kg)

EJEMPLO 5 - Senior con Sobrepeso:
- Kcal/día: ~380 kcal (múltiples reducciones)
- Seco: RETORN LIGHT AND SENIOR - 110g/día (3kg Small Bite)
*/
