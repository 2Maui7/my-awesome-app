import sajta from "@/assets/dish-sajta.jpg";
import saltenas from "@/assets/dish-saltenas.jpg";
import chorizo from "@/assets/dish-chorizo.jpg";
import mondongo from "@/assets/dish-mondongo.jpg";
import colonial from "@/assets/restaurant-colonial.jpg";
import cafe from "@/assets/cafe-sucre.jpg";

export type Categoria = "Tradicional" | "Café" | "Internacional" | "Postres" | "Salteñería";

export interface MenuItem {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export interface Establecimiento {
  id: string;
  nombre: string;
  categoria: Categoria;
  descripcion: string;
  direccion: string;
  horario: string;
  telefono: string;
  rating: number;
  reviews: number;
  precio: "$" | "$$" | "$$$";
  imagen: string;
  destacado?: boolean;
  menu: MenuItem[];
}

export const categorias: { nombre: Categoria; icon: string }[] = [
  { nombre: "Tradicional", icon: "🥘" },
  { nombre: "Salteñería", icon: "🥟" },
  { nombre: "Café", icon: "☕" },
  { nombre: "Internacional", icon: "🍝" },
  { nombre: "Postres", icon: "🍰" },
];

export const establecimientos: Establecimiento[] = [
  {
    id: "el-huerto",
    nombre: "El Huerto",
    categoria: "Tradicional",
    descripcion: "Cocina chuquisaqueña en un patio colonial. Especialistas en sajta de pollo y pique macho.",
    direccion: "Calle Ladislao Cabrera 86, Sucre",
    horario: "12:00 – 22:00",
    telefono: "+591 4 645-1538",
    rating: 4.8,
    reviews: 412,
    precio: "$$",
    imagen: colonial,
    destacado: true,
    menu: [
      { nombre: "Sajta de Pollo", descripcion: "Pollo en salsa de ají amarillo con chuño y arroz", precio: 45, imagen: sajta },
      { nombre: "Mondongo Chuquisaqueño", descripcion: "Cerdo en ají colorado, mote y papa", precio: 55, imagen: mondongo },
      { nombre: "Chorizos Chuquisaqueños", descripcion: "Trío de chorizos con llajwa y pan", precio: 38, imagen: chorizo },
    ],
  },
  {
    id: "salteneria-paola",
    nombre: "Salteñería Paola",
    categoria: "Salteñería",
    descripcion: "La salteña más famosa de Sucre. Jugosas, picantes y siempre recién horneadas.",
    direccion: "Calle Dalence 252, Sucre",
    horario: "08:00 – 12:30",
    telefono: "+591 4 644-8231",
    rating: 4.9,
    reviews: 638,
    precio: "$",
    imagen: saltenas,
    destacado: true,
    menu: [
      { nombre: "Salteña de Pollo", descripcion: "Receta tradicional con aceitunas y huevo", precio: 8, imagen: saltenas },
      { nombre: "Salteña de Carne", descripcion: "Carne, papa y caldo especiado", precio: 8, imagen: saltenas },
      { nombre: "Salteña Mixta", descripcion: "Mitad pollo, mitad carne", precio: 9, imagen: saltenas },
    ],
  },
  {
    id: "abis-cafe",
    nombre: "Abis Café",
    categoria: "Café",
    descripcion: "Café de especialidad boliviano en un espacio luminoso lleno de plantas.",
    direccion: "Calle Nicolás Ortiz 42, Sucre",
    horario: "07:30 – 21:00",
    telefono: "+591 4 644-1278",
    rating: 4.7,
    reviews: 289,
    precio: "$$",
    imagen: cafe,
    menu: [
      { nombre: "Flat White", descripcion: "Espresso doble con leche texturizada", precio: 18, imagen: cafe },
      { nombre: "Cappuccino", descripcion: "Receta italiana con cacao", precio: 16, imagen: cafe },
      { nombre: "Cold Brew", descripcion: "Extracción en frío 18h", precio: 22, imagen: cafe },
    ],
  },
  {
    id: "la-taverne",
    nombre: "La Taverne",
    categoria: "Internacional",
    descripcion: "Cocina francesa con toque andino. Carta de vinos bolivianos seleccionados.",
    direccion: "Calle Aniceto Arce 35, Sucre",
    horario: "18:00 – 23:00",
    telefono: "+591 4 645-2355",
    rating: 4.6,
    reviews: 198,
    precio: "$$$",
    imagen: colonial,
    menu: [
      { nombre: "Confit de Pato", descripcion: "Pato confitado con puré de oca", precio: 95, imagen: mondongo },
      { nombre: "Trucha al Vino", descripcion: "Trucha andina en reducción de tannat", precio: 78, imagen: sajta },
    ],
  },
  {
    id: "cafe-mirador",
    nombre: "Café Mirador",
    categoria: "Café",
    descripcion: "Vista panorámica de los tejados de Sucre. Desayunos y reposteria.",
    direccion: "Plaza Pedro Anzures, La Recoleta",
    horario: "09:00 – 20:00",
    telefono: "+591 4 644-0961",
    rating: 4.8,
    reviews: 521,
    precio: "$$",
    imagen: cafe,
    menu: [
      { nombre: "Desayuno Mirador", descripcion: "Café, jugo, huevos, pan y mermelada casera", precio: 42, imagen: cafe },
    ],
  },
  {
    id: "condor-cafe",
    nombre: "Cóndor Café",
    categoria: "Postres",
    descripcion: "Reposteria artesanal: tartas, alfajores y chocolates de origen boliviano.",
    direccion: "Calle Calvo 102, Sucre",
    horario: "10:00 – 21:30",
    telefono: "+591 4 643-7720",
    rating: 4.7,
    reviews: 312,
    precio: "$$",
    imagen: cafe,
    menu: [
      { nombre: "Tarta de Maracuyá", descripcion: "Base de almendra, curd de maracuyá", precio: 28, imagen: saltenas },
      { nombre: "Alfajor de Quinua", descripcion: "Dulce de leche entre tapas de quinua", precio: 12, imagen: saltenas },
    ],
  },
];

export function getEstablecimiento(id: string) {
  return establecimientos.find((e) => e.id === id);
}
