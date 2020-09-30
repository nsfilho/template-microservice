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
import { NextFunction, Request, Response } from 'express';
import { uniqueExecution } from '@nsfilho/unique';
import { publish, assertExchange } from '@nsfilho/rabbitmq';
import logger from '../services/logger';
import { EventsType } from '../constants';

/**
 * Middleware to log some request parameters during development phase.
 */
export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.debug(`Request: ${req.path}`, {
        query: req.query,
        body: req.body,
        headers: req.headers,
        label: '@middlewares/debug',
    });
    await publish({
        exchange: EventsType.EXPRESS,
        routingKey: 'middlewares.debug',
        payload: {
            path: req.path,
            ip: req.ip,
            method: req.method,
            hostname: process.env.hostname,
            query: req.query,
            body: req.body,
        },
    });
    next();
};

uniqueExecution({
    name: __filename,
    callback: async () => {
        assertExchange({
            name: EventsType.EXPRESS,
            type: 'direct',
            advanced: {
                durable: true,
                autoDelete: false,
            },
        });
    },
});
