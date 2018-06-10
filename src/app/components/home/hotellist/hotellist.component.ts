import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/dataService';
import { hotelList } from '../../../constants/urls';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotellist',
  templateUrl: './hotellist.component.html',
  styleUrls: ['./hotellist.component.scss']
})
export class HotellistComponent implements OnInit {
  hotelList: any[] = [];
  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getHoteList();
  }

  getHoteList() {
    this.dataService.loading = true;
    let url = this.dataService.getApiUrl() + hotelList.GetListView;
    this.dataService.getData(url).subscribe(response => {
      this.dataService.loading = false;
      this.hotelList = response.Data;
      console.log(response.Data);
    }, error => {
      this.dataService.loading = false;
      alert(error.error.error_description);
    })
  }

  getHotelDetails(hotelId, roomId){
    this.router.navigate(['hotel', hotelId, roomId]);
  }
}
