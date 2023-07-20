import { Request, Response } from 'express';

export const DEFAULT_PAGE_VALUE = 1;

export const DEFAULT_NOTES_LIMIT_VALUE = 10;

export const SKIP_STEP = 1;

export const NOTE_VALIDATION_SCHEMA = {
  TITLE: { MIN_LENGTH: 3 },
  CONTENT: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 500,
  },
};

export const USER_VALIDATION_SCHEMA = {
  FIRST_NAME: { MIN_LENGTH: 2 },
  LAST_NAME: { MIN_LENGTH: 2 },
  EMAIL: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 32,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 32,
  },
};

export const EMPTY_ARRAY: [] = [];
export const EMPTY_STRING = '';

export const NOT_FOUND_MESSAGE = {
  NOTES: 'Notes not found.',
  NOTE: 'Note not found.',
  USERS: 'Users not found.',
  USER: 'User not found.',
};

export const GREETING_TEXT = (name: string): string => `Hello, ${name}!`;

export const SUCCESS_DELETE_TEXT = (id: string) => ({
  success: true,
  id: id,
});

export const LOGGER_MESSAGE = (req: Request, res: Response) =>
  `Request ${req.method} ${req.originalUrl}, Status Code - ${res.statusCode}` +
  (res.statusMessage ? `: ${res.statusMessage}.` : '.');
