import {Component} from '@angular/core';
import {PropertiesReq} from "../../models/properties/properties-req.dto";
import {AgentService} from "../../services/agent.service";
import {Router} from "@angular/router";
import { MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-agent-update-properties',
  templateUrl: './agent-update-properties.component.html',
  styleUrls: ['./agent-update-properties.component.css']
})
export class AgentUpdatePropertiesComponent {
  properties: PropertiesReq = {
    idUser: 0, title: '', category: '', categoryDetail: '', province: '', district: '', wards: '', houseNumber: '', acreage: 0, image: 'image', imageFile: null, price: 0, description: '', createDate: new Date(), status: ''
  };
  provincesList!: any[];
  selectedFile?: File | null;
  imagePreview!: string | null;
  selectedRowData: any;
  message: string = '';
  myForm: FormGroup;
  formData: FormData = new FormData();
  formFields = ['idUser','idProperties','category','categoryDetail','province','district','wards','houseNumber','status','title','description','acreage','price','imageFile','image'];

  constructor(private agentService: AgentService,
            private router: Router,
            private messageService: MessageService,
            private fb: FormBuilder)
  {
    this.selectedRowData = this.agentService.getSelectedRowData();
    this.onLoadScreen();
    this.myForm = this.fb.group({
      idUser: [this.selectedRowData.idUser],
      idProperties: [this.selectedRowData.idProperties],
      category: [{value: this.selectedRowData.category,  disabled: true}, Validators.required],
      categoryDetail: [{value: this.selectedRowData.categoryDetail,  disabled: true}, Validators.required],
      province: [{value: this.selectedRowData.province,  disabled: true}, Validators.required],
      district: [{value: this.selectedRowData.district,  disabled: true}, Validators.required],
      wards: [{value: this.selectedRowData.wards,  disabled: true}, Validators.required],
      houseNumber: [{value: this.selectedRowData.houseNumber,  disabled: true}, Validators.required],
      status: [this.selectedRowData.status, Validators.required],
      title: [this.selectedRowData.title, Validators.required],
      description: [this.selectedRowData.description, Validators.required],
      acreage: [{value: this.selectedRowData.acreage, disabled: true}, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      price: [this.selectedRowData.price, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      imageFile: [null],
      image: [this.selectedRowData.image]
    });

    this.formFields.forEach((field) => {
      // @ts-ignore
      this.myForm.get(field).valueChanges.subscribe((value) => {

        this.formData.delete(field);
        this.formData.append(field, value);
      });
    });
  }

  private addToFormData(fieldName: string, value: any) {
    this.formData.append(fieldName, value);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file instanceof File) {
        this.selectedFile = file;

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
        this.formData.set('imageFile', this.selectedFile, this.selectedFile.name);
      }
    }
    else {
      this.selectedFile = null;
    }
  }

  onLoadScreen(){
    this.properties.province = this.selectedRowData.province;
    this.properties.district = this.selectedRowData.district;
    this.properties.category = this.selectedRowData.category;
    this.properties.categoryDetail = this.selectedRowData.categoryDetail;
    this.properties.wards = this.selectedRowData.wards;
    this.properties.houseNumber = this.selectedRowData.houseNumber;
    this.properties.status = this.selectedRowData.status;
    this.properties.title = this.selectedRowData.title;
    this.properties.description = this.selectedRowData.description;
    this.properties.acreage = this.selectedRowData.acreage;
    this.properties.price = this.selectedRowData.price;
    this.properties.image = this.selectedRowData.image;
    this.properties.imageFile = null;
    this.imagePreview = this.selectedRowData.image;
  }

  onClear(){
    if (this.myForm) {
      this.myForm.get('province')?.setValue(this.selectedRowData.province);
      this.myForm.get('district')?.setValue(this.selectedRowData.district);
      this.myForm.get('category')?.setValue(this.selectedRowData.category);
      this.myForm.get('categoryDetail')?.setValue(this.selectedRowData.categoryDetail);
      this.myForm.get('wards')?.setValue(this.selectedRowData.wards);
      this.myForm.get('houseNumber')?.setValue(this.selectedRowData.houseNumber);
      this.myForm.get('status')?.setValue(this.selectedRowData.status);
      this.myForm.get('title')?.setValue(this.selectedRowData.title);
      this.myForm.get('description')?.setValue(this.selectedRowData.description);
      this.myForm.get('acreage')?.setValue(this.selectedRowData.acreage);
      this.myForm.get('image')?.setValue(this.selectedRowData.image);
      this.myForm.get('imageFile')?.setValue(null);
      this.imagePreview = this.selectedRowData.image;
    }

  }

  onUpload() {
    if (this.myForm.valid) {
      // Handle form submission logic here
      this.formFields.forEach(fieldName => {
        const formControl = this.myForm.get(fieldName);
        if (formControl) {
          this.addToFormData(fieldName, formControl.value);
        }
      });

      this.agentService.updateProperties(this.formData).subscribe(
        (rs: any) => {
          if (rs.isSuccessful) {
            // this.message = rs.data;
            this.router.navigate(['menu/agent-properties']);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: rs.data,
            });
          }else{
            // this.message = rs.message;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: rs.message,
            });
          }
        },
        (error) => {
          // this.message = error.message;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
        }
      );
    } else {
      // Mark form controls as touched to trigger error messages
      this.myForm.markAllAsTouched();
    }

  }
}

