import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Animal } from '../shared/animal.model';
import { AnimalService } from '../shared/animal.service';

import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction } from 'rxjs';
import { Breed } from '../../breeds/shared/breed.model';
import { Color } from '../../colors/shared/color.model';
import { ColorService } from '../../colors/shared/color.service';
import { AdoptionService } from '../../adoptions/shared/adoption.service';

@Component({
  selector: 'app-animal-filter',
  templateUrl: './animal-filter.component.html',
  styleUrls: ['./animal-filter.component.css']
})
export class AnimalFilterComponent extends BaseResourceListComponent<Animal> {

  animalForm = new FormGroup({
    status: new FormControl('Adocao'),
  });

  filterSex = new FormControl('');
  filterSize = new FormControl('');
  filterOther = new FormControl('');

  constructor(private animalService: AnimalService, protected colorService: ColorService, protected override injector: Injector, private adoptionService: AdoptionService) {
    super(animalService, injector);
  }

  solicitarAdocao(animal: Animal): void {
    Swal.fire({
      title: 'Deseja realmente solicitar este animal para adoção?',
      text: "Lmebre-se que é uma grande responsabilidade!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#44C5CD',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, solicitar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adoptionService.create({ animal_id: animal.id }).subscribe({
          next: () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Solicitado!',
              text: 'Seu pedido foi solicitado.',
              showConfirmButton: false,
              timer: 1500
            }
            )
            this.getAllResource();
          },
          error: () => Swal.fire({
              title: 'Erro!',
              text: 'Erro ao tentar solicitar adoção.',
              icon: 'error',
              confirmButtonColor: '#44C5CD',
        })
        });
      }
    });
  }

  override getAllResource() {
    this.animalService.getFilter(this.filter.value, this.filterSex.value,
      this.filterSize.value, this.filterOther.value).subscribe({
        next: (resources) => {
          this.resources = resources.slice((this.page - 1) * Number(this.pageSize.value),
            (this.page - 1) * Number(this.pageSize.value) + Number(this.pageSize.value));
          this.collectionSize = resources.length;
        },
        error: () => Swal.fire({
                title: 'Erro!',
                text: 'Erro ao tentar listar.',
                icon: 'error',
                confirmButtonColor: '#44C5CD',
        })
      });
  }
}
