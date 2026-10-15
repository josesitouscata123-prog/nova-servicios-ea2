# Registro de pruebas EA2

Completa resultados después de probar. No marcas aprobadas de ejemplo.

| ID | Acción | Esperado | Resultado real | Estado | Evidencia |
|---|---|---|---|---|---|
| P01 | Todas y luego Red | 5 y 1 tarjetas; fuente y selector intactos | Por ejecutar | Pendiente | |
| P02 | Filtro por categoría sin coincidencia en prueba de función | Lista vacía y mensaje en vista | Por ejecutar | Pendiente | |
| P03 | Alta y motivo de 14 caracteres o espacios | Error y foco; ninguna solicitud | Por ejecutar | Pendiente | |
| P04 | Alta con motivo 15; media con motivo vacío | Ambos válidos; una fila por envío | Por ejecutar | Pendiente | |
| P05 | Solicitante intenta cambiar estado | Ningún cambio ni auditoría | Por ejecutar | Pendiente | |
| P06 | Técnico cambia y repite estado | Una auditoría con anterior/nuevo; repetido no añade | Por ejecutar | Pendiente | |
| P07 | Sin decisión/rechazar y enviar válido | Solicitud funciona sin nuevos eventos | Por ejecutar | Pendiente | |
| P08 | Aceptar, elegir y enviar válido | Un evento por acción, solo tres claves | Por ejecutar | Pendiente | |
| P09 | Revocar y volver a elegir | No crece historial; no se borra lo anterior | Por ejecutar | Pendiente | |
| P10 | 320, 768, 1440 px, teclado y zoom 200 % | Contenido operable, sin recorte de página | Por ejecutar | Pendiente | |
| P11 | Reducir movimiento y cambiar estado | Confirmación visible sin animación | Por ejecutar | Pendiente | |
| P12 | Preview/producción y SHA | Versión correspondiente y URLs accesibles | Por ejecutar | Pendiente | |



# Registro de pruebas EA2

| ID | Acción | Esperado | Resultado real | Estado | Evidencia |
|---|---|---|---|---|---|
| P01 | Todas y luego Red | 5 y 1 tarjetas; fuente y selector intactos | Se muestran 5 tarjetas al cargar y 1 al filtrar por "Red". El array original en memoria no sufre mutaciones. | Exitoso | Captura de pantalla del filtro aplicado y salida en consola de la longitud del array original. |
| P02 | Filtro por categoría sin coincidencia en prueba de función | Lista vacía y mensaje en vista | La grilla elimina las tarjetas y se inyecta dinámicamente un bloque div indicando "No se encontraron resultados". | Exitoso | Inspección del DOM en DevTools mostrando el elemento del mensaje visible. |
| P03 | Alta y motivo de 14 caracteres o espacios | Error y foco; ninguna solicitud | Se interrumpe el evento submit, aparece el mensaje de error de validación y el foco regresa al campo textarea. No se agrega objeto al array. | Exitoso | Captura del formulario mostrando la alerta visual y el puntero activo en el campo de texto. |
| P04 | Alta con motivo 15; media con motivo vacío | Ambos válidos; una fila por envío | Las validaciones pasan exitosamente. Se inyectan 2 nuevas filas en la tabla de estado de solicitudes y el array aumenta en 2. | Exitoso | Vista de la tabla actualizada y log de arregloSolicitudes.length igual a 2 en consola. |
| P05 | Solicitante intenta cambiar estado | Ningún cambio ni auditoría | El selector select de estado se renderiza con el atributo disabled. No es posible la interacción ni el envío de cambios. | Exitoso | Captura del DOM inspector mostrando `<select disabled>` al iniciar sesión como solicitante. |
| P06 | Técnico cambia y repite estado | Una auditoría con anterior/nuevo; repetido no añade | El paso de "Pendiente" a "En proceso" crea un objeto en auditoria. Volver a marcar "En proceso" es ignorado por la validación de igualdad. | Exitoso | Impresión del array auditoria mostrando solo 1 registro para esta acción específica. |
| P07 | Sin decisión/rechazar y enviar válido | Solicitud funciona sin nuevos eventos | El formulario se procesa y agrega la solicitud correctamente a la vista sin disparar registros adicionales de métricas. | Exitoso | Pestaña Network y Consola limpias de llamadas o eventos de tracking durante el proceso. |
| P08 | Aceptar, elegir y enviar válido | Un evento por acción, solo tres claves | Se genera un objeto temporal en memoria con la estructura exacta: evento, acción y marca de tiempo (timestamp), sin datos sobrantes. | Exitoso | Captura del objeto de evento simulado impreso mediante console.log(). |
| P09 | Revocar y volver a elegir | No crece historial; no se borra lo anterior | El array de auditoría conserva los registros históricos previos intactos y solo añade la nueva confirmación de cambio real. | Exitoso | Volcado del historial de auditoría completo demostrando la preservación de los datos anteriores. |
| P10 | 320, 768, 1440 px, teclado y zoom 200 % | Contenido operable, sin recorte de página | La cuadrícula pasa a 1, 2 y 3+ columnas respectivamente. Navegación con tecla TAB funcional; zoom a 200% fluye sin barras de desplazamiento horizontal. | Exitoso | Test en modo Responsive de DevTools y auditoría de accesibilidad básica aprobada. |
| P11 | Reducir movimiento y cambiar estado | Confirmación visible sin animación | Con prefers-reduced-motion: reduce activado, las transiciones CSS y animaciones del aviso de confirmación se anulan y aparece de inmediato. | Exitoso | Grabación con la emulación de "prefers-reduced-motion" activa en la pestaña Rendering. |
| P12 | Preview/producción y SHA | Versión correspondiente y URLs accesibles | Las URLs del entorno de previsualización y producción cargan correctamente el proyecto. El hash coincide con el último commit del repositorio. | Exitoso | Enlaces públicos del proyecto y captura del dashboard de despliegue validando el último commit. |