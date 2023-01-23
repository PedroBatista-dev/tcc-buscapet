import { Component, ElementRef, Injector, ViewChildren } from '@angular/core';
import { FormArray, FormControlName, FormGroup, Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Specie } from '../../species/shared/specie.model';
import { SpecieService } from '../../species/shared/specie.service';
import { Animal } from '../shared/animal.model';
import { AnimalService } from '../shared/animal.service';

import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction } from 'rxjs';
import { Color } from '../../colors/shared/color.model';
import { BreedService } from '../../breeds/shared/breed.service';
import { ColorService } from '../../colors/shared/color.service';
import { Breed } from '../../breeds/shared/breed.model';
import { Vaccine } from '../../vaccines/shared/vaccine.model';
import { VaccineService } from '../../vaccines/shared/vaccine.service';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent extends BaseResourceFormComponent<Animal> {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  animal: Animal = new Animal();
  species: Specie[] = [];
  colors: Color[] = [];
  vaccines: Vaccine[] = [];
  vaccineForm!: FormGroup;


  constructor(protected animalService: AnimalService, protected override injector: Injector,
    protected specieService: SpecieService, protected breedService: BreedService, protected colorService: ColorService,
      protected vaccineService: VaccineService, private modalService: NgbModal) {
    super(injector, new Animal(), animalService, Animal.fromJson);
  }

  ngAfterViewInit(): void {
    this.specieService.getAll('', '').subscribe({
      next: (resources) => this.species = resources,
      error: () => Swal.fire({
              title: 'Erro!',
              text: 'Erro ao buscar as espécies.',
              icon: 'error',
              confirmButtonColor: '#44C5CD',
        })
    });
    this.colorService.getAll('', '').subscribe({
      next: (resources) => this.colors = resources,
      error: () => Swal.fire({
              title: 'Erro!',
              text: 'Erro ao buscar as cores.',
              icon: 'error',
              confirmButtonColor: '#44C5CD',
        })
    });
    this.getAllVaccines();
    super.validarFormulario(this.formInputElements);
  }

  override ngAfterContentChecked(): void {
    super.ngAfterContentChecked()
    this.disableControl()
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      age: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      size: [null, [Validators.required]],
      other_animals: [null, [Validators.required]],
      color: [null, [Validators.required]],
      breed: [{ value: null, disabled: this.currentAction === 'editar' ? false : true }, [Validators.required]],
      specie: [null, [Validators.required]],
      animals_vaccine: this.formBuilder.array([]),
    });

    this.vaccineForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]]
    });

    if (this.currentAction == "editar") {
      const vaccinesForm = this.resourceForm.get("animals_vaccine") as FormArray;
      const control = this.formBuilder.group({
        vaccine_id: [null],
      });
      vaccinesForm.push(control);
    }
  }

  vaccineChecked(vaccine: Vaccine): boolean {
    const vaccinesForm = this.resourceForm.get("animals_vaccine") as FormArray;
    return vaccinesForm.value.filter((v: any) => v.vaccine_id === vaccine.id).length;
  }

  addVaccine(event: any, vaccine: Vaccine): void {
    const vaccinesForm = this.resourceForm.get("animals_vaccine") as FormArray;

    if (event.target.checked) {
      const control = this.formBuilder.group({
        vaccine_id: [vaccine.id]
      });
      vaccinesForm.push(control);
    } else {
      vaccinesForm.removeAt(vaccinesForm.value.map((v: any) => v.vaccine_id).indexOf(vaccine.id));
    }
  }

  disableControl(): void {
    if (this.resourceForm.controls['specie'].valid) {
      this.resourceForm.controls['breed'].enable();
    } else {
      this.resourceForm.controls['breed'].disable();
      this.resourceForm.get('breed')?.setValue(null);
    }

  }

  getAllVaccines(): void {
    this.vaccineService.getAll('', '').subscribe({
      next: (resources) => this.vaccines = resources,
      error: () => Swal.fire({
              title: 'Erro!',
              text: 'Erro ao buscar as vacinas.',
              icon: 'error',
              confirmButtonColor: '#44C5CD',
        })
    });
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Animal";
  }

  protected override editionPageTitle(): string {
    const animalName = this.resource.name || "";
    return `Editando Animal: ${animalName}`;
  }

  open(content: any): void {
    const ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      centered: true,
      backdropClass: '.app-session-modal-backdrop',
    };
		this.modalService.open(content, ngbModalOptions).result.then(
			() => {
        const resource: Vaccine = this.jsonDataToResourceFn(this.vaccineForm.value);
				this.vaccineService.create(resource).subscribe({
          next: () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Solicitação processada com sucesso!',
              showConfirmButton: false,
              timer: 1500
            });
            this.getAllVaccines();
          },
          error: (error) => this.actionsForError(error)
        });
			},
			() => {},
		);
    this.vaccineForm.get('name')?.setValue(null);
	}

  searchS: OperatorFunction<string, Specie[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
			map((term) =>
				term === ''
					? []
					: this.species.filter((specie) => new RegExp(term, 'mi').test(specie.name!)).slice(0, 10)),
		);

  formatterS = (specie: Specie) => specie.name!;

  searchC: OperatorFunction<string, Color[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
			map((term) =>
				term === ''
					? []
					: this.colors.filter((color) => new RegExp(term, 'mi').test(color.name!)).slice(0, 10)),
		);

  formatterC = (color: Color) => color.name!;

  searchB: OperatorFunction<string, Breed[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
			map((term) =>
				term === ''
					? []
					: this.resourceForm.get('specie')?.value?.breeds.filter((breed: Breed) => new RegExp(term, 'mi').test(breed.name!)).slice(0, 10)),
		);

  formatterB = (breed: Breed) => breed.name!;

}
