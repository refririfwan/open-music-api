const { nanoid } = require('nanoid');
const albums = require('./albums');
const songs = require('./songs');

const addAlbumHandler = (request, h) => {
  const { name = 'unnamed', year } = request.payload;

  const hash = nanoid(16);
  const id = `album-${hash}`;
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newAlbum = {
    name, year, id, createdAt, updateAt,
  };

  albums.push(newAlbum);

  const isSuccess = albums.filter((album) => album.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Album has been Added',
      data: {
        albumId: id,
      },
    });
    response.code(201);
    return response;
  }

  return 'Failed to Adding Album';
};

const getAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const album = albums.filter((n) => n.id === id)[0];

  if (album !== undefined) {
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Album not found',
  });
  response.code(404);
  return response;
};

const editAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const { name, year } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = albums.findIndex((album) => album.id === id);

  if (index !== -1) {
    albums[index] = {
      ...albums[index],
      name,
      year,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Album has been updated',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to update album. Id not found',
  });
  response.code(404);
  return response;
};

const deleteAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = albums.findIndex((album) => album.id === id);

  if (index !== -1) {
    albums.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Album has been deleted',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Album failed to delete. Id not found',
  });
  response.code(404);
  return response;
};

const addSongHandler = (request, h) => {
  const {
    title = 'untitled', performer, year, genre, duration, albumId,
  } = request.payload;

  const hash = nanoid(16);
  const id = `song-${hash}`;
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newSong = {
    title, performer, year, genre, duration, id, albumId, createdAt, updateAt,
  };

  songs.push(newSong);

  const isSuccess = songs.filter((song) => song.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Song has been Added',
      data: {
        albumId: id,
      },
    });
    response.code(201);
    return response;
  }

  return 'Failed to Adding Song';
};

const getAllSongs = () => ({
  status: 'success',
  data: {
    songs,
  },
});

const getSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const song = songs.filter((n) => n.id === id)[0];

  if (song !== undefined) {
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Song not found',
  });
  response.code(404);
  return response;
};

const editSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    title = 'untitled', performer, year, genre, duration, albumId,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    songs[index] = {
      ...songs[index],
      performer,
      title,
      year,
      genre,
      duration,
      albumId,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Song has been updated',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to update song. Id not found',
  });
  response.code(404);
  return response;
};

const deleteSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    songs.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Song has been deleted',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Song failed to delete. Id not found',
  });
  response.code(404);
  return response;
};

module.exports = {
  addAlbumHandler,
  getAlbumByIdHandler,
  editAlbumByIdHandler,
  deleteAlbumByIdHandler,
  addSongHandler,
  getAllSongs,
  getSongByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
};
