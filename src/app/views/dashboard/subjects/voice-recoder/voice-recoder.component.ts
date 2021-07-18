import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/services';

@Component({
  selector: 'app-voice-recoder',
  templateUrl: './voice-recoder.component.html',
  styleUrls: ['./voice-recoder.component.scss']
})
export class VoiceRecoderComponent implements OnInit {
  @Output() doneRecording: EventEmitter<string> = new EventEmitter();

  //Lets initiate Record OBJ
  record;
  //Will use this flag for detect recording
  recording = false;
  //Url of Blob
  url;
  error;
  blob: any;
  constructor(private domSanitizer: DomSanitizer, private uploadService: UploadService) {
  }
  ngOnInit(): void {

  }
  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
   * Start recording.
   */
  initiateRecording() {

    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  /**
   * Will be called automatically.
   */
  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  /**
   * Stop recording.
   */
  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    this.blob = blob;
  }
  /**
   * Process Error.
   */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

  getFile(blob) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      console.log(base64data);
    }
  }

  saveFile() {
    const extention = ".wav";

    // this.getFile(blob);
    let fileOfBlob = new File([this.blob], extention);
    // upload
    let formData = new FormData();
    formData.append('file', fileOfBlob);
    formData.append('name', 'iio');
    this.uploadService.uploadFile(formData).subscribe(url => {
      console.log(url);
      const uploadedVoice = `${environment.API_URL}/api/upload/${url}`;
      this.doneRecording.emit(uploadedVoice);
    });
  }
}
