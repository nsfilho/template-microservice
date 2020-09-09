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

/**
 * Determinate API Response type
 */
// eslint-disable-next-line no-shadow
export enum APIResponseType {
    successful = 'successful',
    error = 'error',
}

/**
 * API Response with Successful
 */
export interface APIResponseSuccessful<T> {
    status: typeof APIResponseType.successful;
    data: T | T[];
}

/**
 * API Response with Error
 */
export interface APIResponseError {
    status: typeof APIResponseType.error;
    errors: {
        message: string;
        extra: Record<string, unknown>;
    }[];
}

export type APIResponse<T = unknown> = APIResponseSuccessful<T> | APIResponseError;
