import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

import { Adoption } from '../shared/adoption.model';
import { AdoptionService } from '../shared/adoption.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';

@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrls: ['./adoption-list.component.css']
})
export class AdoptionListComponent extends BaseResourceListComponent<Adoption> {

  localStorageUtils = new LocalStorageUtils();

  constructor(private adoptionService: AdoptionService, protected override injector: Injector, private router: Router) {
    super(adoptionService, injector);
    this.status.setValue('Solicitada');
  }

  alterStatus(id: string, status: string): void {
    const resource: Adoption = { status: status };
    Swal.fire({
      title: 'Deseja realmente realizar este ação?',
      text: "Lembre-se que não poderá reverter esta ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#44C5CD',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
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
    });
  }

  gerarPDF(adoption: Adoption): void {
    this.router.navigate(['/adocoes/certificado'],
      { queryParams: { adopter: adoption.adopter?.name!, animal: adoption.animal?.name!, data: adoption.updated_at!  } });
  }

}
