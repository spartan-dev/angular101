import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.css'],
})
export class TiempoComponent implements OnInit {
  formulario!: FormGroup;
  constructor(private fb: FormBuilder) {
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
    console.log('holis', this.formulario);
  }

  get ciudad() {
    return this.formulario.get('ciudad');
  }
}
