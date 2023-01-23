import { Component, ElementRef, Injector, ViewChildren } from '@angular/core';
import { FormControlName, Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Specie } from '../../species/shared/specie.model';
import { SpecieService } from '../../species/shared/specie.service';
import { Breed } from '../shared/breed.model';
import { BreedService } from '../shared/breed.service';

import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction } from 'rxjs';

@Component({
  selector: 'app-breed-form',
  templateUrl: './breed-form.component.html',
  styleUrls: ['./breed-form.component.css']
})
export class BreedFormComponent extends BaseResourceFormComponent<Breed> {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  breed: Breed = new Breed();
  species: Specie[] = [];

  constructor(protected breedService: BreedService, protected override injector: Injector, public specieService: SpecieService) {
    super(injector, new Breed(), breedService, Breed.fromJson);
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
    super.validarFormulario(this.formInputElements);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      specie: [null, [Validators.required]]
    });
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Raça";
  }

  protected override editionPageTitle(): string {
    const breedName = this.resource.name || "";
    return `Editando Raça: ${breedName}`;
  }

  search: OperatorFunction<string, Specie[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
			map((term) =>
				term === ''
					? []
					: this.species.filter((specie) => new RegExp(term, 'mi').test(specie.name!)).slice(0, 10)),
		);

  formatter = (specie: Specie) => specie.name!;

}
