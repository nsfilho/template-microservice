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
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { join } from 'path';
import routeDefault from '../../controllers/default';
import routeError from '../../controllers/error';
import { sentryErrorHandler, sentryErrorCapture } from '../sentry';

const app = express();

app.use(sentryErrorCapture());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/assets', express.static(join(__dirname, '..', '..', 'assets')));
app.use('/', routeDefault());
app.use(sentryErrorHandler());
app.use(routeError);

export default app;
