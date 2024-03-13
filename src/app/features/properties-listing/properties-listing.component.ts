import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto } from 'src/app/models/authentication/user.dto';
import { PropertiesService } from 'src/app/services/properties.service';
import { SearchProperties } from 'src/app/models/properties/searchProperties';
import { PropertiesDto } from 'src/app/models/properties/properties.dto';

@Component({
  selector: 'app-properties-listing',
  templateUrl: './properties-listing.component.html',
  styleUrls: ['./properties-listing.component.css']
})
export class PropertiesListingComponent implements OnInit {
  userId!: string;
  user: UserDto | null = null;
  searchPropertiesReq: SearchProperties = {
    category: '', categoryDetail: '', province: '', district: '', wards: ''
  };
  propertiesList!: PropertiesDto[] | undefined;
  message: string = ''; 
  isUserAuthenticated: boolean = false;
  provincesList!: any[];
  selectedprovincesList: any[] = [];
  selectedCity: any; // Biến để lưu thành phố được chọn
  selectedDistrict: any; // Biến để lưu quận/huyện được chọn
  selectedWardList: any[] = []; // Biến để lưu xã được chọn
  categoryList!: any[];
  selectedCategoryList!: any[];

  constructor(private http: HttpClient, 
    private propertiesService: PropertiesService,
    ) {
  }
  ngOnInit(): void {
    this.searchProperties();
    this.getDataProvinces();
    this.getDataCategory();
  
  }
  // change event of province and get value of province
  onChangeProvince(event: any): void {
    this.searchPropertiesReq.province= event.target.value;
    if(event.target.value==null || event.target.value=='') {
      this.selectedprovincesList =[];
    }
    else {
      this.selectedprovincesList = this.provincesList!.filter((obj: any) => obj.name === event.target.value)[0].districts;
    }
    this.selectedWardList =[];
  }

    // change event of district and get value of district
  onChangeDistricts(event: any): void {
    this.searchPropertiesReq.district= event.target.value;
    if(event.target.value==null || event.target.value=='') {
      this.selectedWardList =[];
    }
    else {
      this.selectedWardList = this.selectedprovincesList!.filter((obj: any) => obj.name === event.target.value)[0].wards;
    }
  }

      // change event of wards and get value of wards
  onChangeWards(event: any): void {
    this.searchPropertiesReq.wards= event.target.value;
  }

      // change event of category and get value of category
  onChangeCategory(event: any): void {
    this.searchPropertiesReq.category= event.target.value;
    if(event.target.value==null || event.target.value=='') {
      this.selectedCategoryList =[];
    }
    else {
      this.selectedCategoryList = this.categoryList!.filter((obj: any) => obj.name === event.target.value)[0].categorydetail;
    }
  }

      // change event of categoryDetail and get value of categoryDetail
  onChangeCategoryDetail(event: any): void {
    this.searchPropertiesReq.categoryDetail= event.target.value;
  }
  //get data provinces
  getDataProvinces(): void {
    this.propertiesService.getDataProvinces().subscribe(
      (data) => {
        this.provincesList = data; 
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  // get data category and category detail
  getDataCategory(): void {
    this.propertiesService.getDataCategory().subscribe(
      (data) => {
        this.categoryList = data; 
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
searchProperties(){
  this.propertiesService.getPropertiesBy(this.searchPropertiesReq).subscribe((data) => {
    if (data.isSuccessful) {
      this.propertiesList=data.data;
    }
  });
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
