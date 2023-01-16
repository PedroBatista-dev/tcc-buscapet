import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, OnInit, Injector, Inject, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { LocalStorageUtils } from '../../utils/localstorage';

import { ToastrService } from 'ngx-toastr';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction!: string;
  resourceForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessages!: string[];
  submittingForm: boolean = false;
  localStorage = new LocalStorageUtils();

  protected route!: ActivatedRoute;
  protected router!: Router;
  protected formBuilder!: FormBuilder;
  protected toastr!: ToastrService;

  constructor(
    protected injector: Injector,
    @Inject(Object) public resource: T,
    protected resourceService: BaseResourceService<T>,
    @Inject(Function) protected jsonDataToResourceFn: (jsonData: any) => T,
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
    this.toastr = this.injector.get(ToastrService);
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

    if (this.currentAction === 'novo' || this.currentAction === 'login')
      this.createResource();
    else
      this.updateResource();

  }

  protected setPageTitle(): void {
    if (this.currentAction === 'novo' || this.currentAction === 'login')
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
    else if (this.route.snapshot.url[0].path === "login")
      this.currentAction = 'login';
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

  protected createResource():void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(resource).subscribe({
      next: (resource) => this.actionsForSuccess(resource),
      error: (error) => this.actionsForError(error)
    });
  }

  protected updateResource():void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource).subscribe({
      next: (resource) => this.actionsForSuccess(resource),
      error: (error) => this.actionsForError(error)
    });
  }

  protected actionsForSuccess(resource: T): void {
    this.toastr.success("Solicitação processada com sucesso!");

    const baseComponentParent = this.route.snapshot.parent?.url[0]?.path;

    if(baseComponentParent) {
      this.router.navigateByUrl(baseComponentParent, { skipLocationChange: true }).then(
        () => this.router.navigate([baseComponentParent, resource.id, "editar"])
      );
    } else {
      this.localStorage.salvarDadosLocaisUsuario(resource);
      this.route.pathFromRoot[1].url.subscribe(caminho => this.router.navigate([caminho[0].path, this.currentAction]));
    }

  }

  protected actionsForError(error: HttpErrorResponse): void {
    this.toastr.error("Ocorreu um erro ao processar sua solicitação!");

    this.submittingForm = false;

    if(error.error.message === "Validation failed") {
      this.serverErrorMessages = [`Ocorreu um erro de validação no campo ${error.error.validation.body.keys[0]}`];
    } else if (error.error.message) {
      this.serverErrorMessages = [error.error.message];
    } else {
      this.serverErrorMessages = ['Ocorreu um erro desconhecido'];
    }
  }

}
