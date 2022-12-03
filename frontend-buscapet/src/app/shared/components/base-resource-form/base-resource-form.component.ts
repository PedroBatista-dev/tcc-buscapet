import { AfterContentChecked, OnInit, Injector, Inject, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import * as toastr from 'toastr';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction!: string;
  resourceForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessages!: string[];
  submittingForm: boolean = false;

  protected route!: ActivatedRoute;
  protected router!: Router;
  protected formBuilder!: FormBuilder;

  constructor(
    protected injector: Injector,
    @Inject(Object) public resource: T,
    protected resourceService: BaseResourceService<T>,
    @Inject(Function) protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
   }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm():void {
    this.submittingForm = true;

    if (this.currentAction === 'novo')
      this.createResource();
    else
      this.updateResource();

  }

  protected setPageTitle(): void {
    if (this.currentAction === 'novo')
      this.pageTitle = this.creationPageTitle();
    else
      this.pageTitle = this.editionPageTitle();
  }

  protected creationPageTitle(): string {
    return "Novo";
  }

  protected editionPageTitle(): string {
    return "Editação";
  }

  protected setCurrentAction():void {
    if (this.route.snapshot.url[0].path === "novo")
      this.currentAction = 'novo';
    else
      this.currentAction = 'editar';
  }

  protected abstract buildResourceForm(): void;

  protected loadResource(): void {
    if (this.currentAction === 'editar') {
      this.route.paramMap.pipe(
        switchMap(params =>
          this.resourceService.getById(Number(params.get("id")))
        )
      )
      .subscribe({
        next: (resource) => {
          this.resource = resource;
          this.resourceForm?.patchValue(resource);
        },
        error: () => alert('Ocorreu um erro no servidor, tente mais tarde!')
      })
    }
  }

  createResource():void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(resource).subscribe({
      next: (resource) => this.actionsForSuccess(resource),
      error: () => this.actionsForError()
    });
  }

  protected updateResource():void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource).subscribe({
      next: (resource) => this.actionsForSuccess(resource),
      error: () => this.actionsForError()
    });
  }

  protected actionsForSuccess(resource: T): void {
    toastr.success("Solicitação processada com sucesso!");

    const baseComponentParent: string = this.route.snapshot.parent!.url[0].path;

    this.router.navigateByUrl(baseComponentParent, { skipLocationChange: true }).then(
      () => this.router.navigate([baseComponentParent, resource.id, "editar"])
    );
  }

  protected actionsForError(): void {
    toastr.error("Ocorreu um erro ao processar sua solicitação!");

    this.submittingForm = false;

    this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."];
  }

}
