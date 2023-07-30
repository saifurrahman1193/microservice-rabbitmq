<?php

namespace Saifur\RabbitMQ\app\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Saifur\RabbitMQ\app\Traits\ApiResponser;
use Saifur\RabbitMQ\app\Modules\Directory\LocalDirectory;

class LocalDirectoryController extends Controller
{
    use ApiResponser;


    // getFiles
    public function getFiles(Request $request)
    {
        $directory = new LocalDirectory();  // the local directory
        $files = $directory->getFiles(['path' => $request->path]); // get files
        return $this->set_response($files,  200,'success', ['Success']);
    }

    public function getFilesWithDetails(Request $request)
    {
        $directory = new LocalDirectory();  // the local directory
        $files = $directory->getFilesWithDetails(['path' => $request->path]); // get files
        return $this->set_response($files,  200,'success', ['Success']);
    }

    public function getFilesRecursively(Request $request)
    {
        $directory = new LocalDirectory();  // the local directory
        $files = $directory->getFilesRecursively(['path' => $request->path]); // get files
        return $this->set_response($files,  200,'success', ['Success']);
    }

    public function getFilesRecursivelyWithDetails(Request $request)
    {
        $directory = new LocalDirectory();  // the local directory
        $files = $directory->getFilesRecursivelyWithDetails(['path' => $request->path]); // get files
        return $this->set_response($files,  200,'success', ['Success']);
    }

    public function createDirectory(Request $request)
    {
        $directory = new LocalDirectory();  // the local directory

        $directory->createDirectory(['path' => $request->path]);
        return $this->set_response(null,  200,'success', ['Success']);
    }

    public function deleteDirectory(Request $request)
    {
        $directory = new LocalDirectory();  // the local directory

        $directory->deleteDirectory(['path' => $request->path]);
        return $this->set_response(null,  200,'success', ['Success']);
    }

    public function renameDirectory(Request $request)
    {
        $directory = new LocalDirectory();  // the local directory

        $directory->renameDirectory(['path' => $request->path, 'new_name' => $request->new_name]);
        return $this->set_response(null,  200,'success', ['Success']);
    }

    public function copyDirectory(Request $request)
    {
        $directory = new LocalDirectory();  // the local directory

        $directory->copyDirectory(['source_directory' => $request->source_directory, 'destination_directory' => $request->destination_directory]);
        return $this->set_response(null,  200,'success', ['Success']);
    }

    public function moveDirectory(Request $request)
    {
        $directory = new LocalDirectory();  // the local directory

        $directory->moveDirectory(['source_directory' => $request->source_directory, 'destination_directory' => $request->destination_directory]);
        return $this->set_response(null,  200,'success', ['Success']);
    }

    public function searchFilesFolders(Request $request)
    {
        $directory = new LocalDirectory();  // the local directory

        $files = $directory->searchFilesFolders(['path' => $request->path, 'search' => $request->search]);
        return $this->set_response($files,  200,'success', ['Success']);
    }
}
