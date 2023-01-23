import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Adoption } from '../shared/adoption.model';
import { AdoptionService } from '../shared/adoption.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrls: ['./adoption-list.component.css']
})
export class AdoptionListComponent extends BaseResourceListComponent<Adoption> {

  constructor(private adoptionService: AdoptionService, protected override injector: Injector) {
    super(adoptionService, injector);
    this.status.setValue('Solicitada');
  }

  alterStatus(id: string, status: string): void {
    const resource: Adoption = { status};
    this.resourceService.update(resource, id)
    .subscribe({
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

  createPDF(adoption: Adoption): void {
    console.log(adoption);
  }

}
