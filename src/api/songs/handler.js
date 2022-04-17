/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {
        title = 'untitled', performer, year, genre, duration, albumid,
      } = request.payload;

      const { id: credentialId } = request.auth.credentials;

      const songId = await this._service.addSong({
        title, performer, year, genre, duration, albumid, owner: credentialId,
      });

      const response = h.response({
        status: 'success',
        message: 'Song success added',
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, Internal Server Error.',
      });
      response.code(500);
      // eslint-disable-next-line no-console
      console.error(error);
      return response;
    }
  }

  async getSongsHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const songs = await this._service.getSongs(credentialId);
      return {
        status: 'success',
        data: {
          songs: songs.map((song) => ({
            id: song.id,
            title: song.title,
            performer: song.performer,
          })),
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, Internal Server Error.',
      });
      response.code(500);
      // eslint-disable-next-line no-console
      console.error(error);
      return response;
    }
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;
      await this._service.verifySongOwner(id, credentialId);
      const song = await this._service.getSongById(id);
      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, Internal Server Error.',
      });
      response.code(500);
      // eslint-disable-next-line no-console
      console.error(error);
      return response;
    }
  }

  async putSongByIdHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const { id } = request.params;

      const { id: credentialId } = request.auth.credentials;
      await this._service.verifySongOwner(id, credentialId);

      await this._service.editSongById(id, request.payload);

      return {
        status: 'success',
        message: 'Song has been updated',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, Internal Server Error.',
      });
      response.code(500);
      // eslint-disable-next-line no-console
      console.error(error);
      return response;
    }
  }

  async deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;
      await this._service.verifySongOwner(id, credentialId);
      await this._service.deleteSongById(id);
      return {
        status: 'success',
        message: 'Song has been deleted',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, Internal Server Error.',
      });
      response.code(500);
      // eslint-disable-next-line no-console
      console.error(error);
      return response;
    }
  }
}

module.exports = SongsHandler;
