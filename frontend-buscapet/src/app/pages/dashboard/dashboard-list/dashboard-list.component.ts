import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

import { DashboardService } from '../shared/dashboard.service';

import Swal from 'sweetalert2';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';
import { QuizService } from '../../quiz/shared/quiz.service';
import { Quiz } from '../../quiz/shared/quiz.model';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent implements OnInit {

  localStorageUtils = new LocalStorageUtils();
  quiz = new Quiz();

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabelsSpecies = [];
  public pieChartDatasetsSpecies = [ {
    data: [],
  } ];
  public pieChartLabelsBreeds = [];
  public pieChartDatasetsBreeds = [ {
    data: [],
  } ];
  public pieChartLabelsColors = [];
  public pieChartDatasetsColors = [ {
    data: [],
  } ];
  public pieChartLabelsAdoptions = [];
  public pieChartDatasetsAdoptions = [ {
    data: [],
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor(private dashboardService: DashboardService, private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.dashboardService.getDashboard('dashboard/adoptions').subscribe({
      next: (resources) => {
        this.pieChartLabelsAdoptions = resources.map(r => r.status!);
        const data = resources.map(r => r.count!);
        this.pieChartDatasetsAdoptions = [ { data } ];
      },
      error: () => Swal.fire({
            title: 'Erro!',
            text: 'Erro ao tentar listar.',
            icon: 'error',
            confirmButtonColor: '#44C5CD',
      })
    });

    if (this.localStorageUtils.obterIsOng() === 'true') {
      this.dashboardService.getDashboard('dashboard/species').subscribe({
        next: (resources) => {
          this.pieChartLabelsSpecies = resources.map(r => r.name!);
          const data = resources.map(r => r.count!);
          this.pieChartDatasetsSpecies = [ { data } ];
        },
        error: () => Swal.fire({
                title: 'Erro!',
                text: 'Erro ao tentar listar.',
                icon: 'error',
                confirmButtonColor: '#44C5CD',
          })
      });
      this.dashboardService.getDashboard('dashboard/breeds').subscribe({
        next: (resources) => {
          this.pieChartLabelsBreeds = resources.map(r => r.name!);
          const data = resources.map(r => r.count!);
          this.pieChartDatasetsBreeds = [ { data } ];
        },
        error: () => Swal.fire({
                title: 'Erro!',
                text: 'Erro ao tentar listar.',
                icon: 'error',
                confirmButtonColor: '#44C5CD',
          })
      });
      this.dashboardService.getDashboard('dashboard/colors').subscribe({
        next: (resources) => {
          this.pieChartLabelsColors = resources.map(r => r.name!);
          const data = resources.map(r => r.count!);
          this.pieChartDatasetsColors = [ { data } ];
        },
        error: () => Swal.fire({
                title: 'Erro!',
                text: 'Erro ao tentar listar.',
                icon: 'error',
                confirmButtonColor: '#44C5CD',
          })
      });
    } else {
      this.quizService.getById(this.localStorageUtils.obterIdUsuario()!).subscribe({
        next: (resource) => {
          this.quiz = resource;
        },
        error: () => Swal.fire({
              title: 'Atenção!',
              text: 'Preencha o questionário de adoção para realizar adoções.',
              icon: 'warning',
              confirmButtonColor: '#44C5CD',
        })
      });
    }

  }

}
