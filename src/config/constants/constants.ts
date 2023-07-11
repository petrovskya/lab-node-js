import { Request, Response } from 'express';

export const TITLE_MIN_LENGTH = 3;

export const NOTE_VALIDATION_SCHEMA = {
  TITLE: { MIN_LENGTH: 3 },
  CONTENT: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 500,
  },
};

export const EMPTY_ARRAY: [] = [];

export const GREETING_TEXT = (name: string): string => `Hello, ${name}!`;

export const SUCCESS_DELETE_TEXT = (id: string) => ({
  success: true,
  id: id,
});

export const LOGGER_MESSAGE = (req: Request, res: Response) =>
  `Request ${req.method} ${req.url}, Status Code - ${res.statusCode}` +
  (res.statusMessage ? `: ${res.statusMessage}.` : '.');
