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
import { Server } from 'http';
import { PORT } from './constants';

/**
 * The import order is important! BE CAREFUL!
 */
import logger from './services/logger';
import app from './services/express';
import './services/mongo';

/**
 * Start express changing dynamically the port number (if its need).
 * Reason for that: if you are using jest, sometimes your application is running.
 * @param port Port do listen connections
 */
export const startServer = (port = PORT): Promise<Server> =>
    new Promise((resolve) => {
        const localServer = app
            .listen(port, () => {
                // Server started and ready!
                logger.info(`Server initialized, http://0.0.0.0:${port}`);
                resolve(localServer);
            })
            .on('error', () => {
                // Problems to initialize server
                resolve(startServer(port + 1));
            });
    });

/**
 * Http Server Context
 */
export const server = startServer();
