const defaultProfileImage = 'default-profile.svg';
const authSessionKey = 'skylancheUser';
const authUsersKey = 'skylancheUsers';
const authLogoutFlagKey = 'skylancheLogoutFlag';

function saveSession(name, email) {
    localStorage.removeItem(authLogoutFlagKey);
    localStorage.setItem(authSessionKey, JSON.stringify({ name, email, profileImage: defaultProfileImage }));
    window.location.replace('index.html');
}

function getUsers() {
    const stored = localStorage.getItem(authUsersKey);
    return stored ? JSON.parse(stored) : [];
}

function saveUsers(users) {
    localStorage.setItem(authUsersKey, JSON.stringify(users));
}

function registerUser(name, email, password) {
    const users = getUsers();
    const exists = users.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (exists) {
        return { ok: false, message: 'Este e-mail já está cadastrado.' };
    }

    users.push({ name, email, password, profileImage: defaultProfileImage });
    saveUsers(users);
    return { ok: true };
}

function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(item => item.email.toLowerCase() === email.toLowerCase() && item.password === password);

    if (!user) {
        return { ok: false, message: 'E-mail ou senha inválidos.' };
    }

    return { ok: true, user };
}

function restoreSession() {
    const logoutFlag = localStorage.getItem(authLogoutFlagKey);
    if (logoutFlag === '1') {
        localStorage.removeItem(authLogoutFlagKey);
        return;
    }

    const saved = localStorage.getItem(authSessionKey);
    if (saved) {
        window.location.replace('index.html');
    }
}

function switchForm(formName) {
    document.querySelectorAll('.auth-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.form === formName));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.toggle('active', form.id === `${formName}Form`));
}

function setupAuth() {
    restoreSession();

    document.querySelectorAll('.auth-tab').forEach(button => {
        button.addEventListener('click', () => switchForm(button.dataset.form));
    });

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!email || !password) return;

        const result = loginUser(email, password);
        if (result.ok) {
            saveSession(result.user.name, result.user.email);
        } else {
            alert(result.message);
        }
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();

        if (!name || !email || !password) return;

        const result = registerUser(name, email, password);
        if (result.ok) {
            saveSession(name, email);
        } else {
            alert(result.message);
        }
    });
}

document.addEventListener('DOMContentLoaded', setupAuth);
