import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() timer: number;
    timerCopy: number;
    intervalTimerId: any;
    intervalTimelineId: any;
    @ViewChild('timeline', { static: false }) timelineDiv: ElementRef;
    @Input() step: number;
    @Output() timeExceed = new EventEmitter();
    constructor() {
        this.step = 0;
        this.timer = 0;
        this.timerCopy = 0;
        this.timelineDiv = null as any;
        this.intervalTimerId = null;
        this.intervalTimelineId = null;
    }

    ngOnInit(): void {
        this.timerCopy = this.timer;
        this.timerInit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.step && !changes.step.isFirstChange()) {
            this.restartTimers();
        }
    }

    ngAfterViewInit(): void {
        this.timelineInit();
    }

    ngOnDestroy(): void {
        this.stopTimers();
    }

    restartTimers() {
        this.stopTimers();
        this.timelineDiv.nativeElement.style.width = '0px';
        this.timerCopy = this.timer;
        this.timerInit();
        this.timelineInit();
    }

    stopTimers() {
        if (this.intervalTimelineId) {
            clearInterval(this.intervalTimelineId);
        }

        if (this.intervalTimerId) {
            clearInterval(this.intervalTimerId);
        }
    }

    timerInit(): void {
        this.intervalTimerId = setInterval(() => {
            this.timerCopy--;
            if (this.timerCopy === 0) {
                this.timeExceed.emit();
                clearInterval(this.intervalTimerId);
            }
        }, 1000);
    }

    timelineInit(): void {
        const boxWidth = 600;
        let timeline = 0;
        this.intervalTimelineId = setInterval(() => {
            timeline += 1;
            this.timelineDiv.nativeElement.style.width = timeline + 'px';
            if (timeline >= boxWidth) {
                clearInterval(this.intervalTimelineId);
            }
        }, (this.timer * 1000) / boxWidth);
    }
}
