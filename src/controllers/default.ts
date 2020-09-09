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
import express, { Response, Request, Router } from 'express';
import dayjs from 'dayjs';
import { uniqueExecution } from '@nsfilho/unique';
import { assertExchange, publish } from '@nsfilho/rabbitmq';
import debug from '../middlewares/debug';
import { VERSION, EventsType } from '../constants';

/**
 * Basics presentation from API
 * @param req express request
 * @param res express response
 */
const index = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
        build: VERSION,
        time: dayjs().toISOString(),
        hostname: process.env.HOST,
    });
    await publish({
        exchange: EventsType.EXPRESS,
        routingKey: 'default.index',
        payload: {
            code: 200,
            path: req.path,
            ip: req.ip,
            method: req.method,
            hostname: process.env.hostname,
            query: req.query,
            body: req.body,
        },
    });
};

const routes = (): Router => {
    const myRoutes = express.Router();
    myRoutes.get('/', debug, index);
    myRoutes.get('/status', debug, index);
    return myRoutes;
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

export default routes;
