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
    if (isInsideSidebar && isNotButtonOrLink  && this.collapsed == false) {
      this.collapsed = true;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }

    else if (isInsideSidebar && isNotButtonOrLink && this.collapsed==true) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }


  }
  

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
}