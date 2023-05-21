import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../service/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  title: string = 'Characters';
  characters: any[] = [];

  constructor(
    private router: Router,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.list().subscribe(
      (characters: any) => {
        this.characters = characters;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  seeMore(id: number) {
    this.router.navigate(['/characters', id]);
  }

  delete(id: number) {
    this.characterService.delete(id).subscribe(
      response=>{
        this.getCharacters();
      },
      error => {
        console.log(error);
      }
    );
  }
}
