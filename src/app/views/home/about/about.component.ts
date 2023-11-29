import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'about-component',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {

  private modalService = inject(NgbModal);

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit() {

    this.popupComponent.open();
    /*const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.data = 'About Component';*/

  }

}
