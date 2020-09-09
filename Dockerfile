#
# Copyright (C) 2020 E01-AIO Automação Ltda.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Author: Nelio Santos <nsfilho@icloud.com>
#
FROM node:14

WORKDIR /app
EXPOSE 4000

COPY node_modules /app/node_modules/
COPY package*.json /app/
COPY docs /docs/
COPY build /app/
COPY autotest.js /app/

CMD ["yarn", "start"]