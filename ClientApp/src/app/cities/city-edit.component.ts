import { Component, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { City } from "./City";
import { Country } from "./../countries/country";

@Component({
  selector: "app-city-edit",
  templateUrl: "./city-edit.component.html",
  styleUrls: ["./city-edit.component.css"]
})
export class CityEditComponent {
  // the view title
  title: string;

  // the form model
  form: FormGroup;

  // the city object to edit or Create
  city: City;
  // the city object id, as fetched from the active route:
  // It's NULL when we're adding a new city,
  // and not NULL when we're editing an existing one.

  id?: number;
  //the country array for the select
  countries: Country[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      lat: new FormControl("", Validators.required),
      lon: new FormControl("", Validators.required),
      countryId: new FormControl("", Validators.required)
    });

    this.loadData();
  }

  loadData() {
    //load countries
    this.loadCountries();
    // retrieve the ID from the 'id' parameter
    this.id = +this.activatedRoute.snapshot.paramMap.get("id");

    if (this.id) {
      //EDIT MODE

      //fetch the city from server
      var url = this.baseUrl + "api/cities/" + this.id;
      this.http.get<City>(url).subscribe(
        result => {
          this.city = result;
          this.title = "Edit -" + this.city.name;

          //update the form with the city value
          this.form.patchValue(this.city);
        },
        error => console.error(error)
      );
    } else {
      //ADD NEW MODE
      this.title = "Create a new City";
    }
  }
  loadCountries() {
    //fetch all the countries from server

    // fetch all the countries from the server
    var url =
      this.baseUrl + "api/countries?pageIndex=0&pageSize=9999&sortColumn=name";
    var params = new HttpParams()
      .set("pageIndex", "0")
      .set("pageSize", "9999")
      .set("sortColumn", "name");

    this.http
      .get<any>(url, { params })
      .subscribe(
        result => {
          this.countries = result.data;
        },
        error => console.error(error)
      );
  }

  onSubmit() {
    var city = this.id ? this.city : <City>{};

    city.name = this.form.get("name").value;
    city.lat = +this.form.get("lat").value;
    city.lon = +this.form.get("lon").value;
    city.countryId = +this.form.get("countryId").value;
    if (this.id) {
      var url = this.baseUrl + "api/cities/" + this.city.id;
      this.http.put<City>(url, city).subscribe(
        result => {
          console.log("City " + city.id + " has been updated.");

          // go back to cities view
          this.router.navigate(["/cities"]);
        },
        error => console.error(error)
      );
    } else {
      //ADD NEW Mode
      var url = this.baseUrl + "api/cities";
      this.http.post<City>(url, city).subscribe(
        result => {
          console.log("City " + result.id + " has been created.");

          // go back to cities view
          this.router.navigate(["/cities"]);
        },
        error => console.error(error)
      );
    }
  }
}
