import { storageService } from '../async-storage.service'
import { loadFromStorage, saveToStorage } from '../util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'user'

await _createUsers()

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}

async function getUsers() {
    const users = await storageService.query(STORAGE_KEY)
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get(STORAGE_KEY, userId)
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY, userId)
}

async function update({ _id }) {
    const user = await storageService.get(STORAGE_KEY, _id)
    await storageService.put(STORAGE_KEY, user)

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://res.cloudinary.com/drunensjg/image/upload/v1748513702/default_profile_pic_jxjpai.svg'

    const user = await storageService.post(STORAGE_KEY, userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
	user = { 
        _id: user._id, 
        fullname: user.fullname, 
        imgUrl: user.imgUrl, 
        isAdmin: user.isAdmin 
    }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createAdmin() {
    const userCred = {
        username: 'admin',
        password: 'admin',
        fullname: 'Mustafa Adminsky',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    }

    const newUser = await storageService.post(STORAGE_KEY, userCred)
    console.log('newUser: ', newUser)
}

async function _createUsers() {
    let users = loadFromStorage(STORAGE_KEY)
    
    if (!users || !users.length) {
        console.log("Creating Demo Users")
        const module = await import("../../../demo-data-new.js")
        const demoUsers = module.demo_data["users"]
        
        // Transform mini-users to full user objects
        const fullUsers = demoUsers.map(miniUser => ({
            _id: miniUser._id.toString(),
            username: miniUser.fullName.toLowerCase().replace(/\s+/g, '_'),
            password: 'demo123', // Default password for demo users
            fullname: miniUser.fullName,
            imgUrl: miniUser.imageUrl,
            isAdmin: miniUser._id === 201 // Make first user admin (CEO Cat)
        }))
        
        saveToStorage(STORAGE_KEY, fullUsers)
    }
}