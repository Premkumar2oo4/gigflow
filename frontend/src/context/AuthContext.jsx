import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    const socket = io('http://localhost:5000', {
        withCredentials: true,
        transports: ['polling', 'websocket'],
        autoConnect: false,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    });

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket fully connected!');
        });

        socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err.message);
        });

        socket.on('error', (err) => {
            console.error('Socket error:', err);
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('error');
        };
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/me', {
                    withCredentials: true,
                });

                setUser(res.data);

                if (res.data?._id) {
                    socket.connect();
                    const userIdStr = res.data._id.toString();
                    socket.emit('registerUser', userIdStr);
                    console.log('Socket registered user ID:', userIdStr);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        socket.on('hiredNotification', (data) => {
            console.log('<<< RECEIVED HIRED NOTIFICATION >>>', data);
            setNotifications(prev => [...prev, data.message || 'You were hired!']);
        });

        return () => {
            socket.off('hiredNotification');
            socket.disconnect();
        };
    }, []); 

    const login = async (email, password) => {
        try {
            await axios.post('http://localhost:5000/api/auth/login', { email, password }, {
                withCredentials: true,
            });

            const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });
            setUser(res.data);

            if (res.data?._id) {
                socket.connect();
                const userIdStr = res.data._id.toString();
                socket.emit('registerUser', userIdStr);
                console.log('Login → Socket registered:', userIdStr);
            }
        } catch (err) {
            console.error('Login failed:', err);
            throw err;
        }
    };

    const register = async (name, email, password) => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
        } catch (err) {
            console.error('Registration failed:', err);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setNotifications([]);
        socket.disconnect();
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, notifications }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;