# 🧩 Rompecabezas Interactivo

Puzzle deslizante **3×3** construido íntegramente con **HTML, CSS y JavaScript vanilla**. En cada partida se selecciona aleatoriamente una de las 4 temáticas disponibles y las piezas se mezclan con el algoritmo **Fisher-Yates**. ¡Ordénalas con el menor número de movimientos y en el menor tiempo posible!

## 🔴 Live Preview

👉 [**Jugar ahora**](https://olaigv.github.io/Rompecabezas/)

## 📸 Demo

[![Demo del rompecabezas](https://img.youtube.com/vi/WJLuPLp9o2U/0.jpg)](https://www.youtube.com/watch?v=WJLuPLp9o2U)

## 🎮 ¿Cómo se juega?

1. Al cargar la página se selecciona una imagen aleatoria y se mezclan las piezas.
2. **Escrtorio:** arrastra una pieza adyacente al hueco para deslizarla.
3. **Móvil / táctil:** toca una pieza adyacente al hueco para moverla.
4. Reconstruye la imagen original con el mínimo de movimientos y tiempo.
5. Al resolver el puzzle aparece un mensaje con tu puntuación.
6. Pulsa **↺ Nueva partida** para reiniciar en cualquier momento.

## 🖼️ Temáticas disponibles

| Asturias | Doraemon | Paisaje | Puente |
|:---:|:---:|:---:|:---:|
| 🏔️ | 🤖 | 🌄 | 🌉 |

## 🛠️ Tecnologías

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Características

- 4 conjuntos de imágenes seleccionados aleatoriamente en cada partida
- Mezcla uniforme con algoritmo **Fisher-Yates**
- Pieza vacía real con seguimiento dinámico (sin asumir posición fija)
- Contador de **movimientos** y **temporizador** en tiempo real
- Validación de adyacencia para movimientos legales únicamente
- **Detección de victoria** con resumen de movimientos y tiempo
- Soporte completo para **drag & drop** (escritorio) y **eventos táctiles** (móvil)
- Botón de reinicio sin recargar la página
- Tipografías decorativas vía **Google Fonts** (Grenze Gotisch + Nabla)

## 📁 Estructura del proyecto

```
Rompecabezas/
├── index.html
├── css/
│   ├── reset.css
│   └── rompecabezas.css
├── js/
│   └── rompecabezas.js
└── imagenes/
    ├── asturias/   (1.jpg – 8.jpg)
    ├── doraemon/   (1.jpg – 8.jpg)
    ├── paisaje/    (1.jpg – 8.jpg)
    └── puente/     (1.jpg – 8.jpg)
```

## 🚀 Uso local

```bash
git clone https://github.com/OlaiGV/Rompecabezas.git
cd Rompecabezas
# Abre index.html en tu navegador o usa Live Server en VS Code
```

---

> Proyecto de práctica centrado en **manipulación del DOM**, **Drag & Drop API**, **eventos táctiles** y lógica de juego con JavaScript puro — sin librerías externas.
