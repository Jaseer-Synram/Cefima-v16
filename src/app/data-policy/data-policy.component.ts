import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-policy',
  templateUrl: './data-policy.component.html',
  styleUrls: ['./data-policy.component.css']
})
export class DataPolicyComponent implements OnInit {
  active: any = 1;
  constructor(public router: Router,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((params) => {
      this.active = params['id'] ? params['id'] : 1;
    });
  }
}