import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServerservService } from '../serverserv.service';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-newmodal',
  templateUrl: './newmodal.component.html',
  styleUrls: ['./newmodal.component.css']
})
export class NewmodalComponent implements OnInit {

  closeResult = '';
  faPlus=faPlus;
  loader = false;
  selected="";
  files=[];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private serv: ServerservService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    if(event.target.files.length > 0) 
     {
       console.log(event.target.files);
       this.files=event.target.files;
     }
   }
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log(this.closeResult);
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log(this.closeResult);
      return 'by clicking on a backdrop';
    } else {
      console.log(this.closeResult);
      return `with: ${reason}`;
    }
  }
  upload(){
    for(let i=0;i<this.files.length;i++){
      console.log(this.files[i]);
      this.serv.uploadFile(this.files[i]);
    }
    // this.files['FileList'].forEach((item)=>{
    //   this.serv.uploadFile(item)
    // })
  }

}