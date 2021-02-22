import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Country } from "./country";

@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.css"]
})
export class CountriesComponent {
  public countries: Country[];
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  ngOnInit() {
    this.http.get<Country[]>(this.baseUrl + "api/Countries").subscribe(
      result => {
        this.countries = result;
      },
      error => console.error(error)
    );
  }
}
