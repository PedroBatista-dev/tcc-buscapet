import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';

import { Vaccine } from '../shared/vaccine.model';
import { VaccineService } from '../shared/vaccine.service';

@Component({
  selector: 'app-vaccine-list',
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.css']
})
export class VaccineListComponent implements OnInit {

  vaccines: Vaccine[] = [];

  constructor(private vaccineService: VaccineService) { }

  ngOnInit(): void {
    this.vaccineService.getAll().subscribe({
      next: (vaccines) => this.vaccines = vaccines,
      error: () => alert('Erro ao carregar a lista')
    })
  }

  deleteVaccine(vaccine: Vaccine) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if(mustDelete) {
      this.vaccineService.delete(vaccine.id).subscribe({
        next: () => this.vaccines = this.vaccines.filter(element => element.id !== vaccine.id),
        error: () => alert("Erro ao tentar excluir")
      })
    }
  }

}
