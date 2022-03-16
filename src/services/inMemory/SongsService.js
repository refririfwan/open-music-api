/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._songs = [];
  }

  addSong({
    title, performer, year, genre, duration, albumId,
  }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newSong = {
      id, title, performer, year, genre, duration, albumId, updatedAt,
    };

    this._songs.push(newSong);

    const isSuccess = this._songs.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Album fail to added');
    }

    return id;
  }

  getSongs() {
    return this._songs;
  }

  getSongById(id) {
    const song = this._songs.filter((n) => n.id === id)[0];
    if (!song) {
      throw new NotFoundError('Song not found');
    }
    return song;
  }

  editSongById(id, {
    title, performer, year, genre, duration, albumId,
  }) {
    const index = this._songs.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Failed update song. Id not found');
    }

    const updatedAt = new Date().toISOString();

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
      updatedAt,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotFoundError('Song failed to delete. Id not found');
    }
    this._songs.splice(index, 1);
  }
}

module.exports = SongsService;
