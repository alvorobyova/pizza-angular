import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef, ViewChild
} from '@angular/core';
import {from, map, Observable, Subject, Subscription} from "rxjs";
// import{NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environments/environment";

// declare var bootstrap: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  // private observable: Observable<number>;
  private subject: Subject<number>;
  private subscription: Subscription | null = null;

  constructor() {
    this.subject = new Subject<number>();
    let count = 0;
    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000);
    const timeout1 = setTimeout(() => {
      this.subject.complete();
    }, 4000);


    /*this.observable = new Observable((observer) => {
      let count = 0;
      const interval = setInterval(() => {
        observer.next(count++);
      }, 1000);
      const timeout1 = setTimeout(() => {
        observer.complete();
      }, 4000);
      const timeout2 = setTimeout(() => {
        observer.error('world');
      }, 5000);

      return {
        unsubscribe() {
          clearInterval(interval);
          clearTimeout(timeout1);
          clearTimeout(timeout2);
        }
      }
    })*/

    // this.observable = from([1, 2, 3, 4, 5]);
  }

  ngOnInit() {

    /*const myModalAlternative = new bootstrap.Modal('#myModal', {});
    myModalAlternative.show();*/

    this.subscription = this.subject.subscribe(
        {
          next: (param: number) => {
            console.log('subscriber 1: ', param);
          },
          error: (error: string) => {
            console.log('ERROR: ' + error);
          }
        },
      );

    console.log(environment);
  }
  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  // из ViewChild мы получаем ссылку, поэтому важно открыть модалку тогда, когда уже весь контент будет инициализирован
  ngAfterViewInit() {
    // this.modalService.open(this.popup, {});

    /*const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.data = 'Main Component';*/

    // this.popupComponent.open();
  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  test() {

    this.subject
      .pipe(
        map(number => {
          return "Число: " + number;
        })
      )
      .subscribe((param: string) => {
      console.log('subscriber 2: ', param);
    });
  }
}
