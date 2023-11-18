import React from 'react'

type Props = {}

const Server = (props: Props) => {
    return (
        <>
            <div className="min-h-screen p-4 sm:ml-64">
                <div className="p-3 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="flex items-center justify-center h-48  rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            Welcome to socket.io server
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Server