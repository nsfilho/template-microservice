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
/* eslint-disable camelcase */
import * as Sentry from '@sentry/node';
import { Request, Response, NextFunction } from 'express';
import { uniqueExecution } from '@nsfilho/unique';
import { SENTRY_DSN } from '../../constants';
import logger from '../logger';

/** this definition was copy from sentry */
interface MiddlewareError extends Error {
    status?: number | string;
    statusCode?: number | string;
    status_code?: number | string;
    output?: {
        statusCode?: number | string;
    };
}

type ExpressMiddlewareFunctionWithError = (
    error: MiddlewareError,
    req: Request,
    res: Response,
    next: NextFunction,
) => void;
type ExpressMiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

/**
 * Wrapper for error capture
 */
export const sentryErrorCapture = (): ExpressMiddlewareFunction => {
    if (SENTRY_DSN) return Sentry.Handlers.requestHandler();
    return (req: Request, res: Response, next: NextFunction) => next();
};

/**
 * Wrapper for error capture
 */
export const sentryErrorHandler = (): ExpressMiddlewareFunctionWithError => {
    if (SENTRY_DSN) return Sentry.Handlers.errorHandler();
    return (error: MiddlewareError, req: Request, res: Response, next: NextFunction) => next();
};

uniqueExecution({
    name: __filename,
    callback: async () => {
        if (SENTRY_DSN) {
            logger.info('Initializing sentry dsn...', {
                label: '@services/sentry',
            });
            Sentry.init({
                dsn: SENTRY_DSN,
            });
        }
    },
});
