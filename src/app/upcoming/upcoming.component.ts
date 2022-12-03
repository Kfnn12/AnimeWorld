import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchResultServiceService } from '../services/search-result-service.service';
declare var window: any;


@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {


  constructor(private urlservice: SearchResultServiceService, private router: Router, private activatedRoute: ActivatedRoute) { }
  datar: any;
  currentpage: any;
  check1!: number;
  loadcomponent = false;
  ngOnInit(): void {
    //get route params
    this.currentpage = this.activatedRoute.snapshot.paramMap.get('num');
    this.check1 = Number(this.currentpage);

    //get data
    this.urlservice.getUpcominngSeason(this.currentpage).subscribe((result: any) => {
      this.datar = result;
      console.log(result)
      this.loadcomponent = true;
    })
  }

  //previous page
  nextpage: any;
  prevPage() {
    console.log("prev click1")
    if (this.datar.pagination.current_page > 1) {
      this.nextpage = this.datar.pagination.current_page - 1;
      this.router.navigate(['upcoming/page/', this.nextpage]).then(page => { window.location.reload(); });
      console.log(this.nextpage)
    }
    console.log("out")
  }

  //next page
  nextPage() {
    console.log("next click1")
    if (this.datar.pagination.last_visible_page != this.datar.pagination.current_page) {
      this.nextpage = this.datar.pagination.current_page + 1;
      this.router.navigate(['upcoming/page/', this.nextpage]).then(page => { window.location.reload(); });
      console.log(this.nextpage)
    }
    console.log("out")
  }
  //get anime details
  redirect(id: string) {
    console.log(id + "epidpage");
    this.router.navigateByUrl('episodes/' + id);
  }

}
