<?php
namespace Saifur\RabbitMQ\app\Modules\Directory;

use Illuminate\Support\Facades\File;
use Saifur\RabbitMQ\app\Facades\Helpers\SRMQCommonFacade;
use Saifur\RabbitMQ\app\Exceptions\DirectoryNotFoundException;

class LocalDirectory implements DirectoryManager
{
    // ****************************************************************
    // * Get Files & Derectors
    // ****************************************************************
    public function getFiles($params = [])
    {
        $path = $params['path'] ?? '';
        $path = SRMQCommonFacade::pathCleaning(['path' => $path]);
        $dir = SRMQCommonFacade::getRootPathLocal().$path;

        if(!file_exists($dir))
        {
            throw new DirectoryNotFoundException($params);
        }

        $files = array_values(array_diff(scandir($dir), ['.', '..']));
        return $files;
    }



    // ****************************************************************
    // * Get Files & Derectors
    // * Get Details of Files
    // ****************************************************************
    public function getFilesWithDetails($params = [])
    {
        $file_path = $params['path'] ?? '';
        $dir = SRMQCommonFacade::getRootPathLocal().$file_path;

        if(!file_exists($dir))
        {
            throw new DirectoryNotFoundException($params);
        }

        $files = array_values(array_diff(scandir($dir), ['.', '..']));

        $formatted_files = [];

        foreach ($files as $file){
            $full_path = $dir.'/'.$file;
            $formatted_files[] = [
                'file_name' => $file,
                'is_file' => is_file($full_path),
                'extension' => pathinfo($full_path, PATHINFO_EXTENSION),
                'file_path' => $full_path,
                'base_file_path' => $file_path,
                'file_size' => SRMQCommonFacade::convertDataSize(filesize($full_path)),
            ];
        }

        $formatted_files = collect($formatted_files);
        $formatted_files = $formatted_files->sortBy('is_file')->values();
        return $formatted_files;
    }

    // ****************************************************************
    // * Get Files & Derectors recursively
    // ****************************************************************
    public function getFilesRecursively($params = [])
    {
        $path = $params['path'] ?? '';
        $path = SRMQCommonFacade::pathCleaning(['path' => $path]);
        $dir = SRMQCommonFacade::getRootPathLocal().$path;

        $files = $this->loadFilesRecursively(['path' => $path]);
        return $files;
    }

    // ****************************************************************
    // * Get Files & Derectors recursively
    // * With Details Information
    // ****************************************************************
    public function getFilesRecursivelyWithDetails($params = [])
    {
        $path = $params['path'] ?? '';
        $path = SRMQCommonFacade::pathCleaning(['path' => $path]);
        $dir = SRMQCommonFacade::getRootPathLocal().$path;

        $files = $this->loadFilesRecursively(['path' => $path]);
        $files = array_map(function($file) {
                    return $this->getSpecificFileDetails(['path' => $file]);
                }, $files);

        return $files;
    }



    // ****************************************************************
    // * Create a directory
    // ****************************************************************
    public function createDirectory($params)
    {
        $path = $params['path'] ?? '';
        $chmod = $params['chmod'] ?? '0777';
        $path = SRMQCommonFacade::pathCleaning(['path' => $path]);
        $dir = SRMQCommonFacade::getRootPathLocal().$path;

        if (!file_exists($dir))
        {
            File::ensureDirectoryExists($dir);
        }

    }

    // ****************************************************************
    // * Delete source directory & files & directories inside of it recursively
    // ****************************************************************
    public function deleteDirectory($params)
    {
        $path = $params['path'] ?? '';
        $path = SRMQCommonFacade::pathCleaning(['path' => $path]);
        $dir = SRMQCommonFacade::getRootPathLocal().$path;

        if (!file_exists($dir))
        {
            throw new DirectoryNotFoundException($params);
        }

        if (!is_dir($dir)) {
            return;
        }

        $files = array_diff(scandir($dir), ['.', '..']);

        foreach ($files as $file) {
            $filePath = $dir . '/' . $file;

            if (is_dir($filePath)) {
                $filePath = $path . '/' . $file;  // this is not full path
                $this->deleteDirectory(['path' => $filePath]); // Recursively delete subdirectories
            } else {
                unlink($filePath); // Delete individual files
            }
        }

        rmdir($dir); // Finally, delete the empty directory
    }

    // ****************************************************************
    // * Rename a directory
    // ****************************************************************
    public function renameDirectory($params)
    {
        $path = $params['path'] ?? '';
        $new_name = $params['new_name'] ?? '';
        $new_name = str_replace(' ', '_', $new_name);
        $path = SRMQCommonFacade::pathCleaning(['path' => $path]);
        $dir = SRMQCommonFacade::getRootPathLocal().$path;

        if (!file_exists($dir))
        {
            throw new DirectoryNotFoundException($params);
        }

        if (!is_dir($dir)) {
            return;
        }

        $oldDirectoryName = $dir;
        $lastSlashPos = strrpos($dir, '/');
        $newDirectoryName = substr($dir, 0, $lastSlashPos + 1).$new_name;

        rename($oldDirectoryName, $newDirectoryName);
    }


