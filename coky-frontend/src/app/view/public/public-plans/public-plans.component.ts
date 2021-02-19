import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/config/functions.config';

@Component({
  selector: 'app-public-plans',
  templateUrl: './public-plans.component.html',
  styleUrls: ['./public-plans.component.scss']
})
export class PublicPlansComponent implements OnInit {


  @Input()
  home = false;

  plans = ["basic", "standard", "premium", "ultra"]

  microservices = [
    { name: "General cleaning", basic: true, standard: true, premium: true, ultra: true },
    { name: "Painting", basic: true, standard: true, premium: true, ultra: true },
    { name: "Electricity", basic: true, standard: true, premium: true, ultra: true },
    { name: "Plumbing", basic: true, standard: true, premium: true, ultra: true },
    { name: "Cleaning consumables", basic: true, standard: true, premium: true, ultra: true },
    { name: "Sanitary Consumables", basic: true, standard: true, premium: true, ultra: true },
    { name: "Laundry service for sheets and towels", basic: true, standard: true, premium: true, ultra: true },
    { name: "Civil works and bricklaying", basic: false, standard: true, premium: true, ultra: true },
    { name: "Locksmith", basic: false, standard: true, premium: true, ultra: true },
    { name: "Access control", basic: false, standard: true, premium: true, ultra: true },
    { name: "Fire Detection System", basic: false, standard: true, premium: true, ultra: true },
    { name: "Automation in general", basic: false, standard: true, premium: true, ultra: true },
    { name: "Gardening", basic: false, standard: true, premium: true, ultra: true },
    { name: "Fumigation", basic: false, standard: false, premium: true, ultra: true },
    { name: "Resident personnel for VIP attention", basic: false, standard: false, premium: true, ultra: true },
    { name: "AA Units, pumps, electrical generators and frequently used equipament are covered up to total loss", basic: false, standard: false, premium: true, ultra: true },
  ]


  constructor(private func: FunctionsService, activatedRoute: ActivatedRoute) {
    func.setTitle(activatedRoute.snapshot.data.title)
    // console.log(activatedRoute.snapshot.data.roles)
  }

  ngOnInit() {
  }

}
