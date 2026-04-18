# 🦷 OdontoLink - Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

**OdontoLink** es el frontend de una plataforma web diseñada para conectar estudiantes de odontología con pacientes que necesitan atención, facilitando la gestión de prácticas clínicas en un entorno académico y profesional.

---

## 📖 Contexto Académico

Este proyecto es el resultado de la materia **Proyecto Final** de la carrera de Ingeniería en Sistemas de Información en la **Universidad Tecnológica Nacional (UTN - FRT)**. Fue desarrollado teniendo como cliente principal a la **Facultad de Odontología de la Universidad Nacional de Tucumán (UNT)**.

## ⚠️ Problemática

Actualmente, los estudiantes de odontología de 3° a 5° año deben cumplir con prácticas clínicas obligatorias en pacientes reales. Sin embargo:
- Existe una carencia sistemática de pacientes.
- No hay un sistema formal provisto por la institución para contactarlos.
- Los alumnos se ven obligados a usar redes sociales de forma insegura e informal, lo que resulta en la falta de trazabilidad, privacidad y profesionalismo.

## 💡 Solución Propuesta

**OdontoLink** es una plataforma web *responsive* diseñada para solucionar esta problemática, facilitando y formalizando el vínculo entre personas que necesitan atención odontológica y estudiantes en etapa de formación. 

El sistema centraliza:
- La búsqueda de pacientes.
- La gestión de turnos y agendas.
- El seguimiento de tratamientos.
- La comunicación, todo dentro de un entorno seguro y de carácter académico.

## 🚀 Estado del Proyecto (MVP)

El desarrollo actual ha alcanzado el **PMV (Producto Mínimo Viable)**. En esta etapa, el sistema ya cuenta con las funcionalidades críticas operativas, lo que permitió que el equipo de desarrollo alcanzara la condición de **"Regular"** en la materia, encontrándose listos para encarar el desarrollo de la entrega final. Este release representa la versión estable del MVP.

## ⭐ Características Principales del MVP (Funcionalidades)

A partir del análisis del desarrollo y las necesidades del sistema, se implementaron las siguientes características críticas:

- **Gestión de Usuarios y Perfiles:** Registro, autenticación y manejo de perfiles para cuatro roles diferenciados: *Pacientes*, *Practicantes* (estudiantes), *Docentes* (supervisores) y *Administradores*.
- **Catálogo de Tratamientos:** Los pacientes pueden visualizar, buscar y filtrar un catálogo de servicios odontológicos ofrecidos por los estudiantes.
- **Gestión de Turnos y Agendas:** Sistema integral para que los pacientes soliciten turnos y los practicantes gestionen su disponibilidad, confirmen reservas y organicen su agenda clínica.
- **Chat Interno Privado:** Un canal de comunicación directo y seguro entre paciente y practicante dentro de la plataforma para coordinar la atención, evitando el uso de redes sociales externas.
- **Sistema de Feedback y Calificaciones:** Encuestas privadas de satisfacción que permiten a los pacientes calificar la atención recibida y a los practicantes evaluar la puntualidad y colaboración del paciente (visible para el docente supervisor).
- **Seguimiento Clínico:** Registro de la evolución de los tratamientos odontológicos llevados a cabo por los practicantes y supervisados por los docentes.

## 🛠️ Tecnologías Utilizadas (Especificaciones Técnicas)

El proyecto fue construido bajo un stack moderno enfocado en la performance y la mantenibilidad:

- **Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (Build tool para un desarrollo rápido).
- **Enrutamiento:** [React Router DOM](https://reactrouter.com/) para la gestión de navegación y rutas protegidas (*Protected Routes*).
- **Gestión de Estado:** [Zustand](https://zustand-demo.pmnd.rs/) para un manejo de estado global ligero y directo.
- **Peticiones HTTP:** [Axios](https://axios-http.com/) para la integración y comunicación con la API del Backend.
- **Iconografía:** [React Icons](https://react-icons.github.io/react-icons/).
- **Diseño UI/UX:** *Responsive Web Design*, garantizando total compatibilidad en dispositivos móviles, tablets y computadoras de escritorio.
- **Compatibilidad:** Optimizado para funcionar de manera fluida en las últimas versiones de navegadores modernos (Chrome, Firefox, Edge).

## ⚙️ Instalación y Ejecución Local

Si deseas correr el proyecto en un entorno local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/micael305/odontolink-frontend.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno copiando el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---
*Desarrollado para la materia Proyecto Final, UTN - FRT.*
