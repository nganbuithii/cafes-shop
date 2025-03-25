export const ErrorDisplay = ({ error }: { error: Error }) => (
    <div className="min-h-screen flex items-center justify-center bg-coffee-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-red-600">Oops!</h3>
            <p className="mt-2 text-coffee-600">{error.message}</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-coffee-500 text-white rounded hover:bg-coffee-600 transition-colors"
            >
                Try Again
            </button>
        </div>
    </div>
);