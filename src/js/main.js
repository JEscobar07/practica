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

    //crear tarea con clave texto y valor
    const tarea = {texto: textoTarea}
    pintarTareaDOM(tarea);

    inputTarea.value = "";

  }

  //pintar tarea
  function pintarTareaDOM(tarea) {
    const elementli = document.createElement("li");
    elementli.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    elementli.textContent = tarea.texto;

    //boton eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "❌";
    botonEliminar.classList.add("btn","btn-sm");
    botonEliminar.addEventListener("click",()=>{
      elementli.remove();
    });
    //añadimos el boton al elemento
    elementli.appendChild(botonEliminar);
    //pintamos en el ul el li
    listaTareas.appendChild(elementli);

  }

  //boton para agregar tareas
  botonAgregar.addEventListener("click",agregarTarea );


})