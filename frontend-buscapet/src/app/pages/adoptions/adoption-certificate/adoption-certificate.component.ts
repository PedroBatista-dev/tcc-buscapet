import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Adoption } from '../shared/adoption.model';
import { jsPDF } from "jspdf";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adoption-certificate',
  templateUrl: './adoption-certificate.component.html',
  styleUrls: ['./adoption-certificate.component.css']
})
export class AdoptionCertificateComponent implements OnInit {

  @ViewChild('content', { static: false }) el!: ElementRef;
  adopter = '';
  animal = '';
  data = new Date();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.adopter = params['adopter'];
        this.animal = params['animal'];
        this.data = params['data'];
      }
    );
  }

  createPDF(): void {
    const doc = new jsPDF('l', 'pt', 'a4');
    doc.html(this.el.nativeElement, {
      callback: (pdf) => {

        pdf.save("certificado.pdf")
      }
    });
  }

}
