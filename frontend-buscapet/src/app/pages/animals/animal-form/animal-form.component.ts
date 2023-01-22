import { Component, ElementRef, Injector, ViewChildren } from '@angular/core';
import { FormControlName, Validators } from '@angular/forms';

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

  constructor(protected animalService: AnimalService, protected override injector: Injector,
    protected specieService: SpecieService, protected breedService: BreedService, protected colorService: ColorService) {
    super(injector, new Animal(), animalService, Animal.fromJson);
  }

  ngAfterViewInit(): void {
    this.specieService.getAll('').subscribe({
      next: (resources) => this.species = resources,
      error: () => Swal.fire({
              title: 'Erro!',
              text: 'Erro ao buscar as espécies.',
              icon: 'error',
              confirmButtonColor: '#44C5CD',
        })
    });
    this.colorService.getAll('').subscribe({
      next: (resources) => this.colors = resources,
      error: () => Swal.fire({
              title: 'Erro!',
              text: 'Erro ao buscar as espécies.',
              icon: 'error',
              confirmButtonColor: '#44C5CD',
        })
    });
    super.validarFormulario(this.formInputElements);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      age: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      size: [null, [Validators.required]],
      other_animals: [null, [Validators.required]],
      color: [null, [Validators.required]],
      breed: [{ value: null, disabled: true }, [Validators.required]],
      specie: [null, [Validators.required]],
      vaccines: this.formBuilder.array([]),
    });
  }

  printForm() {
    console.log(this.resourceForm.value)
  }

  disableControl(): void {
    if (this.resourceForm.controls['specie'].valid) {
      this.resourceForm.controls['breed'].enable();
    } else {
      this.resourceForm.controls['breed'].disable();
      this.resourceForm.get('breed')?.setValue(null);
    }
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Raça";
  }

  protected override editionPageTitle(): string {
    const breedName = this.resource.name || "";
    return `Editando Raça: ${breedName}`;
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
