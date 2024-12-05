import { Component, EventEmitter, HostListener, OnInit, Output, ElementRef } from '@angular/core';
import { navBarData } from '../sidebar/nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  screenWidth = 0;
  collapsed = false;
  navData = navBarData;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  // @HostListener('document:click', ['$event'])
  // clickInsideSidebar(event: MouseEvent) {
  //   // Get references to the sidebar, button, and links
  //   const sidebar = this.elementRef.nativeElement.querySelector('.sidenav') as HTMLElement;
  //   const button = this.elementRef.nativeElement.querySelector('.logo') as HTMLElement;
  //   const links = this.elementRef.nativeElement.querySelectorAll('.sidenav-nav-link') as NodeListOf<HTMLElement>;
  
  //   // Check if the target is an HTMLElement
  //   const target = event.target as HTMLElement;
  
  //   // Collapse the sidebar if the click is inside the sidebar but not on the button or links
  //   if (sidebar && button && target) {
  //     // Check if the click happened outside the button and links
  //     const isNotOnButton = !button.contains(target);
  //     const isNotOnLinks = Array.from(links).every(link => !link.contains(target));
      
  //     if (isNotOnButton && isNotOnLinks) {
  //       this.collapsed = true;
  //       this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  //     }
  //   }
  // }

  @HostListener('document:click', ['$event'])
  clickInsideSidebar(event: MouseEvent) {
    // Get the sidebar, button, and links elements
    const sidebar = this.elementRef.nativeElement.querySelector('.sidenav') as HTMLElement;
    const button = this.elementRef.nativeElement.querySelector('.logo') as HTMLElement;
    const links = this.elementRef.nativeElement.querySelectorAll('.sidenav-nav-link') as NodeListOf<HTMLElement>;
  
    const target = event.target as HTMLElement;
  
    // Ensure we are not clicking on the button or links
    const isInsideSidebar = sidebar.contains(target);
    const isNotButtonOrLink = !button.contains(target) && !Array.from(links).some(link => link.contains(target));
  
    // Collapse the sidebar if click is inside the sidebar but not on the button or links
    if (isInsideSidebar && isNotButtonOrLink ) {
      console.log("hello");
      this.collapsed = true;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
      console.log('Sidebar collapsed!');
    }

    console.log('Target:', target);
console.log('Sidebar contains target:', sidebar.contains(target));
console.log('Is it not button or link?', isNotButtonOrLink);

  }
  

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
}