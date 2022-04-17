/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { Pool } = require('pg');
const { mapDBToModel } = require('../../utils/mapDBToModelSongs');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, performer, year, genre, duration, albumId, owner }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      values: [id, albumId, title, year, genre, performer, duration, createdAt, updatedAt, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Song fail to added');
    }

    return result.rows[0].id;
  }

  async getSongs(owner) {
    const query = {
      text: 'SELECT * FROM songs WHERE owner = $1',
      values: [owner],
    }

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Songs not found');
    }

    return result.rows.map(mapDBToModel);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song not found');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editSongById(id, { title, performer, year, genre, duration, albumId, }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, albumId = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed update song. Id not found');
    }

  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song fail to delete. Id not found');
    }
  }

  async verifySongOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Songs not found');
    }
    const note = result.rows[0];
    if (note.owner !== owner) {
      throw new AuthorizationError('You not have permitted to access this resource');
    }
  }
}

module.exports = SongsService;
