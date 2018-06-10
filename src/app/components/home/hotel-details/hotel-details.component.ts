import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/dataService';
import { hotelList } from '../../../constants/urls';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  hotelId: Number;
  roomId: Number;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {
    this.roomId = Number(this.route.snapshot.params['roomId']);
    this.hotelId = Number(this.route.snapshot.params['hotelId']);
  }

  ngOnInit() {
    // this.getHotelData(this.hotelId, this.roomId);
  }

  getHotelData(hotelId, roomId) {
    this.dataService.loading = true;
    const url = this.dataService.getApiUrl() + hotelList.getHotelDetails;
    this.dataService.postDataObject(url, { 'HotelId': hotelId, 'RoomId': roomId }).subscribe(res => {
      this.dataService.loading = false;
      console.log(res);
    }, error => {
      this.dataService.loading = false;
      alert(error.error.error_description);
    })
  }

}
