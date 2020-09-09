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
import { MigrationParameters, LogLevel } from '@nsfilho/migration';

export const up = async ({ collections, log }: MigrationParameters): Promise<void> => {
    // sample 1: find a registry in a collection and forEach
    const content = await collections.migration.find();
    content.forEach((v) => {
        log({ message: `Record: ${JSON.stringify(v, null, 4)}`, level: LogLevel.normal });
    });
};
