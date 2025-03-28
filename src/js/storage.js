export class TareasStorage {
    constructor() {
      this.key = 'tareas';
    }
  
    // Obtener todas las tareas
    obtenerTareas() {
      const tareas = localStorage.getItem(this.key);
      return tareas ? JSON.parse(tareas) : [];
    }
  
    // Guardar todas las tareas
    guardarTareas(tareas) {
      localStorage.setItem(this.key, JSON.stringify(tareas));
    }
  
    // Agregar una nueva tarea
    agregarTarea(textoTarea) {
      const tareas = this.obtenerTareas();
      const nuevaTarea = {
        id: Date.now(),
        texto: textoTarea,
        completada: false
      };
      tareas.push(nuevaTarea);
      this.guardarTareas(tareas);
      return nuevaTarea;
    }
  
    // Eliminar una tarea
    eliminarTarea(id) {
      let tareas = this.obtenerTareas();
      tareas = tareas.filter(tarea => tarea.id !== id);
      this.guardarTareas(tareas);
    }
  
    // Marcar/desmarcar tarea como completada
    toggleCompletada(id) {
      const tareas = this.obtenerTareas();
      const tarea = tareas.find(t => t.id === id);
      if (tarea) {
        tarea.completada = !tarea.completada;
        this.guardarTareas(tareas);
      }
    }
  }