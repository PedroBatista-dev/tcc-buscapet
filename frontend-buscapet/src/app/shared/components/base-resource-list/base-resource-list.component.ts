import { Directive, OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(protected resourceService: BaseResourceService<T>) { }

  ngOnInit(): void {
    this.resources = [];
    // this.resourceService.getAll().subscribe({
    //   next: (resources) => this.resources = resources,
    //   error: () => alert('Erro ao carregar a lista')
    // });
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if(mustDelete) {
      this.resourceService.delete(resource.id!).subscribe({
        next: () => this.resources = this.resources.filter(element => element.id !== resource.id),
        error: () => alert("Erro ao tentar excluir")
      })
    }
  }

}
