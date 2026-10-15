/**
 * R1: Filtra la lista de servicios por categoría sin mutar el array original.
 */
export function filtrarServicios(lista, categoria) {
    if (!Array.isArray(lista)) return [];
    if (categoria === "Todas" || !categoria) {
        return [...lista];
    }
    return lista.filter(servicio => servicio.categoria === categoria);
}

/**
 * R2: Valida la urgencia de la solicitud considerando la prioridad y la longitud del motivo útil.
 */
export function validarUrgencia(prioridad, motivo) {
    const p = (prioridad || "").toLowerCase();
    const m = (motivo || "").trim();

    if (p === "alta" && m.length < 15) {
        return "El motivo debe tener al menos 15 caracteres cuando la prioridad es Alta.";
    }
    return "";
}

/**
 * R3: Cambia el estado de una solicitud y registra la auditoría si el rol es técnico.
 */
export function cambiarEstado(solicitudes, id, nuevoEstado, actor, auditoria) {
    // Validar rol del actor
    if (!actor || actor.rol !== "tecnico") {
        return false;
    }

    // Validar estados permitidos
    const estadosValidos = ["Pendiente", "En proceso", "Resuelto", "Cerrado/Cancelado"];
    if (!estadosValidos.includes(nuevoEstado)) {
        return false;
    }

    // Buscar la solicitud por id o solicitud_id
    if (!Array.isArray(solicitudes)) return false;
    const solicitud = solicitudes.find(s => s.id === id || s.solicitud_id === id);
    if (!solicitud) {
        return false;
    }

    // Rechazar si el estado es idéntico al actual
    const anterior = solicitud.estado;
    if (anterior === nuevoEstado) {
        return false;
    }

    // Actualizar estado en la solicitud
    solicitud.estado = nuevoEstado;

    // Registrar en auditoría
    if (Array.isArray(auditoria)) {
        auditoria.push({
            id: auditoria.length + 1,
            actor_id: actor.id || actor.usuario_id || 1,
            solicitud_id: id,
            accion: "CAMBIO_ESTADO",
            anterior: anterior,
            nuevo: nuevoEstado,
            fecha: new Date().toISOString()
        });
    }

    return true;
}

/**
 * R4: Registra un evento de analítica solo con consentimiento explícito y datos válidos.
 */
export function registrarEvento(consentimiento, nombre, servicio, eventos) {
    // Validar consentimiento
    if (consentimiento !== "aceptado") {
        return false;
    }

    // Validar nombre del evento
    const nombresValidos = ["select_service", "submit_request"];
    if (!nombresValidos.includes(nombre)) {
        return false;
    }

    // Validar servicio
    if (!servicio || servicio.id === undefined || servicio.id === null) {
        return false;
    }

    const idNum = Number(servicio.id);
    if (!Number.isSafeInteger(idNum) || idNum <= 0) {
        return false;
    }

    const categoriasValidas = ["Accesos", "Hardware", "Red", "Software"];
    if (!categoriasValidas.includes(servicio.categoria)) {
        return false;
    }

    // Agregar objeto con solo las 3 claves requeridas
    if (Array.isArray(eventos)) {
        eventos.push({
            event: nombre,
            service_id: String(servicio.id),
            categoria: servicio.categoria
        });
    }

    return true;
}
