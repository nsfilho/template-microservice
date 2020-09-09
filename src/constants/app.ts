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

/** system definitions */
export const VERSION = process.env.VERSION || 'v0.0.0';
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
export const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';
export const LOGGER_MINIMAL_LEVEL = process.env.LOGGER_MINIMAL_LEVEL || 'silly';

/** environment setup */
export const APP_API_URL = process.env.APP_API || 'https://api.domain.com.br';
export const APP_SITE_URL = process.env.APP_SITE || 'https://domain.com.br';
export const APP_JWT_SECRETKEY = process.env.APP_JWT_SECRETKEY || 'myjwtsupersecretkey';
