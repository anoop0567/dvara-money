import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // dummy images array
  images = [
    { path: "https://picsum.photos/540" },
    { path: "https://picsum.photos/540" },
    { path: "https://picsum.photos/540" },
    { path: "https://picsum.photos/540" }
  ]

}
