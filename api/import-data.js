const fs = require('fs');
const path = require('path');
const through2 = require('through2');
const parseCsv = require('csv-parse');
const { omit } = require('lodash');

const app = require('./server/server');

const MOVIES_CSV_PATH = path.join(__dirname, './data/movies.csv');

async function upsertMovie(data) {
  const existingMovie = await app.models.Movie.findById(data.id);

  if (existingMovie) {
    return;
  }

  const movie = await app.models.Movie.create({
    did: data.id,
    title: data.title,
  });

  for (let name of data.genres) {
    let genre = await app.models.Genre.findOne({ where: { name } });

    if (!genre) {
      genre = await app.models.Genre.create({ name });
    }

    await movie.genres.add(genre);
  }

  console.log(movie.did, movie.id);
}

fs.createReadStream(MOVIES_CSV_PATH)
  .pipe(parseCsv({from: 2}))
  .pipe(through2.obj(function(chunk, enc, callback) {
    const movie = {
      id: chunk[0],
      title: chunk[1],
      genres: chunk[2].split('|'),
    };

    upsertMovie(movie).then(() => callback());
  }));

// fs.createReadStream(RATINGS_CSV_PATH)
//   .pipe(parseCsv({from: 2}))
//   .pipe(through2.obj(function(chunk, enc, callback) {
//     const movie = {
//       id: chunk[0],
//       title: chunk[1],
//       genres: chunk[2].split('|'),
//     };

//     upsertMovie(movie).then(() => callback());
//   }));
