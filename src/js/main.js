import '../scss/style.scss'
import javascriptLogo from '../javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

document.addEventListener("DOMContentLoaded",()=>{
  const inputTarea = document.getElementById("nueva-tarea");
  const botonAgregar = document.getElementById("agregar-tarea");
  const listaTareas = document.getElementById("lista-tareas");

  // 1. Cargar tareas guardadas al iniciar
  const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareasGuardadas.forEach(tarea => pintarTareaDOM(tarea));

  // 2. Función para guardar todas las tareas actuales
  function guardarTareasActuales() {
    const tareasElements = listaTareas.querySelectorAll('li');
    const tareas = [];
    
    tareasElements.forEach(element => {
      tareas.push({
        texto: element.querySelector('span').textContent,
        completada: element.classList.contains('bg-success')
      });
    });
    
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }

  //agregar tarea 
  function agregarTarea() {
    const textoTarea = inputTarea.value.trim()
    if (textoTarea === "") {
      alert("Escriba una tarea,ehh cansonaa.");
      return;
    }

    //se crea el objeto tarea
    const tarea = {texto: textoTarea}
    pintarTareaDOM(tarea);
    guardarTareasActuales(); 

    inputTarea.value = "";
  }

  //pintar tarea 
  function pintarTareaDOM(tarea) {
    const elementli = document.createElement("li");
    elementli.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    // Restaurar estado si es una tarea guardada
    if (tarea.completada) {
      elementli.classList.add("bg-success", "text-white");
    }

    const spanTexto = document.createElement("span");
    spanTexto.textContent = tarea.texto.charAt(0).toUpperCase() + tarea.texto.slice(1).toLowerCase();
    
    // Restaurar estado del texto si es tarea guardada
    if (tarea.completada) {
      spanTexto.classList.add("text-decoration-line-through");
    }

    const divBotones = document.createElement("div");
    divBotones.classList.add("d-flex", "gap-2","align-items-center"); 

    // Botón eliminar (solo agregamos guardado al eliminar)
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "❌";
    botonEliminar.classList.add("btn", "btn-sm");
    botonEliminar.addEventListener("click", () => {
      elementli.remove();
      guardarTareasActuales(); 
    });

    // Para la tarea completada
    const botonMarcar = document.createElement("input");
    botonMarcar.type = "radio";
    botonMarcar.classList.add("form-check-input");
    botonMarcar.checked = tarea.completada || false;
    botonMarcar.addEventListener("change", () => {
      spanTexto.classList.toggle("text-decoration-line-through");
      elementli.classList.toggle("bg-success");
      elementli.classList.toggle("text-white");
      guardarTareasActuales(); 
    });

    divBotones.appendChild(botonMarcar);
    divBotones.appendChild(botonEliminar);
    elementli.appendChild(spanTexto); 
    elementli.appendChild(divBotones);
    listaTareas.appendChild(elementli);
  }

  //boton para agregar tareas 
  botonAgregar.addEventListener("click",agregarTarea);
})