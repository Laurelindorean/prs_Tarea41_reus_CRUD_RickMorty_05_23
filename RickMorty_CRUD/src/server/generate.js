const fs = require('fs');
const { faker } = require('@faker-js/faker');

var database = {characters:[]};
for(var i = 1; i<=50;i++){
  database.characters.push({
    id: i,
    name: faker.person.fullName(),
    status: Math.random() < 0.5 ? "alive" : "dead",
    species: Math.random() < 0.5 ? "human" : faker.animal.type(),
    gender: faker.person.gender(),
    origin: faker.location.country(),
    image: `https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * (826)) + 1}.jpeg`
  });
}

const jsonData = JSON.stringify(database);

// Escribir los datos en un archivo
fs.writeFile('database.json', jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error al escribir el archivo:', err);
    return;
  }
  console.log('Archivo generado exitosamente: database.json');
});
