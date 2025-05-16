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

function calcularEdadConCallback(personas: Persona[], callback: (resultado: PersonaConEdad[]) => void): void {
  const resultado: PersonaConEdad[] = [];
  let procesadas = 0;

  personas.forEach((persona, index) => {
    setTimeout(() => {
      const edad = calcularEdad(persona.fechaNacimiento);
      resultado[index] = { nombre: persona.nombre, edad };
      procesadas++;

      if (procesadas === personas.length) {
        callback(resultado);
      }
    }, Math.random() * 1000); // Simula un retardo variable
  });
}

const personas: Persona[] = [
  { nombre: "Ana", fechaNacimiento: new Date("1990-05-10") },
  { nombre: "Luis", fechaNacimiento: new Date("1985-11-22") },
];

calcularEdadConCallback(personas, (resultado) => {
  console.log("Resultado con callback:", resultado);
});