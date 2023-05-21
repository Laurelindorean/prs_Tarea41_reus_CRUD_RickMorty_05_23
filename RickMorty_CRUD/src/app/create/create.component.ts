import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../service/character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  title = 'Create a new Character';
  character = {
    name: '',
    status: '',
    species: '',
    gender: '',
    origin: '',
    image: ``,
  };
  isCharacterAdded = false;

  constructor(private characterService: CharacterService, private router:Router) {}

  ngOnInit(): void {}

  addCharacter(): void {
    const data = {
      name: this.character.name,
      status: this.character.status,
      species: this.character.species,
      gender: this.character.gender,
      origin: this.character.origin,
      image: `https://rickandmortyapi.com/api/character/avatar/${this.character.image}.jpeg`,
    };
    if (!data.name) {
      alert('Please add a name');
      return;
    }
    this.characterService.create(data).subscribe(
      (response) => {
        this.isCharacterAdded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newCharacter(): void {
    this.isCharacterAdded = false;
    this.character = {
      name: '',
      status: '',
      species: '',
      gender: '',
      origin: '',
      image: '',
    };
  }

  return() {
    this.router.navigate(['/characters']);
  }
}
