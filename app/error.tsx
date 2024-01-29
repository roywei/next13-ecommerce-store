'use client' // Error components must be Client Components

import { useEffect } from 'react';
import { sendErrorToEndpoint } from './async_errors';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
        sendErrorToEndpoint(error.name, error.stack, "");
    }, [error]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Sorry something went wrong, please contact our support!
            </button>
        </div>
    );
}


  