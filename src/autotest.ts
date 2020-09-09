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
/* eslint-disable no-console */
import axios from 'axios';

const PORT = process.env.PORT || 4000;

axios(`http://127.0.0.1:${PORT}/status`)
    .then((result) => {
        if (result.status === 200) {
            process.exit(0);
        }
        console.error('Test failed:', result.status);
        process.exit(1);
    })
    .catch((error) => {
        console.error('General Error:', error);
        process.exit(1);
    });
