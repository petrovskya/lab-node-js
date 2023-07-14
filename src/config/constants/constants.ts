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

export const EMPTY_ARRAY: [] = [];

export const NOT_FOUND_MESSAGE = {
  NOTES: 'Notes not found.',
  NOTE: 'Note not found.',
};

export const GREETING_TEXT = (name: string): string => `Hello, ${name}!`;

export const SUCCESS_DELETE_TEXT = (id: string) => ({
  success: true,
  id: id,
});

export const LOGGER_MESSAGE = (req: Request, res: Response) =>
  `Request ${req.method} ${req.originalUrl}, Status Code - ${res.statusCode}` +
  (res.statusMessage ? `: ${res.statusMessage}.` : '.');
