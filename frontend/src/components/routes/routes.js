export const sidebar_routes = [
  {
    text: "Calendario",
    route: "/",
  },
  {
    text: "Comisiones",
    route: "/comisiones",
  },
  {
    text: "Leyes",
    route: "/leyes",
  },
  {
    text: "Plenos",
    route: "/plenos",
  },
  {
    text: "Mociones",
    route: "/mociones",
  },
  {
    text: "Preguntas",
    route: "/preguntas",
  },
  {
    text: "Senadores",
    route: "/view/senadores",
  },
];

export const dropdowns = [
  {
    title: "Organización",
    childrens: [
      {
        text: "Añadir Comisión",
        route: "/new/comision",
      },
      {
        text: "Añadir Senador",
        route: "/new",
      },
      {
        text: "Añadir Pleno",
        route: "/new/pleno",
      },
      {
        text: "Añadir Pregunta",
        route: "/new/pregunta",
      },
    ],
  },
];
