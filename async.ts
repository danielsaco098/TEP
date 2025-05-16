type Persona = { nombre: string; fechaNacimiento: Date };
type PersonaConEdad = { nombre: string; edad: number };

// Función sincrónica para calcular la edad
function calcularEdad(fechaNacimiento: Date): number {
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

  return edad;
}

// Versión con promesa que simula retardo asincrónico
function calcularEdadPromesa(persona: Persona): Promise<PersonaConEdad> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const edad = calcularEdad(persona.fechaNacimiento);
      resolve({ nombre: persona.nombre, edad });
    }, Math.random() * 1000); // Simula IO asincrónico
  });
}

async function calcularEdadConAsyncAwait(personas: Persona[]): Promise<PersonaConEdad[]> {
  const promesas = personas.map(persona => calcularEdadPromesa(persona));
  const resultados = await Promise.all(promesas);
  return resultados;
}

const personas: Persona[] = [
  { nombre: "Ana", fechaNacimiento: new Date("1990-05-10") },
  { nombre: "Luis", fechaNacimiento: new Date("1985-11-22") },
];

(async () => {
  const resultado = await calcularEdadConAsyncAwait(personas);
  console.log("Resultado con async/await:", resultado);
})();
