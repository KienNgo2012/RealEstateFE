import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PropertiesDto } from 'src/app/models/properties/properties.dto';
import { UserDto } from 'src/app/models/authentication/user.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { PropertiesService } from 'src/app/services/properties.service';
import { PropertiesReq } from 'src/app/models/properties/properties-req.dto';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  selectedFile: File | null;
  imagePreview: string | null;
  userId!: string;
  user: UserDto | null = null;
  properties: PropertiesReq = {
    idUser: 0, title: '', category: '', categoryDetail: '', province: '', district: '', wards: '', houseNumber: '', acreage: 0, image: 'image', imageFile: null, price: 0, description: '', createDate: new Date(), status: ''
  };
  message: string = ''; 
  authenticatedSubscription: Subscription;
  isUserAuthenticated: boolean = false;
  provincesList!: any[];
  selectedprovincesList: any[] = [];
  selectedCity: any; // Biến để lưu thành phố được chọn
  selectedDistrict: any; // Biến để lưu quận/huyện được chọn
  selectedWardList: any[] = []; // Biến để lưu xã được chọn
  categoryList!: any[];
  selectedCategoryList!: any[];

  constructor(private http: HttpClient, 
    private authenService: AuthenticationService,
    private propertiesService: PropertiesService,
    private messageService: MessageService

    ) {
    this.selectedFile = null;
  this.imagePreview = null;
  // lấy thông tin user
  this.authenticatedSubscription = this.authenService.authChanged.subscribe(
    (rs) => {
      this.isUserAuthenticated = rs;
      this.user = this.authenService.getUserInfo();
      this.properties.idUser = this.user?.id;
    }
  );
  }
  ngOnInit(): void {
    this.getDataProvinces();
    this.getDataCategory();
  }
  // change event of province and get value of province
  onChangeProvince(event: any): void {
    this.properties.province= event.target.value;
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
    this.properties.district= event.target.value;
    if(event.target.value==null || event.target.value=='') {
      this.selectedWardList =[];
    }
    else {
      this.selectedWardList = this.selectedprovincesList!.filter((obj: any) => obj.name === event.target.value)[0].wards;
    }
  }

      // change event of wards and get value of wards
  onChangeWards(event: any): void {
    this.properties.wards= event.target.value;
  }

      // change event of category and get value of category
  onChangeCategory(event: any): void {
    this.properties.category= event.target.value;
    if(event.target.value==null || event.target.value=='') {
      this.selectedCategoryList =[];
    }
    else {
      this.selectedCategoryList = this.categoryList!.filter((obj: any) => obj.name === event.target.value)[0].categorydetail;
    }
  }

      // change event of categoryDetail and get value of categoryDetail
  onChangeCategoryDetail(event: any): void {
    this.properties.categoryDetail= event.target.value;
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
  // select image of properties 
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
  
      if (file instanceof File) {
        this.selectedFile = file;
  
        // Hiển thị ảnh sau khi chọn
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
    else {
      this.selectedFile = null;
    }
  }
// add object vao form data de gui ve server
  onUpload() {
    const formData = new FormData();
    if (this.properties.idUser !== undefined) {
      formData.append('idUser', this.properties.idUser.toString());
    } 
    formData.append('title', this.properties.title);
    formData.append('category', this.properties.category);
    formData.append('categoryDetail', this.properties.categoryDetail);
    formData.append('province', this.properties.province);
    formData.append('district', this.properties.district);
    formData.append('wards', this.properties.wards);
    formData.append('houseNumber', this.properties.houseNumber);
    formData.append('acreage', this.properties.acreage.toString());
    formData.append('image', this.properties.image);
    if (this.selectedFile !== null && this.selectedFile !== undefined) {
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }
    formData.append('price', this.properties.price.toString());
    formData.append('description', this.properties.description);
    if (this.properties.createDate !== null && this.properties.createDate !== undefined) {
      formData.append('createDate', this.properties.createDate.toISOString());
    }   
    formData.append('status', this.properties.status);

    this.propertiesService.createNewProperties(formData).subscribe((data) => {
      if (data.isSuccessful) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Create propertie successfully!',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Create propertie failed!',
          detail: data.message,
        });
      }
    });
  }
 
}
