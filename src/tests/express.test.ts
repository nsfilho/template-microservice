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
/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express';

export interface MockResponse {
    status: Function;
    json: Function;
}

/**
 * Mockup a empty response.
 */
export const mockResponse = (): Response => {
    const res: Record<string, unknown> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return (res as unknown) as Response;
};

/**
 * Mockup request based on `data` received object.
 * @param data request data
 */
export const mockRequest = (data: Record<string, unknown>): Request => {
    return (data as unknown) as Request;
};
