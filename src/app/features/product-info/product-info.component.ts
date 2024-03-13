import { Component } from '@angular/core';
import { PropertiesDto } from 'src/app/models/properties/properties.dto';
import { PropertiesService } from 'src/app/services/properties.service';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent {
  properties: PropertiesDto[] = [];

  constructor(
    private propertiesService: PropertiesService,
  ) {}
  ngOnInit(): void {
    this.loadPropertiesNew();
  }
  loadPropertiesNew() {
    this.propertiesService.getNewProperties().subscribe((data) => {
      if (data.isSuccessful) {
        this.properties = data.data ?? [];
      } 
    });
  }

}
