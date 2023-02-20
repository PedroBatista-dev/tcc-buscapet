import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Animal } from '../shared/animal.model';
import { AnimalService } from '../shared/animal.service';

import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { AdoptionService } from '../../adoptions/shared/adoption.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent extends BaseResourceListComponent<Animal> {

  animalForm = new FormGroup({
    status: new FormControl(),
  });

  constructor(private animalService: AnimalService, protected override injector: Injector) {
    super(animalService, injector);
  }

  disponibilizarAdocao(animal: Animal): void {
    Swal.fire({
      title: 'Deseja realmente disponibilizar este animal para adoção?',
      text: "Lembre-se que o animal estará disponível para outros usuários adotarem!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#44C5CD',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, disponibilizar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalForm.get('status')?.setValue('Disponivel');
        this.resourceService.update(this.animalForm.value, `${animal.id}/status`).subscribe({
          next: (resource) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Solicitação processada com sucesso!',
              showConfirmButton: false,
              timer: 1500
            });
            this.getAllResource();
          },
          error: (error) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ocorreu um erro ao processar sua solicitação!',
              showConfirmButton: false,
              timer: 1500
            });
            console.log(error)
          }
        });
      }
    });
  }

  indisponibilizarAdocao(animal: Animal): void {
    Swal.fire({
      title: 'Deseja realmente indisponibilizar este animal para adoção?',
      text: "Lembre-se que o animal não estará disponível para outros usuários adotarem!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#44C5CD',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, indisponibilizar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalForm.get('status')?.setValue('Criado');
        this.resourceService.update(this.animalForm.value, `${animal.id}/status`).subscribe({
          next: (resource) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Solicitação processada com sucesso!',
              showConfirmButton: false,
              timer: 1500
            });
            this.getAllResource();
          },
          error: (error) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ocorreu um erro ao processar sua solicitação!',
              showConfirmButton: false,
              timer: 1500
            });
            console.log(error)
          }
        });
      }
    });
  }
}
