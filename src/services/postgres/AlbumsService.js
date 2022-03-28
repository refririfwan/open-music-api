/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { Pool } = require('pg');

class AlbumsServices {
  constructor() {
    this._pool = new Pool();
  }

  addAlbum({ name, year }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newAlbum = {
      name, year, id, createdAt, updatedAt,
    };

    this._albums.push(newAlbum);

    const isSuccess = this._albums.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Album fail to added');
    }

    return id;
  }

  getAlbumById(id) {
    const album = this._albums.filter((n) => n.id === id)[0];
    if (!album) {
      throw new NotFoundError('Album not found');
    }
    return album;
  }

  editAlbumById(id, { name, year }) {
    const index = this._albums.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Failed update album. Id not found');
    }

    const updatedAt = new Date().toISOString();

    this._albums[index] = {
      ...this._albums[index],
      name,
      year,
      updatedAt,
    };
  }

  deleteAlbumById(id) {
    const index = this._albums.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotFoundError('Album failed to delete. Id not found');
    }
    this._albums.splice(index, 1);
  }
}

module.exports = AlbumsServices;