    // ****************************************************************
    // * Copy files & directories to destination
    // ****************************************************************
    public function copyDirectory($params)
    {
        $source_directory = $params['source_directory'] ?? '';
        $source_directory_path = SRMQCommonFacade::pathCleaning(['path' => $source_directory]);
        $source_directory_full_path = SRMQCommonFacade::getRootPathLocal().$source_directory_path ;

        $destination_directory = $params['destination_directory'] ?? '';
        $destination_directory_path = SRMQCommonFacade::pathCleaning(['path' => $destination_directory]);
        $destination_directory_full_path = SRMQCommonFacade::getRootPathLocal().$destination_directory_path ;

        if (!file_exists($source_directory_full_path) )
        {
            throw new DirectoryNotFoundException(['message' => 'Invalid source directory!']);
        }

        // Create the destination directory if not exists
        if (!file_exists($destination_directory_full_path) )
        {
            mkdir($destination_directory_full_path);
        }

        $dirHandle = opendir($source_directory_full_path);

        while ($file = readdir($dirHandle)) {
            if ($file !== '.' && $file !== '..') {

                if (is_dir($source_directory_full_path . DIRECTORY_SEPARATOR . $file)) {  // Directory : passing only directory path not full path
                    $sourcePath = $source_directory_path . DIRECTORY_SEPARATOR . $file;
                    $destinationPath = $destination_directory_path . DIRECTORY_SEPARATOR . $file;
                    // If it's a subdirectory, recursively call the function to copy it
                    $this->copyDirectory(['source_directory' => $sourcePath, 'destination_directory' => $destinationPath]);
                } else {  // File
                    $sourcePath = $source_directory_full_path . DIRECTORY_SEPARATOR . $file;
                    $destinationPath = $destination_directory_full_path . DIRECTORY_SEPARATOR . $file;
                    // If it's a file, copy it to the destination
                    copy($sourcePath, $destinationPath);
                }
            }
        }

        closedir($dirHandle);
    }


    // ****************************************************************
    // * Copy files & directories to destination
    // * Delete source directory & files & directories inside of it recursively
    // ****************************************************************
    public function moveDirectory($params)
    {
        $source_directory = $params['source_directory'] ?? '';
        $source_directory_path = SRMQCommonFacade::pathCleaning(['path' => $source_directory]);
        $source_directory_full_path = SRMQCommonFacade::getRootPathLocal().$source_directory_path ;

        $destination_directory = $params['destination_directory'] ?? '';
        $destination_directory_path = SRMQCommonFacade::pathCleaning(['path' => $destination_directory]);
        $destination_directory_full_path = SRMQCommonFacade::getRootPathLocal().$destination_directory_path ;

        $this->copyDirectory($params);
        $this->deleteDirectory(['path' => $source_directory]);
    }

    // ****************************************************************
    // * Search Files & Folders in a Directory
    // ****************************************************************
    public function searchFilesFolders($params)
    {
        $path = $params['path'] ?? '';
        $search = $params['search'] ?? '';
        $path = SRMQCommonFacade::pathCleaning(['path' => $path]);
        $dir = SRMQCommonFacade::getRootPathLocal().$path;

        $files = $this->loadFilesRecursively(['path' => $path]);

        // Filter the array elements that contain the search string
        $files = array_filter($files, function ($item) use ($search) {
            return strpos($item, $search) !== false;
        });

        $files = array_values($files);

        // set details of the files
        $files = array_map(function($file) {
            return $this->getSpecificFileDetails(['path' => $file]);
        }, $files);

        return $files;
    }



    public function loadFilesRecursively($params)
    {
        $source_directory = $params['path'] ?? '';
        $source_directory_path = SRMQCommonFacade::pathCleaning(['path' => $source_directory]);
        $source_directory_full_path = SRMQCommonFacade::getRootPathLocal().$source_directory_path ;


        if (!file_exists($source_directory_full_path) )
        {
            throw new DirectoryNotFoundException(['message' => 'Invalid source directory!']);
        }

        $result = [];

        // Get the list of files and directories in the current directory
        $files = scandir($source_directory_full_path);

        foreach ($files as $file) {
            // Skip current and parent directory entries
            if ($file === '.' || $file === '..') {
                continue;
            }

            $filePath = $source_directory_path . DIRECTORY_SEPARATOR . $file;
            $filePath_full = SRMQCommonFacade::getRootPathLocal().$source_directory_path . DIRECTORY_SEPARATOR . $file;

            // If the entry is a directory, recursively call the function
            if (is_dir($filePath_full)) {
                $result[] = $filePath;
                $result = array_merge($result, $this->loadFilesRecursively(['path' => $filePath]));
            } else {
                // If the entry is a file, add it to the result array
                $result[] = $filePath;
            }
        }

        $result = array_unique($result);

        return $result;
    }

    public function getSpecificFileDetails($params)
    {
        $file_path = $params['path'] ?? '';
        $dir = SRMQCommonFacade::getRootPathLocal().$file_path;

        if(!file_exists($dir))
        {
            throw new DirectoryNotFoundException($params);
        }

        $full_path = $dir;
        $formatted_file = [
            'file_name' => basename($file_path),
            'is_file' => is_file($full_path),
            'extension' => pathinfo($full_path, PATHINFO_EXTENSION),
            'file_path' => $full_path,
            'base_file_path' => $file_path,
            'file_size' => SRMQCommonFacade::convertDataSize(filesize($full_path)),
        ];

        return $formatted_file;
    }

}
