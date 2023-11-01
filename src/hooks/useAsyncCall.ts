import { useState, useEffect } from 'react';

interface AsyncData<T> {
    loading: boolean;
    data: T | null;
    error: Error | null;
}

function useAsyncCall<T>(callback: () => Promise<T>): AsyncData<T> {
    const [loading,setLoading] = useState<boolean>(true);
    const [data,setData] = useState<T | null>(null);
    const [error,setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        callback().then(result => {
            setData(result);
            setError(null);
        }).catch(err => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        })
    },[callback])

    return {loading,data,error};
}

export default useAsyncCall;