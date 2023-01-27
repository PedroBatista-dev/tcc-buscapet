import { Component, Injector } from '@angular/core';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { SpecieService } from '../../species/shared/specie.service';
import { Animal } from '../shared/animal.model';
import { AnimalService } from '../shared/animal.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Dimensions } from 'ngx-image-cropper';
import { ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-avatar-animal',
  templateUrl: './avatar-animal.component.html',
  styleUrls: ['./avatar-animal.component.css']
})
export class AvatarAnimalComponent extends BaseResourceFormComponent<Animal> {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imagemNome!: string;

  constructor(protected animalService: AnimalService, protected override injector: Injector, public specieService: SpecieService) {
    super(injector, new Animal(), animalService, Animal.fromJson);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      imagem: [null],
      imagemUpload: [null],
    });
  }

  addAvatar() {
    this.resourceForm.get('imagem')?.setValue(this.imagemNome);
    this.resourceForm.get('imagemUpload')?.setValue(this.croppedImage);
    this.animalService.updateAvatar(this.resourceForm.value, this.resource.id!).subscribe({
      next: (resource) => {
        this.resource = resource;
        this.actionsForSuccess(resource);
      },
      error: (error) => this.actionsForError(error)
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0]?.name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    console.log('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
  }

}
