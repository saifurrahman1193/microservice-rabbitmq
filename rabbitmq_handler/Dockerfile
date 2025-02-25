FROM php:7.4.29-fpm

WORKDIR /app
COPY . .

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# RUN apt-get update && apt-get install -y telnet

RUN docker-php-ext-install pdo pdo_mysql sockets

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# RUN rm -rf vendor composer.lock

# RUN composer update
RUN composer install --ignore-platform-reqs
RUN php artisan config:clear
RUN php artisan cache:clear
# RUN composer install

COPY .env.example .env

RUN php artisan cache:clear

EXPOSE 9000
CMD ["php-fpm"]
