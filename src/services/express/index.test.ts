/* eslint-disable import/no-extraneous-dependencies */
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
import request from 'supertest';
import { disconnect } from '@nsfilho/redis-connection';
import app from '.';

describe('Minimum express tests', () => {
    it('With index', (done) => {
        request(app).get('/').expect(200, done);
    });
    it('Assets: inexistent', (done) => {
        request(app).get('/assets/notfound.pkg').expect(404, done);
    });
    afterAll(async () => {
        await disconnect();
    });
});
