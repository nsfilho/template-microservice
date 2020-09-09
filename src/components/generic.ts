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
import { Response } from 'express';
import logger from '../services/logger';
import { APIResponseType } from '../types';

export interface GenericSingleErrorOptions {
    /** You need inform the express response parameter */
    res: Response;
    /** HTTP Status Code: 401, 500, ... */
    httpCode: number;
    /** Message of you want to describe as an error */
    message: string;
    /** Extra components */
    extra?: Record<string, unknown>;
}

/**
 * Generate a single error as API protocol
 * @param options options for generate error message properly
 */
export const genericSingleError = (options: GenericSingleErrorOptions): void => {
    const { res, httpCode, message, extra } = options;
    if (res.finished) {
        logger.error('You called genericSingleError for a finished answer in express', {
            label: '@components/generic',
            message,
            httpCode,
        });
    } else {
        logger.warn(message, {
            label: '@components/generic',
            httpCode,
            extra,
        });
        res.status(httpCode).json({
            status: APIResponseType.error,
            errors: [{ message, extra }],
        });
    }
};
