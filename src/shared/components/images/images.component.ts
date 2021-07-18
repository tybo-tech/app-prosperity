import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/services/upload.service';
import { Images } from 'src/models/images.model';
import { User } from 'src/models';
import { IMAGE_CROP_SIZE } from 'src/shared/constants';
import { AccountService } from 'src/services';
import { ImagesService } from 'src/services/images.service';
import { UxService } from 'src/services/ux.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, AfterViewInit {
  @Input() images: Images[];
  @Input() otherId: string;
  @Input() optionId: any;
  @Input() user: User;
  @Input() studentMode: boolean;
  // tslint:disable-next-line: no-output-on-prefix
  // @Output() showImageEvent: EventEmitter<Images> = new EventEmitter();
  @Output() onUploadFinished: EventEmitter<Images[]> = new EventEmitter();
  @Output() deleteImageEvent: EventEmitter<Images> = new EventEmitter();
  @Output() setMianImageEvent: EventEmitter<Images> = new EventEmitter();
  viewImage;
  progress: number;
  message: string;
  uplaodedImages: any[] = [];
  selectImage: Images;
  imageIndex: any;
  productImages: Images[] = [];
  uploadIndex: number = 0;
  imagesToUplaod: any;
  laoding: boolean;

  @ViewChild("file") fileElementRef: ElementRef;

  constructor(
    private uploadService: UploadService,
    private imagesService: ImagesService,
    private uxService: UxService,
  ) { }
  ngAfterViewInit(): void {
    // this.fileElementRef.nativeElement.focus();
    if (!this.images || !this.images.length) {
      this.fileElementRef && this.fileElementRef.nativeElement.click();

    }
  }

  ngOnInit() {
    // this.laoding = true;
    this.progress = 0;
    if (this.images && this.images.length) {
      if (this.images.find(x => x.IsMain === 1)) {
        this.images.find(x => x.IsMain === 1).Class = ['active'];
        this.selectImage = this.images.find(x => x.IsMain === 1);
      } else {
        this.images[0].Class = ['active'];
        this.selectImage = this.images[0];
      }
      this.images.sort(function (a, b) {
        var textA = a.IsMain.toString();
        var textB = b.IsMain.toString();;
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      });
    }
  }

  ngA
  showImage(image, index: number) {
    if (image) {
      image.Index = index;
      this.imageIndex = index;
      this.images.map(x => x.Class = [])
      // this.showImageEvent.emit(image);
      image.Class = ['active'];
      this.selectImage = image;
      this.viewImage = true;
    }
  }



  onSelectFiles(e) {
    this.productImages = [];


    if (e && e.target && e.target.files) {
      Array.from(e.target.files).forEach(file => {
        const fileReader = new FileReader();
        const theFile: any = file;
        fileReader.readAsDataURL(theFile);
        fileReader.onload = (event: any) => {
          // debugger
          const url = event.target.result;
          const image = new Image();
          image.src = url;
          image.onload = (imgE) => {

            const canvas = document.createElement('canvas');
            const maxSize = IMAGE_CROP_SIZE;
            // debugger
            let width = image.width;
            let height = image.height;
            if (width > height) {
              if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            this.productImages.push(
              {
                ImageId: '',
                OtherId: this.otherId,
                OptionId: this.optionId,
                Url: dataUrl,
                IsMain: 0,
                CreateUserId: this.user.UserId,
                ModifyUserId: this.user.UserId,
                StatusId: 1
              }
            );



            if (this.productImages.length === Array.from(e.target.files).length) {
              this.laoding = true;
              this.progress = 5;
              this.uplaodThen();

            }
          }

        }
      });


    }


  }


  uplaodThen() {
    if (this.uploadIndex === 0) {
      this.imagesToUplaod = [];
    }
    if (this.productImages && this.productImages.length && this.productImages[this.uploadIndex]) {
      const resizedImage = this.dataURLToBlob(this.productImages[this.uploadIndex]?.Url);
      this.uplaodFile(resizedImage, this.productImages[this.uploadIndex]?.OptionId);
    }
  }
  uplaodFile(resizedImage, optionId) {
    this.laoding = true;
    // this.loadingInterval = setInterval(() => {
    //   this.progress += 10;
    // }, 200);
    let fileOfBlob = new File([resizedImage], 'iio.jpg');
    // upload
    let formData = new FormData();
    formData.append('file', fileOfBlob);
    formData.append('name', 'iio' + Math.floor(Math.random() * 1000) + 55);
    this.uploadService.uploadFile(formData).subscribe(response => {
      if (response && response.length) {
        const image: Images = {
          ImageId: '',
          OtherId: this.otherId,
          OptionId: optionId,
          Url: `${environment.API_URL}/api/upload/${response}`,
          IsMain: 0,
          CreateUserId: this.user.UserId,
          ModifyUserId: this.user.UserId,
          StatusId: 1
        };
        this.imagesToUplaod.push(image);
        this.progress += 100 / this.productImages.length;
        if (this.uploadIndex < this.productImages.length - 1) {
          this.uploadIndex++;
          setTimeout(() => {
            this.uplaodThen();
          }, 1000);
        } else {
          this.uploadIndex = 0;
          this.productImages = [];

          this.imagesService.addRange(this.imagesToUplaod).subscribe(data => {
            this.images = data;
            this.imagesToUplaod = [];
            this.laoding = false;
            this.onUploadFinished.emit(this.images);
          })
        }
      }
    });
  }



  dataURLToBlob(dataURL) {
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      // tslint:disable-next-line: no-shadowed-variable
      const parts = dataURL.split(',');
      // tslint:disable-next-line: no-shadowed-variable
      const contentType = parts[0].split(':')[1];
      // tslint:disable-next-line: no-shadowed-variable
      const raw = parts[1];

      return new Blob([raw], { type: contentType });
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  delete(image: Images) {
    if (image) {
      image.StatusId = 0;
      this.imagesService.update(image).subscribe(data => {
        if (data && data.ImageId) {
          this.deleteImageEvent.emit(image);
        }
      })
    }
  }

}
