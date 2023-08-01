FROM php:7.4.29-fpm

RUN apt-get update && apt-get install -y telnet

RUN docker-php-ext-install pdo pdo_mysql sockets
RUN curl -sS https://getcomposer.org/installer | php -- \
     --install-dir=/usr/local/bin --filename=composer


WORKDIR /app
COPY . .
RUN composer install
