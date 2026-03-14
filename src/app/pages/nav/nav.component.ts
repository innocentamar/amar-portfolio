import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const navbar = document.querySelector('.navbar') as HTMLElement;
  //   if (window.pageYOffset > 50) {
  //     navbar.classList.add('scrolled');
  //   } else {
  //     navbar.classList.remove('scrolled');
  //   }
  // }


}
