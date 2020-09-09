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
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { publish, assertExchange } from '@nsfilho/rabbitmq';
import { uniqueExecution } from '@nsfilho/unique';
import { APP_JWT_SECRETKEY, EventsType } from '../constants';
import { genericSingleError } from '../components/generic';

/**
 * JwtToken decoded info
 */
export interface JwtDecoded {
    /** Type of user logged */
    type: 'self';
    /** mongo record id */
    id: string;
    /** profile name */
    name: string;
    /** jwt iat */
    iat: number;
    /** jwt expiration */
    exp: number;
}

/**
 * Interface for aggregate to express.Request
 */
export interface RequestJwt {
    /** JWT Token Info */
    jwt: {
        /** User data received inside JWT Token */
        decoded: JwtDecoded;
        /** Raw Token */
        token: string;
        /** Is a valid login? */
        valid: boolean;
    };
}

/**
 * Do a basic decoding of token without validate their expires or sign key.
 * @param token jwt token
 */
export const decode = (token: string): JwtDecoded => {
    return jwt.decode(token) as JwtDecoded;
};

/**
 * Validate if the header token is valid or not (including expire)
 */
export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.headers.authorization) {
        const [, token] = req.headers.authorization.split(' ');
        try {
            const reqJwt = req as Request & RequestJwt;
            const decoded = jwt.verify(token, APP_JWT_SECRETKEY) as JwtDecoded;
            reqJwt.jwt.decoded = decoded;
            reqJwt.jwt.token = token;
            reqJwt.jwt.valid = true;
            next();
        } catch (err) {
            await publish({
                exchange: EventsType.AUTH,
                routingKey: 'auth.failed',
                payload: {
                    token,
                    path: req.path,
                    method: req.method,
                    query: req.query,
                    body: req.body,
                    ip: req.ip,
                    valid: false,
                },
            });
            genericSingleError({
                res,
                httpCode: 401,
                message: 'invalid user token!',
            });
        }
    } else {
        await publish({
            exchange: EventsType.AUTH,
            routingKey: 'auth.wrongcall',
            payload: {
                path: req.path,
                method: req.method,
                query: req.query,
                body: req.body,
                ip: req.ip,
                valid: false,
            },
        });
        genericSingleError({
            res,
            httpCode: 401,
            message: 'you must inform a valid user token',
        });
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
