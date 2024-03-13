import { Component } from '@angular/core';
import { PropertiesDto } from 'src/app/models/properties/properties.dto';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent {

  propertiess: PropertiesDto[] = [];
  textsearch: string = '';


  constructor(
    private propertiesAdminService: PropertiesService

  ) { }
  

//Init
ngOnInit(): void {
  this.getAll();
}
//Get All
getAll() {
  this.propertiesAdminService.getAll().subscribe((data) => {
    if (data.isSuccessful) {
      this.propertiess = data.data ?? [];
    } else {
    }
  });
}

//Search
Search() {
  if (this.textsearch != "") {
    // Sử dụng filter để lọc người dùng theo username
    this.propertiess = this.propertiess.filter(properties =>properties.title &&
      properties.title.toLowerCase().includes(this.textsearch.toLowerCase())
    );
  } else {
    this.ngOnInit();
  }
}

getSeverity (property: { status: any; }) {
  switch (property.status) {
    case 'Đã bán':
      return 'success';

    case 'Đang bán':
      return 'warning';

    case 'Còn hàng':
      return 'danger';

    default:
      return undefined;
  }
};

}
