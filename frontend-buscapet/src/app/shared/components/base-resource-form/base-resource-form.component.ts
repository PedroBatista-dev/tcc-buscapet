import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, OnInit, Injector, Inject, Directive, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { fromEvent, merge, Observable, switchMap } from 'rxjs';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { LocalStorageUtils } from '../../utils/localstorage';

import Swal from 'sweetalert2';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction!: string;
  resourceForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessages!: string[];
  submittingForm: boolean = false;
  mudancasNaoSalvas!: boolean;
  localStorage = new LocalStorageUtils();

  protected route!: ActivatedRoute;
  protected router!: Router;
  protected formBuilder!: FormBuilder;

  constructor(
    protected injector: Injector,
    @Inject(Object) public resource: T,
    protected resourceService: BaseResourceService<T>,
    @Inject(Function) protected jsonDataToResourceFn: (jsonData: any) => T,
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
      this.route.params.pipe(
        switchMap(params =>
          this.resourceService.getById(params['id'])
        )
      )
      .subscribe({
        next: (resource) => {
          this.resource = resource;
          this.resourceForm?.patchValue(resource);
        },
        error: () => Swal.fire({
              title: 'Erro!',
              text: 'Ocorreu um erro no servidor, tente mais tarde.',
              icon: 'error',
              confirmButtonColor: '#44C5CD',
        })
      })
    }
  }

  protected createResource():void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(resource).subscribe({
      next: (resource) => this.actionsForSuccess(resource),
      error: (error) => this.actionsForError(error)
    });
    this.mudancasNaoSalvas = false;
  }

  protected updateResource():void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.route.params.pipe(
      switchMap(params =>
        this.resourceService.update(resource, params['id'])
      )
    ).subscribe({
      next: (resource) => this.actionsForSuccess(resource),
      error: (error) => this.actionsForError(error)
    });

    this.mudancasNaoSalvas = false;
  }

  protected actionsForSuccess(resource: T): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Solicitação processada com sucesso!',
      showConfirmButton: false,
      timer: 1500
    });

    const baseComponentParent = this.route.snapshot.parent?.url[0]?.path;

    if(baseComponentParent) {
      if (this.currentAction === "novo") {
        this.router.navigateByUrl(baseComponentParent, { skipLocationChange: true }).then(
          () => this.router.navigate([baseComponentParent, resource.id, "editar"])
        );
      } else {
        this.router.navigate([baseComponentParent]);
      }
    } else {
      if (this.currentAction === "login") {
        const remember = this.resourceForm.get('remember')!.value ? 'sim' : 'nao';
        this.localStorage.salvarDadosLocaisUsuario(resource, remember);
        this.router.navigate(['vacinas']);
      } else {
        this.route.pathFromRoot[1].url.subscribe(caminho => this.router.navigate([caminho[0].path, 'login']));
      }
    }

  }

  protected actionsForError(error: HttpErrorResponse): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro ao processar sua solicitação!',
      showConfirmButton: false,
      timer: 1500
    });

    this.submittingForm = false;

    if(error.error.message === "Validation failed") {
      this.serverErrorMessages = [`Ocorreu um erro de validação no campo ${error.error.validation.body.keys[0]}`];
    } else if (error.error.message) {
      this.serverErrorMessages = [error.error.message];
    } else {
      this.serverErrorMessages = ['Ocorreu um erro desconhecido'];
    }
  }

  protected validarFormulario(
    formInputElements: ElementRef[]) {

    let controlBlurs: Observable<any>[] = formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.mudancasNaoSalvas = true;
    });
  }

}
