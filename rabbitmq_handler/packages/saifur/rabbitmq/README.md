# Saifur-RabbitMQ
A dynamic File Manager

<!-- <a href="https://packagist.org/packages/saifur/filemanager"><img src="https://img.shields.io/packagist/dt/saifur/filemanager" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/saifur/filemanager"><img src="https://img.shields.io/packagist/v/saifur/filemanager" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/saifur/filemanager"><img src="https://img.shields.io/packagist/l/saifur/filemanager" alt="License"></a> -->

## Contents
- [Saifur-RabbitMQ](#saifur-rabbitmq)
  - [Contents](#contents)
  - [Design Patterns](#design-patterns)
  - [Features](#features)
    - [Publish](#publish)
  - [Documentation, Installation, and Usage Instructions](#documentation-installation-and-usage-instructions)
    - [Laravel Commands](#laravel-commands)
      - [config/app.php](#configappphp)
      - [Main Project composer.json](#main-project-composerjson)
      - [In main project app/Exceptions/Handler.php](#in-main-project-appexceptionshandlerphp)
    - [DB Change](#db-change)
    - [Routes](#routes)
  - [Contributor](#contributor)
  - [Alternatives](#alternatives)
  - [License](#license)

## Design Patterns
- Factory Design Pattern


## Features
- Publish messages to the queue
- Consume messages from the queue

### Publish


## Documentation, Installation, and Usage Instructions
This package is all about rabbitmq basic flows & usage of rabbitmq in laravel.

Once installed you can do stuff like this:


### Laravel Commands
<!-- https://unisharp.github.io/laravel-rabbitmq/installation -->

```
composer require saifur/rabbitmq
php artisan vendor:publish --tag=public --force
php artisan vendor:publish --tag=config --force
php artisan storage:link
composer dump-autoload
```

#### config/app.php
```
'providers' => [
        Saifur\RabbitMQ\SaifurRabbitMQServiceProvider::class,
    ],
```

#### Main Project composer.json
```
"autoload": {
        "psr-4": {
            "Saifur\\RabbitMQ\\": "packages/saifur/rabbitmq/src"
        },
    },
```

#### In main project app/Exceptions/Handler.php
```
<?php

namespace App\Exceptions;
use Throwable;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Saifur\RabbitMQ\app\Facades\Helpers\SRMQCommonFacade;
use Illuminate\Http\Response;
use Illuminate\Http\Exceptions\HttpResponseException;


class Handler extends ExceptionHandler
{
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    public function render($request, Throwable $e)
    {
        if (\config('app.debug'))
        {
            return parent::render($request, $e);
        }
        $status = Response::HTTP_INTERNAL_SERVER_ERROR;

        [$status, $e, $message] = SRMQCommonFacade::srmq_custom_exceptions($e);  // Saifur RabbitMQ Package Exceptions

        if ($e instanceof HttpResponseException)
        {
            $status = Response::HTTP_INTERNAL_SERVER_ERROR;
        }
        elseif ($e)
        {
            $e = new HttpException($status, $message ?? 'Internal Server Error!');
        }

        return $this->set_response(null, $status, 'error', [$e->getMessage()]);
    }
}

```



### DB Change


### Routes
- in ```config/srmq.php``` configuration file ```use_package_routes = true``` to use the package routes


## Contributor

- Md. Saifur Rahman


|[![Portfolio](https://img.shields.io/badge/Portfolio-%23009639.svg?style=for-the-badge&logo=Hyperledger&logoColor=white)](https://saifurrahman.my.canva.site) | [![CV](https://img.shields.io/badge/CV-%23009639.svg?style=for-the-badge&logo=DocuSign&logoColor=white)](https://docs.google.com/document/d/1txBCiMjPqH7GR8FDMQMAw09vemsB-nJb/edit?usp=sharing&ouid=113622980255867007734&rtpof=true&sd=true) | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/saifurrahman1193/) | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/saifurrahman1193/saifurrahman1193) | [![Stack Overflow](https://img.shields.io/badge/-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)](https://stackoverflow.com/users/14350717/md-saifur-rahman) | 
|-|-|-|-|-|
| [![Hackerrank](https://img.shields.io/badge/-Hackerrank-2EC866?style=for-the-badge&logo=HackerRank&logoColor=white)](https://www.hackerrank.com/saifur_rahman111) | [![Beecrowd](https://img.shields.io/badge/Beecrowd-%23009639.svg?style=for-the-badge&logo=Bugcrowd&logoColor=white)](https://www.beecrowd.com.br/judge/en/profile/18847) | [![LeetCode](https://img.shields.io/badge/LeetCode-000000?style=for-the-badge&logo=LeetCode&logoColor=#d16c06)](https://leetcode.com/saifurrahman1193) | [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/playlist?list=PLwJWgDKTF5-xdQttKl7cRx8Yhukv7Ilmg)| |

## Alternatives
- https://github.com/UniSharp/laravel-filemanager
- https://github.com/alexusmai/laravel-file-manager
- https://github.com/mafftor/laravel-file-manager
- https://github.com/yesteamtech/laravel-file-manager
- https://github.com/rudiedirkx/laravel-file-manager
- https://github.com/Binay7587/laravel-filemanager

## License
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
