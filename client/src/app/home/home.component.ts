import {Component, OnInit} from "@angular/core";
import {Access} from "../constants/access";
import {Router} from "@angular/router";


@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends Access implements OnInit {

  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {

  }


}
