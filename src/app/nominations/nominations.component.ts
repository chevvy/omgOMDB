import { Component, OnInit } from '@angular/core';
import {Result} from '../movie/result';

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.scss']
})
export class NominationsComponent implements OnInit {

  constructor() { }
  searchResults: Result[];
  nominationsList: Result[];

  ngOnInit(): void {
    this.nominationsList = [{Title: 'allo', Year: 'mon coco', Metascore: '10'}];
  }

  setSearchResults($event): void {
    if (!this.searchResults){
      this.searchResults = [];
    }
    this.searchResults.push($event);
  }

  addNominations($event): void {
    if (this.nominationsList.length >= 5){
      console.log('La liste est pleine!');
      return;
    }
    if (this.nominationsList.find(x => x === $event)){
      console.log('le film est déjà dans la liste');
      return;
    }
    this.nominationsList.push($event);
  }

  removeNominations($event): void {
    this.nominationsList = this.nominationsList.filter(movie => movie.Title !== $event.Title);
  }

}
