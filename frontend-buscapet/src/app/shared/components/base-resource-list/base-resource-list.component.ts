import { Directive, Injector, OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];
  filter = new FormControl('');
  page = 1;
	pageSize = new FormControl(4);;
	collectionSize = 0;

  protected toastr!: ToastrService;

  constructor(protected resourceService: BaseResourceService<T>, protected injector: Injector) {
    this.toastr = this.injector.get(ToastrService);
   }

  ngOnInit(): void {
    this.resources = [];
    this.getAllResource();
    this.collectionSize = this.resources.length;
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if(mustDelete) {
      this.resourceService.delete(resource.id!).subscribe({
        next: () => this.resources = this.resources.filter(element => element.id !== resource.id),
        error: () => this.toastr.error("Erro ao tentar excluir")
      })
    }
  }

  getAllResource() {
    console.log(this.pageSize.value)
    this.resourceService.getAll(this.filter.value).subscribe({
      next: (resources) => this.resources = resources,
      error: () => this.toastr.error('Erro ao carregar a lista')
    });
  }

}
