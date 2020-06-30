// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
'use strict';

const batteryLevel = require('battery-level');
const percentage = require("percentage");
const moment = require('moment');
 
window.addEventListener('DOMContentLoaded', () => {
  let nivel;
  let nivelRango;
  let nivelFrecuency;

  let boton = document.getElementById("btn_battery");
  boton.addEventListener("click", doNotify);

  const form = document.querySelector('form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    nivelRango = document.querySelector('#vol').value;
    nivelFrecuency = document.querySelector('#frec').value;
    setInterval(function(){ 
      let range = nivelRango / 100
      if(nivel < range){
        doNotify();
        console.log(`verifica si el nivel ${nivel} es menor que el rango ${range}`);
      }
      const humanReadable = moment().format('hh:mm:ss');
      console.log(humanReadable);
    }, nivelFrecuency * 60000);

  });

  document.querySelector('#vol').addEventListener('input', function(e){
    document.querySelector('#valorRango').textContent = e.target.value + ' %';
  });
  document.querySelector('#frec').addEventListener('input', function(e){
    document.querySelector('#valorFrec').textContent = e.target.value + ' min';
  }); 

  /*setInterval(function(){ 
    //let inicio = moment('2020-05-14T06:15').toNow();// devolvia: in 4 hours siendo la hora actual las 10:38 14 mayo
    let inicio = moment(new Date()).toNow();
    console.log("Duracion Bateria desde inicio aplicacion: " + inicio);
  }, 1000);*/
  
  function doNotify(){
      console.log("dentro de la funcion doNotify()"); 
        Notification.requestPermission().then(function (result){
          var myNotification = new Notification('Battery Notification', {
              'body': `${percentage(nivel)} battery remaining`
          });
        });
        console.log(`nivel de bateria ->> ${percentage(nivel)} y ${nivel}`);
  }

  batteryLevel().then(battery => {
    nivel = battery;
  })
  .catch(err => console.error(err));

})

  


