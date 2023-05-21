import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../service/character.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.css'],
})
export class CharactersDetailsComponent implements OnInit {
  title: string = 'Character Details';

  character: any;
  message = '';

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCharacter(this.route.snapshot.paramMap.get('id'));
  }
  getCharacter(id: string | null): void {
    this.characterService.getItem(id).subscribe(
      (character: null) => {
        this.character = character;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setAvailableStatus(status: any): void {
    const data = {
      name: this.character.name,
      status: this.character.status,
      species: this.character.species,
      gender: this.character.gender,
      origin: this.character.origin.name,
    };
    this.characterService.update(this.character.id, data).subscribe(
      (response) => {
        this.character.available = status;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCharacter():void{
    this.characterService.update(this.character.id, this.character).subscribe(
      response=>{
        console.log(response);
        this.message = 'The character has been updated';
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCharacter(): void{
    this.characterService.delete(this.character.id).subscribe(
      response=>{
        this.router.navigate(['/characters']);
      },
      error => {
        console.log(error);
      }
    );
  }

  return() {
    this.router.navigate(['/characters']);
  }
}
