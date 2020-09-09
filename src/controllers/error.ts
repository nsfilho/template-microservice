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
import { uniqueExecution } from '@nsfilho/unique';
import { Request, Response, NextFunction } from 'express';
import { assertExchange, publish } from '@nsfilho/rabbitmq';
import { genericSingleError } from '../components/generic';
import { EventsType } from '../constants';

const errorHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!res.finished) {
        genericSingleError({
            res,
            httpCode: 404,
            message: 'page not found',
        });
        await publish({
            exchange: EventsType.EXPRESS,
            routingKey: 'error.404',
            payload: {
                code: 404,
                path: req.path,
                ip: req.ip,
                method: req.method,
                hostname: process.env.hostname,
                query: req.query,
                body: req.body,
            },
        });
        next();
    }
};

uniqueExecution({
    name: __filename,
    callback: async () => {
        assertExchange({
            name: EventsType.EXPRESS,
            type: 'headers',
            advanced: {
                durable: true,
                autoDelete: false,
            },
        });
    },
});

export default errorHandler;
