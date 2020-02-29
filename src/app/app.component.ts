import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import {postBody} from './AddPatient/post-body';
import {putBody} from './EditPatient/put-body';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayeColumns: string[] = ['id', 'lastname', 'name', 'delete'];
  title = 'PatientCare';
  panelOpenState = false;
  entry = [];
  private _search = '' ;
  get search(): string {
    return this._search ;
  }
  set search(newSearch) {
    this.getPatient(newSearch);
    this._search = newSearch ;
  }

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getPatient();
  }
  public getFamilyName(element) {
    const resource = element['resource'];
    if (!resource) return 'No resource';
    const name = resource ['name'] ;
    if (!name) return 'No name' ;
    const firstEleName = name[0];
    if (!firstEleName) return 'No element in name ';
    const familyName = firstEleName['family'] ;
    if (!familyName) return 'No family name' ;
    return familyName;
  }
  public getFirstName(element) {
    const resource = element['resource'];
    if (!resource) return 'No resource';
    const name = resource ['name'] ;
    if (!name) return 'No name' ;
    const firstEleName = name[0];
    if (!firstEleName) return 'No element in name ';
    const given = firstEleName['given'] ;
    if (!given) return 'No given name' ;
    return given.join(' ');

  }
  private getPatient(family = null) {
    const familyargs = family ? `&family=${family}` : '' ;
    this.http
      .get('https://stu3.test.pyrohealth.net/fhir/Patient?_count=10' + familyargs)
      .subscribe(posts => {
        console.log(posts);
        this.entry = posts['entry'] ;
      });
  }

private onCreatePoste( f: NgForm) {
  let header = new HttpHeaders();
  header = header.set('Content-Type', 'application/xml');
      this.http
      .post('https://stu3.test.pyrohealth.net/fhir/Patient', postBody(f.value), { headers: header})
        .subscribe(post =>  {
          console.log(post);
          alert("Patient Ajouté !");
          f.reset();
        });
}

  private onEditPost(putData: NgForm , element) {
    const ident = element['resource']['id'];
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/xml');
    this.http
      .put(
        'https://stu3.test.pyrohealth.net/fhir/Patient/' + ident , putBody(ident, putData.value), { headers: header})
      .subscribe(edit => {
        console.log(edit);
        alert("Patient Modifier");
        putData.reset();
      }
  );
  }
 private deletePatient(element) {
   const ident = element['resource']['id'];
   console.log(element);
   this.http
      .delete('https://stu3.test.pyrohealth.net/fhir/Patient/' + ident)
      .subscribe(deleet => {
        this.search = this._search;
      });
  }
}


