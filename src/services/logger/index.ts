/**
 * Copyright (C) 2020 E01-AIO Automação Ltda.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Nelio Santos <nsfilho@icloud.com>
 * 
 */
import winston from 'winston';
import { ENVIRONMENT, LOGGER_MINIMAL_LEVEL } from '../../constants';

const emptyObject = (o: { [index: string]: unknown }) => Object.keys(o).length === 0;

/**
 * Format a message to logger
 */
const logFormat = winston.format.printf(
    ({ timestamp, label, level, message, ...others }) =>
        `${timestamp} [${label || 'general'}] ${level}: ${message}${
            emptyObject(others) ? '' : ` ${JSON.stringify(others, null, 4)}`
        }`,
);

/**
 * System Logger with multi-level
 */
const logger = winston.createLogger({
    level: ENVIRONMENT === 'production' ? 'info' : LOGGER_MINIMAL_LEVEL,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        logFormat,
    ),
    transports: [new winston.transports.Console({ handleExceptions: true })],
});

export default logger;
