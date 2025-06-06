const { DEV, VITE_LOCAL } = import.meta.env

import { userService as local } from './user.service.local'
import { userService as remote } from './user.service.remote'

function getEmptyUser() {
    return {
        username: '',
        password: '',
        fullname: '',
        isAdmin: false,
    }
}

// Utility functions for user lookup and display
function getUserByIdFromUsers(userId, users) {
    return users.find(user => user._id === userId || user._id === userId.toString());
}

function getUserDisplayInfo(userId, users) {
    const user = getUserByIdFromUsers(userId, users);
    if (!user) return { initials: '??', name: 'Unknown User', imgUrl: null };
    const name = user.fullName || user.fullname || user.username || 'Unknown User';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase() || '??';
    return { initials, name, imgUrl: user.imageUrl || user.imgUrl || null };
}

// Additional utility functions for working with user collections
function getUsersDisplayInfo(userIds, users) {
    return userIds.map(id => getUserDisplayInfo(id, users)).filter(user => user);
}

function filterUsersByName(users, searchTerm) {
    if (!searchTerm) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(user => {
        const name = user.fullName || user.fullname || user.username || '';
        return name.toLowerCase().includes(term);
    });
}

function getUserInitials(user) {
    const name = user.fullName || user.fullname || user.username || 'Unknown User';
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || '??';
}


// Export the user service based on the environment
const service = VITE_LOCAL === 'true' ? local : remote


export const userService = {
    ...service,
    getEmptyUser,
    getUserByIdFromUsers,
    getUserDisplayInfo,
    getUsersDisplayInfo,
    filterUsersByName,
    getUserInitials,
    
}

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.userService = userService