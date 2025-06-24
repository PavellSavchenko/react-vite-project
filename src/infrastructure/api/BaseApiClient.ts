export abstract class BaseApiClient<TRequest = unknown> {
    protected abstract baseUrl: string

    protected getHeaders(): HeadersInit {
        return {
            'Content-Type': 'application/json',
        }
    }

    protected async request<TResponse>(
        endpoint: string,
        options: RequestInit
    ): Promise<TResponse> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                ...this.getHeaders(),
                ...options.headers,
            },
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(error || `Error ${response.status}`)
        }

        return response.status === 204
            ? ({} as TResponse)
            : await response.json()
    }

    public get<TResponse>(endpoint: string) {
        return this.request<TResponse>(endpoint, {method: 'GET'})
    }

    public post<TRequest, TResponse>(endpoint: string, data: TRequest) {
        return this.request<TResponse>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    public put<TResponse>(endpoint: string, data: TRequest) {
        return this.request<TResponse>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    public delete<TResponse>(endpoint: string) {
        return this.request<TResponse>(endpoint, {method: 'DELETE'})
    }
}
