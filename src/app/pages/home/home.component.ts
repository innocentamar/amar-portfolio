import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Typed from 'typed.js';
import { HealthService } from 'src/app/services/health.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  apiOnline  = "Checking...";

  constructor(private healthService: HealthService) {}

    ngOnInit() {
    this.checkAPI();
  }


 @ViewChild('typedElement') typedElement!: ElementRef;

  experienceCount = 0;
  apiCount = 0;
  projectCount = 0;

  ngAfterViewInit(): void {

    // Typing Animation
    new Typed(this.typedElement.nativeElement, {
      strings: [
        ".NET Full Stack Developer",
        "Angular Developer",
        "Banking Systems Engineer",
        "API & Backend Specialist"
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1500,
      loop: true
    });

    // Start stats animation
    this.animateCounters();

  }

  animateCounters(){

    let expTarget = 3;
    let apiTarget = 40;
    let projTarget = 10;

    let interval = setInterval(() => {

      if(this.experienceCount < expTarget)
        this.experienceCount++;

      if(this.apiCount < apiTarget)
        this.apiCount++;

      if(this.projectCount < projTarget)
        this.projectCount++;

      if(
        this.experienceCount === expTarget &&
        this.apiCount === apiTarget &&
        this.projectCount === projTarget
      ){
        clearInterval(interval);
      }

    },40);
  }


  checkAPI() {
     debugger;
    this.healthService.checkHealth().subscribe({

     next: (response: any) => {
      
      this.apiOnline = (response.status === "Online") ? "true" : "false";
    },
    error: () => {
      this.apiOnline = "false";
    }

    });

  }
  

}