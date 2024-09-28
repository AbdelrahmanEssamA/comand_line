import { insert, getDB, saveDb } from "./db.js";

export const createNewNote = async (note, tags) => {
  const data = {
    tags,
    content: note,
    id: Date.now(),
  };
  await insert(data);
  return data;
};

export const getAllNotes = async () => {
  const db = await getDB();
  return db;
};

export const findNotes = async (filter) => {
  const { notes } = await getAllNotes();
  const match = notes.filter((note) => note.content.includes(filter));
  return match;
};

export const removeNote = async (id) => {
  const { notes } = await getAllNotes();
  const match = notes.find((note) => note.id === id);
  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDb({ notes: newNotes });
    return id;
  }
};

export const removeAllNotes = async () => {
  await saveDb({ notes: [] });
  return "all notes removed";
};
