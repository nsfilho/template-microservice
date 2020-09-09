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
import { join } from 'path';
import { uniqueExecution } from '@nsfilho/unique';
import { startMigration } from '@nsfilho/migration';
import { lockResource } from '@nsfilho/redis-locker';
import mongoose from 'mongoose';
import { MONGO_URL } from '../../constants';
import logger from '../logger';

uniqueExecution({
    name: __filename,
    callback: async () => {
        /** Conexão com o MongoDB */
        await lockResource({
            resourceName: __filename,
            callback: async () => {
                await startMigration({
                    migrationPath: join(__dirname, '..', '..', '..', 'migrations'),
                });
            },
        });

        mongoose.set('useCreateIndex', true);
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            autoIndex: true,
            keepAlive: true,
        });
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            logger.info('Mongoose connected', { label: '@services/mongo' });
        });

        mongoose.connection.on('error', (data) => {
            logger.error('Mongoose error.', { label: '@services/mongo', others: data });
            process.exit(-1);
        });

        mongoose.connection.on('disconnected', () => {
            logger.error('Mongoose disconnected.', { label: '@services/mongo' });
            process.exit(-1);
        });
    },
    advanced: {
        blockExecution: true,
        delay: 0,
        priority: 0,
    },
});
