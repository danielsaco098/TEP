type Persona = { nombre: string; fechaNacimiento: Date };
type PersonaConEdad = { nombre: string; edad: number };

function calcularEdad(fechaNacimiento: Date): number {
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

  return edad;
}

function calcularEdadPromesa(persona: Persona): Promise<PersonaConEdad> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const edad = calcularEdad(persona.fechaNacimiento);
      resolve({ nombre: persona.nombre, edad });
    }, Math.random() * 1000);
  });
}

function calcularEdadConPromesas(personas: Persona[]): Promise<PersonaConEdad[]> {
  return Promise.all(personas.map(calcularEdadPromesa));
}

const personas: Persona[] = [
  { nombre: "Ana", fechaNacimiento: new Date("1990-05-10") },
  { nombre: "Luis", fechaNacimiento: new Date("1985-11-22") },
];

calcularEdadConPromesas(personas).then((resultado) =>
  console.log("Resultado con promesas:", resultado)
);