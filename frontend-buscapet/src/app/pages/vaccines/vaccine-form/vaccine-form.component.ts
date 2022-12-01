import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { Vaccine } from '../shared/vaccine.model';
import { VaccineService } from '../shared/vaccine.service';

import * as toastr from 'toastr';

@Component({
  selector: 'app-vaccine-form',
  templateUrl: './vaccine-form.component.html',
  styleUrls: ['./vaccine-form.component.css']
})
export class VaccineFormComponent implements OnInit, AfterContentChecked {

  currentAction!: string;
  vaccineForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessages!: string[];
  submittingForm: boolean = false;
  vaccine: Vaccine = new Vaccine(0, '');

  constructor(
    private vaccineService: VaccineService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildVaccineForm();
    this.loadVaccine();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm():void {
    this.submittingForm = true;

    if (this.currentAction === 'novo')
      this.createVaccine();
    else
      this.updateVaccine();

  }

  private setPageTitle(): void {
    if (this.currentAction === 'novo')
      this.pageTitle = 'Cadastro de Nova Vacina';
    else {
      const vaccineName = this.vaccine.name || "";
      this.pageTitle = `Editando Vacina: ${vaccineName}`;
    }
  }

  private setCurrentAction():void {
    if (this.route.snapshot.url[0].path === "novo")
      this.currentAction = 'novo';
    else
      this.currentAction = 'editar';
  }

  private buildVaccineForm(): void {
    this.vaccineForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]]
    });
  }

  private loadVaccine(): void {
    if (this.currentAction === 'editar') {
      this.route.paramMap.pipe(
        switchMap(params =>
          this.vaccineService.getById(Number(params.get("id")))
        )
      )
      .subscribe({
        next: (vaccine) => {
          this.vaccine = vaccine;
          this.vaccineForm?.patchValue(vaccine);
        },
        error: () => alert('Ocorreu um erro no servidor, tente mais tarde!')
      })
    }
  }

  createVaccine():void {
    const vaccine: Vaccine = Object.assign(new Vaccine(0, ''), this.vaccineForm.value);
    this.vaccineService.create(vaccine).subscribe({
      next: (vaccine) => this.actionsForSuccess(vaccine),
      error: (error) => this.actionsForError()
    });
  }

  private updateVaccine():void {
    const vaccine: Vaccine = Object.assign(new Vaccine(0, ''), this.vaccineForm.value);
    this.vaccineService.update(vaccine).subscribe({
      next: (vaccine) => this.actionsForSuccess(vaccine),
      error: (error) => this.actionsForError()
    });
  }

  private actionsForSuccess(vaccine: Vaccine): void {
    toastr.success("Solicitação processada com sucesso!");

    this.router.navigateByUrl("vacinas", { skipLocationChange: true }).then(
      () => this.router.navigate(["vacinas", vaccine.id, "editar"])
    );
  }

  private actionsForError(): void {
    toastr.error("Ocorreu um erro ao processar sua solicitação!");

    this.submittingForm = false;

    this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."];
  }

}
