import { Directive, Injector, OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import { FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];
  filter = new FormControl('');
  page = 1;
	pageSize = new FormControl(5);
	collectionSize = this.resources.length;


  constructor(protected resourceService: BaseResourceService<T>, protected injector: Injector) {}

  ngOnInit(): void {
    this.resources = [];
    this.getAllResource();
  }

  deleteResource(resource: T) {
    Swal.fire({
      title: 'Deseja realmente excluir este item?',
      text: "Você não será capaz de reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#44C5CD',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resourceService.delete(resource.id!).subscribe({
          next: () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Deletado!',
              text: 'Seu arquivo foi deletado.',
              showConfirmButton: false,
              timer: 1500
            }
            )
            this.getAllResource();
          },
          error: () => Swal.fire({
              title: 'Erro!',
              text: 'Erro ao tentar excluir.',
              icon: 'error',
              confirmButtonColor: '#44C5CD',
        })
        });
      }
    })
  }

  getAllResource() {
    this.resourceService.getAll(this.filter.value).subscribe({
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
