export const API_BASE_URL = 'http://localhost:5001/api/v1';

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
};

export const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_info');
    localStorage.removeItem('role');
};

export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        clearTokens();
        window.location.href = '/login';
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/users/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        const data = await response.json();

        if (response.ok) {
            setTokens(data.access, refreshToken); // Refresh token usually doesn't change
            return data.access;
        } else {
            clearTokens();
            window.location.href = '/login';
            return null;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        clearTokens();
        window.location.href = '/login';
        return null;
    }
};

export const authenticatedFetch = async (url, options = {}) => {
    let accessToken = getAccessToken();

    // Check if token is expired (simple check, ideally validate with JWT library)
    // For now, we'll assume if it's null, it's expired or not present
    if (!accessToken) {
        accessToken = await refreshAccessToken();
        if (!accessToken) {
            throw new Error('Could not refresh access token.');
        }
    }

    let headers = options.headers || {};
    headers['Authorization'] = `Bearer ${accessToken}`;

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) { // Unauthorized, token might have expired or is invalid
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
            headers['Authorization'] = `Bearer ${newAccessToken}`;
            const retryResponse = await fetch(url, { ...options, headers });
            if (retryResponse.status === 401) { // Still unauthorized after refresh, maybe refresh token expired too
                clearTokens();
                window.location.href = '/login';
                throw new Error('Session expired. Please log in again.');
            }
            return retryResponse;
        } else {
            clearTokens();
            window.location.href = '/login';
            throw new Error('Session expired. Please log in again.');
        }
    }
    return response;
}; 