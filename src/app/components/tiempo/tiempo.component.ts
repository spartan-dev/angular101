import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemperaturaService } from '../../services/temperatura.service';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.css'],
})
export class TiempoComponent implements OnInit {
  formulario!: FormGroup;
  tiempo: any;
  name: any;
  temperatura: any;
  humedad: any;
  latitud: any;
  longitud: any;
  descripcion: any;
  fecha = new Date();
  showError: boolean = false;
  mensajeError: string = '';
  constructor(private fb: FormBuilder, private _tiempo: TemperaturaService) {
    this.handleForm();
  }

  ngOnInit(): void {
    console.log(this.formulario);
  }
  /**Inicia formulario */
  handleForm() {
    this.formulario = this.fb.group({
      ciudad: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      codigo: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    });
  }
  handleSubmit() {
    this.showError = false;
    this._tiempo
      .getEstadoTiempo(
        this.formulario.get('ciudad')?.value,
        this.formulario.get('codigo')?.value
      )
      .subscribe(
        (respuesta) => {
          this.tiempo = respuesta;
          this.name = this.tiempo.name;
          this.temperatura = this.tiempo.main.temp;
          this.humedad = this.tiempo.main.humidity;
          this.latitud = this.tiempo.coord.lat;
          this.longitud = this.tiempo.coord.lon;
          this.descripcion = this.tiempo.weather[0].description;
        },
        (error) => {
          this.showError = true;
          this.mensajeError = `Error al consultar el tiempo ${error.error.cod} ${error.error.message}`;
        }
      );
  }

  get ciudad() {
    return this.formulario.get('ciudad');
  }
}
