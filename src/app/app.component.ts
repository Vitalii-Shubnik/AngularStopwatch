import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription, Observable, interval, fromEvent, map, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  seconds: number = 0;
  lastClick: number = null;
  timeBetweenClicks: number | null = null;
  working: boolean = false;
  sorce: Observable<number> = interval(1000)
  subscription: Subscription | null = null;
  clickSubscription: Subscription | null = null;

  @ViewChild('wait') waitBtn: ElementRef;
  ngAfterViewInit() {
    fromEvent(this.waitBtn.nativeElement, 'click').pipe(
      filter(_ => this.working),
      map(_ => {
        this.timeBetweenClicks = Date.now() - this.lastClick
        this.lastClick = Date.now()
      }),
      filter(_ => this.timeBetweenClicks && this.timeBetweenClicks <= 500))
      .subscribe(_ => {
        this.working = false;
        this.subscription?.unsubscribe()
      })
  }

  handleStart = () => {
    this.working = true;
    this.subscription = this.sorce.subscribe(_ => this.seconds++)
  }

  handleStop = () => {
    this.working = false;
    this.subscription?.unsubscribe()
    this.seconds = 0;
  }

  handleReset = () => {
    this.subscription?.unsubscribe()
    this.seconds = 0;
    this.working = true
    this.subscription = this.sorce.subscribe(_ => this.seconds++)
  }
}
