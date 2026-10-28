/* ============================================================
   OWN STUDIO · Configuración del cotizador
   Edita aquí (o desde admin.html) precios, puntos, paquetes y términos.
   1 punto = `rate` pesos. Si un item trae `price`, ese es el precio directo en pesos.
   Si un item trae `quote: true`, no suma al total: se cotiza por WhatsApp.
   ============================================================ */
window.OWN_CONFIG = {
  "rate": 150,
  "whatsapp": "527717948519",
  "handle": "@ownstudio.hq",
  "validDays": 15,
  "advancePct": 50,
  "minMonths": 3,
  "tiers": [
    { "min": 100, "pct": 12 },
    { "min": 60, "pct": 8 },
    { "min": 30, "pct": 5 }
  ],
  "categories": [
    {
      "id": "redes",
      "tab": "Redes",
      "name": "Redes y contenido",
      "monthly": true,
      "blurb": "Contenido mensual para tus redes. Elige cuántas piezas necesitas al mes.",
      "items": [
        { "id": "post", "icon": "post", "name": "Post", "desc": "Diseño de post para el feed.", "days": "2–3 días hábiles por pieza", "max": 30,
          "variants": [ { "key": "cliente", "label": "Fotos del cliente", "pts": 1 }, { "key": "own", "label": "Fotos de Own", "pts": 2 } ] },
        { "id": "historia", "icon": "historia", "name": "Historia", "desc": "Historia vertical para Instagram o Facebook.", "days": "2–3 días hábiles por pieza", "max": 30,
          "variants": [ { "key": "cliente", "label": "Fotos del cliente", "pts": 1 }, { "key": "own", "label": "Fotos de Own", "pts": 2 } ] },
        { "id": "carrusel", "icon": "carrusel", "name": "Carrusel", "desc": "Varias láminas para contar algo completo.", "days": "2–3 días hábiles por pieza", "max": 12,
          "variants": [ { "key": "cliente", "label": "Fotos del cliente", "pts": 2 }, { "key": "own", "label": "Fotos de Own", "pts": 4 } ] },
        { "id": "video", "icon": "video", "name": "Video corto", "desc": "Reel o video vertical con edición.", "days": "3–4 días hábiles por video", "max": 12,
          "variants": [ { "key": "edicion", "label": "Solo edición", "pts": 2 }, { "key": "grabacion", "label": "Grabamos y editamos", "pts": 5 } ] },
        { "id": "copy", "icon": "copy", "name": "Copy mensual", "desc": "Los textos de tus publicaciones del mes.", "pts": 4, "max": 1 },
        { "id": "plan", "icon": "plan", "name": "Plan de contenido", "desc": "Calendario del mes con temas y fechas.", "pts": 3, "max": 1 }
      ]
    },
    {
      "id": "marca",
      "tab": "Marca",
      "name": "Marca e identidad",
      "monthly": false,
      "blurb": "Lo que hace que te reconozcan: logo, colores, tipografías y reglas de uso.",
      "items": [
        { "id": "logo", "icon": "logo", "name": "Logo", "desc": "Logo principal con versiones de color y fondo.", "pts": 20, "days": "5–7 días hábiles", "max": 1 },
        { "id": "identidad", "icon": "identidad", "name": "Identidad visual básica", "desc": "Logo, paleta, tipografías y mini guía de uso.", "pts": 60, "days": "7–10 días hábiles", "max": 1 },
        { "id": "manual", "icon": "manual", "name": "Manual de marca", "desc": "Guía completa: logo, color, tipografía y aplicaciones.", "pts": 50, "days": "10–15 días hábiles", "max": 1 },
        { "id": "concepto", "icon": "concepto", "name": "Concepto y moodboard", "desc": "La dirección visual antes de diseñar.", "pts": 8, "max": 1 }
      ]
    },
    {
      "id": "mkt",
      "tab": "Mkt",
      "name": "Marketing",
      "monthly": false,
      "blurb": "Estrategia para saber qué decir, a quién y cuándo.",
      "items": [
        { "id": "estrategia", "icon": "estrategia", "name": "Estrategia de contenido", "desc": "Qué publicar, para quién y con qué objetivo.", "pts": 20, "max": 1 },
        { "id": "competencia", "icon": "competencia", "name": "Análisis de competencia", "desc": "Qué hacen los demás y dónde puedes diferenciarte.", "pts": 12, "max": 1 },
        { "id": "voz", "icon": "voz", "name": "Voz y mensajes", "desc": "Cómo habla tu marca y qué dice en cada lugar.", "pts": 15, "max": 1 },
        { "id": "lanzamiento", "icon": "lanzamiento", "name": "Plan de lanzamiento", "desc": "Pasos y calendario para salir con fuerza.", "pts": 30, "max": 1 },
        { "id": "auditoria", "icon": "auditoria", "name": "Auditoría de redes", "desc": "Revisamos tus perfiles y te decimos qué cambiar.", "pts": 8, "days": "5–7 días hábiles", "max": 1 }
      ]
    },
    {
      "id": "uiux",
      "tab": "UI/UX y Web",
      "name": "UI/UX y Web",
      "monthly": false,
      "blurb": "Interfaces y sitios que se entienden a la primera.",
      "items": [
        { "id": "pantalla", "icon": "pantalla", "name": "Pantalla UI", "desc": "Diseño de una pantalla de app o sitio.", "pts": 4, "max": 40 },
        { "id": "prototipo", "icon": "prototipo", "name": "Prototipo navegable", "desc": "Tus pantallas conectadas para probarlas.", "pts": 6, "max": 1 },
        { "id": "uikit", "icon": "uikit", "name": "Sistema de diseño (UI kit)", "desc": "Botones, colores, textos y componentes listos para usar.", "pts": 20, "max": 1 },
        { "id": "landing", "icon": "landing", "name": "Landing page", "desc": "Una página que explica y vende una sola cosa.", "pts": 28, "days": "5–7 días hábiles", "max": 1 },
        { "id": "web", "icon": "web", "name": "Web completa", "desc": "Sitio de varias secciones, diseñado y publicado.", "pts": 60, "days": "15–20 días hábiles", "max": 1 },
        { "id": "ajustes", "icon": "ajustes", "name": "Bloque de ajustes", "desc": "Cambios extra después de la ronda de revisión incluida.", "pts": 5, "max": 10 }
      ]
    },
    {
      "id": "alacarta",
      "tab": "A la carta",
      "name": "Diseño a la carta",
      "monthly": false,
      "blurb": "Piezas sueltas con precio fijo. Sin puntos, sin vueltas.",
      "items": [
        { "id": "flyer", "icon": "flyer", "name": "Flyer", "desc": "Una cara, listo para imprimir o compartir.", "price": 250, "days": "24–48 h", "max": 20 },
        { "id": "banner", "icon": "banner", "name": "Banner", "desc": "Para web, portada o evento.", "price": 250, "days": "24–48 h", "max": 20 },
        { "id": "tarjeta", "icon": "tarjeta", "name": "Tarjeta de presentación", "desc": "Frente y vuelta.", "price": 250, "days": "24–48 h", "max": 20 },
        { "id": "portada", "icon": "portada", "name": "Portada", "desc": "Para redes, video o documento.", "price": 250, "days": "24–48 h", "max": 20 },
        { "id": "lona", "icon": "lona", "name": "Lona", "desc": "Diseño en gran formato.", "price": 400, "days": "24–48 h", "max": 10 },
        { "id": "menu", "icon": "menu", "name": "Menú", "desc": "Precio según número de páginas y productos.", "quote": true, "max": 1 },
        { "id": "invitacion", "icon": "invitacion", "name": "Invitación", "desc": "Digital o impresa. Se cotiza por WhatsApp.", "quote": true, "max": 1 },
        { "id": "presentacion", "icon": "presentacion", "name": "Presentación", "desc": "Precio según número de láminas.", "quote": true, "max": 1 },
        { "id": "etiqueta", "icon": "etiqueta", "name": "Etiqueta o empaque", "desc": "Se cotiza según medidas y cantidad de variantes.", "quote": true, "max": 1 }
      ]
    }
  ],
  "packages": [
    {
      "id": "redes-basico", "slot": "mensual", "tag": "MENSUAL", "name": "Redes Básico",
      "blurb": "Para empezar a publicar con constancia.",
      "items": [ { "id": "post", "qty": 8, "variant": "cliente" }, { "id": "historia", "qty": 2, "variant": "cliente" }, { "id": "plan", "qty": 1 } ],
      "includes": ["8 posts", "2 historias", "Plan de contenido"],
      "note": "Con fotos del cliente. Mínimo 3 meses."
    },
    {
      "id": "redes-medio", "slot": "mensual", "tag": "MENSUAL", "name": "Redes Medio",
      "blurb": "Contenido variado y textos incluidos.",
      "items": [ { "id": "post", "qty": 12, "variant": "cliente" }, { "id": "historia", "qty": 6, "variant": "cliente" }, { "id": "carrusel", "qty": 2, "variant": "cliente" }, { "id": "video", "qty": 1, "variant": "edicion" }, { "id": "copy", "qty": 1 }, { "id": "plan", "qty": 1 } ],
      "includes": ["12 posts", "6 historias", "2 carruseles", "1 video (edición)", "Copy mensual", "Plan de contenido"],
      "note": "Con fotos del cliente. Mínimo 3 meses."
    },
    {
      "id": "redes-deluxe", "slot": "mensual", "tag": "MENSUAL", "name": "Redes Deluxe",
      "blurb": "Presencia completa, con video.",
      "items": [ { "id": "post", "qty": 18, "variant": "cliente" }, { "id": "historia", "qty": 10, "variant": "cliente" }, { "id": "carrusel", "qty": 4, "variant": "cliente" }, { "id": "video", "qty": 4, "variant": "edicion" }, { "id": "copy", "qty": 1 }, { "id": "plan", "qty": 1 } ],
      "includes": ["18 posts", "10 historias", "4 carruseles", "4 videos (edición)", "Copy mensual", "Plan de contenido"],
      "note": "Con fotos del cliente. Mínimo 3 meses."
    },
    {
      "id": "marca-completa", "slot": "proyecto", "tag": "PROYECTO", "name": "Marca completa",
      "blurb": "Identidad y manual para que todo se vea de la misma marca.",
      "items": [ { "id": "identidad", "qty": 1 }, { "id": "manual", "qty": 1 } ],
      "includes": ["Identidad visual básica", "Manual de marca"],
      "bonus": [ { "id": "voz", "qty": 1 } ]
    },
    {
      "id": "landing-lista", "slot": "proyecto", "tag": "PROYECTO", "name": "Landing lista",
      "blurb": "Una página para presentar tu negocio o producto.",
      "items": [ { "id": "landing", "qty": 1 }, { "id": "ajustes", "qty": 1 } ],
      "includes": ["Landing page", "Bloque de ajustes"]
    },
    {
      "id": "web-completa", "slot": "proyecto", "tag": "PROYECTO", "name": "Web completa",
      "blurb": "Sitio de varias secciones, probado antes de construirse.",
      "items": [ { "id": "web", "qty": 1 }, { "id": "prototipo", "qty": 1 }, { "id": "ajustes", "qty": 1 } ],
      "includes": ["Web completa", "Prototipo navegable", "Bloque de ajustes"]
    },
    {
      "id": "todo-incluido", "slot": "combo", "tag": "TODO EN UNO", "name": "Todo Incluido",
      "blurb": "Arrancas con marca y landing, y seguimos con tus redes cada mes.",
      "items": [ { "id": "identidad", "qty": 1 }, { "id": "landing", "qty": 1 }, { "id": "post", "qty": 12, "variant": "cliente" }, { "id": "historia", "qty": 6, "variant": "cliente" }, { "id": "carrusel", "qty": 2, "variant": "cliente" }, { "id": "video", "qty": 1, "variant": "edicion" }, { "id": "copy", "qty": 1 }, { "id": "plan", "qty": 1 } ],
      "includes": ["Identidad visual básica", "Landing page", "Redes Medio cada mes"],
      "bonus": [ { "id": "voz", "qty": 1 }, { "id": "auditoria", "qty": 1 } ],
      "note": "Redes con fotos del cliente. Mínimo 3 meses."
    }
  ],
  "delivery": [
    ["Logo", "5–7 días hábiles"],
    ["Identidad visual básica", "7–10 días hábiles"],
    ["Manual de marca", "10–15 días hábiles"],
    ["Landing page", "5–7 días hábiles"],
    ["Web completa", "15–20 días hábiles"],
    ["Diseños a la carta", "24–48 horas"],
    ["Piezas sueltas de redes", "2–3 días hábiles"],
    ["Videos", "3–4 días hábiles"],
    ["Auditoría de redes", "5–7 días hábiles"]
  ],
  "terms": [
    "Cada punto incluye una ronda de revisión. Los ajustes extra se cobran aparte.",
    "Trabajos urgentes (menos de 48 horas) llevan un 20% extra.",
    "Los planes mensuales se cancelan con 15 días de aviso. Mínimo 3 meses y el primer mes se paga por adelantado.",
    "Esta cotización es un estimado, válido por 15 días. No es un contrato.",
    "Los proyectos se pagan 50% de anticipo y 50% contra entrega, por transferencia bancaria.",
    "El anticipo de un proyecto ya iniciado no es reembolsable.",
    "Si el contenido o los materiales llegan tarde, las fechas de entrega se mueven.",
    "Los planes de redes incluyen hasta 2 llamadas al mes.",
    "Own puede mostrar el trabajo terminado en su portafolio, dando crédito a tu marca."
  ]
};
