<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit6b95aee33d3dc1de44de98ec230a8884
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Saifur\\LogViewer\\' => 17,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Saifur\\LogViewer\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit6b95aee33d3dc1de44de98ec230a8884::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit6b95aee33d3dc1de44de98ec230a8884::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit6b95aee33d3dc1de44de98ec230a8884::$classMap;

        }, null, ClassLoader::class);
    }
}