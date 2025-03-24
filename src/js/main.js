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

    inputTarea.value = "";

  }

  //pintar tarea
  function pintarTareaDOM(tarea) {
    const elementli = document.createElement("li");
    elementli.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    const spanTexto = document.createElement("span");
    spanTexto.textContent = tarea.texto.charAt(0).toUpperCase() + tarea.texto.slice(1).toLowerCase();
    const divBotones = document.createElement("div");
    divBotones.classList.add("d-flex", "gap-2","align-items-center"); 

    // Botón eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "❌";
    botonEliminar.classList.add("btn", "btn-sm");
    botonEliminar.addEventListener("click", () => {
      elementli.remove();
    });

    // Para la tarea completada
    const botonMarcar = document.createElement("input");
    botonMarcar.type = "radio";
    botonMarcar.classList.add("form-check-input");
    botonMarcar.addEventListener("change", () => {
      spanTexto.classList.toggle("text-decoration-line-through");//tacha el texto
    });

    divBotones.appendChild(botonMarcar);
    divBotones.appendChild(botonEliminar);
    elementli.appendChild(spanTexto); 
    elementli.appendChild(divBotones);
    //pintamos en el ul el li
    listaTareas.appendChild(elementli);
  }

  //boton para agregar tareas
  botonAgregar.addEventListener("click",agregarTarea );

})