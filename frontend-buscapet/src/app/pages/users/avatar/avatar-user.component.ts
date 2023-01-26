import { Component, Injector } from '@angular/core';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { SpecieService } from '../../species/shared/specie.service';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Dimensions } from 'ngx-image-cropper';
import { ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-avatar-user',
  templateUrl: './avatar-user.component.html',
  styleUrls: ['./avatar-user.component.css']
})
export class AvatarUserComponent extends BaseResourceFormComponent<User> {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imagemNome!: string;

  constructor(protected userService: UserService, protected override injector: Injector, public specieService: SpecieService) {
    super(injector, new User(), userService, User.fromJson);
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
    this.resourceService.update(this.resourceForm.value, 'avatar').subscribe({
      next: (resource) => {
        this.resource = resource;
        this.localStorage.salvarUrlAvatar(resource.avatar_url!);
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
