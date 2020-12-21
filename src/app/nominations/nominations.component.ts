import { Component, OnInit } from '@angular/core';
import { Result } from '../movie/result';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.scss']
})
export class NominationsComponent implements OnInit {

  constructor() { }
  searchResults: Result[];
  nominationsList: Result[];

  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 3, color: 'lightgreen'},
    {text: 'Three', cols: 2, rows: 2, color: 'lightpink'},

  ];

  ngOnInit(): void {
    this.nominationsList = [{Title: 'allo', Year: 'mon coco', Metascore: '10'}];
  }

  setSearchResults($event): void {
    if (!this.searchResults){
      this.searchResults = [];
    }
    this.searchResults = $event.Search;
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
