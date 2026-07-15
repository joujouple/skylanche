// ============================================
// CONFIGURAÇÃO DE IMAGENS - EDITE AQUI!
// ============================================
// Substitua os caminhos abaixo pelos caminhos das suas imagens
// Exemplo: 'https://example.com/imagem.jpg' ou './imagens/foto.jpg'

const PROFILE_IMAGES = {
    'you': 'perfil.png',
    'joao': 'joao.jpg',
    'maria': 'maria.jpg',
    'carlos': 'carlos.jpg',
    'ana': 'ana.jpg',
    'skylanche': 'ta.jpg'
};

const PROFILE_KEY_BY_AUTHOR = {
    'Você': 'you',
    'Sky Team': 'skylanche',
    'João Silva': 'joao',
    'Maria Oliveira': 'maria',
    'Carlos Santos': 'carlos',
    'Ana Costa': 'ana'
};

let userDisplayName = localStorage.getItem('userDisplayName') || 'Você';

function ensureAuthSession() {
    const saved = localStorage.getItem('skylancheUser');
    if (!saved) {
        window.location.href = 'auth.html';
        return false;
    }

    const user = JSON.parse(saved);
    userDisplayName = user.name || userDisplayName;
    localStorage.setItem('userDisplayName', userDisplayName);
    return true;
}

function getProfileImageForAuthor(author) {
    const isCurrentUser = author === userDisplayName || author === 'Você' || author === 'you';
    const savedPhoto = localStorage.getItem('profilePhoto');

    if (isCurrentUser && savedPhoto) {
        return savedPhoto;
    }

    const key = PROFILE_KEY_BY_AUTHOR[author] || 'you';
    return PROFILE_IMAGES[key] || PROFILE_IMAGES['you'];
}

function updateUserNameDisplay() {
    const profileNameElements = document.querySelectorAll('.profile-name, .user-name-label');
    profileNameElements.forEach(el => {
        el.textContent = userDisplayName;
    });
}

const STORY_IMAGES = {
    's1': 'story1.jpg',
    's2': 'story2.jpg',
    's3': 'story3.jpg',
    's4': 'story4.jpg'
};

// ============================================
// FIM DA CONFIGURAÇÃO
// ============================================

// Imagens de exemplo (usando URLs públicas)
const sampleImages = [
    'lanches1.jpg',
    'lanches3.jpg',
    'lanches2.jpg'
];

// Data
let posts = [
    {
        id: "1",
        author: "Sky Team",
        time: "2 horas atrás",
        content: "Bem-vindos ao Skylanche! A nova rede social onde o brilho é amarelo. 🌟",
        likes: 124,
        comments: 2,
        liked: false,
        image: sampleImages[0],
        commentsList: [
            { id: "c1", author: "João Silva", content: "Adorei!", time: "1h atrás" },
            { id: "c2", author: "Maria", content: "Muito bom mesmo!", time: "45m atrás" }
        ]
    },
    {
        id: "2",
        author: "João Silva",
        time: "5 horas atrás",
        content: "Acabei de chegar no Skylanche. O modo escuro com amarelo ficou sensacional!",
        likes: 45,
        comments: 0,
        liked: false,
        image: null,
        commentsList: []
    },
    {
        id: "3",
        author: "Maria Oliveira",
        time: "Ontem às 18:30",
        content: "Dica do dia: O café fica melhor quando compartilhado com amigos no Skylanche. ☕✨",
        likes: 89,
        comments: 0,
        liked: false,
        image: sampleImages[1],
        commentsList: []
    },
    {
        id: "4",
        author: "Carlos Santos",
        time: "Ontem às 14:20",
        content: "Que dia incrível! Mal posso esperar para compartilhar mais momentos aqui.",
        likes: 67,
        comments: 0,
        liked: false,
        image: null,
        commentsList: []
    },
    {
        id: "5",
        author: "Ana Costa",
        time: "Ontem às 10:15",
        content: "Skylanche é simplesmente perfeito! Postarei frequentemente fotos dos meus lanches.",
        likes: 156,
        comments: 0,
        liked: false,
        image: sampleImages[2],
        commentsList: []
    }
];

let stories = [
    { 
        id: "s1", 
        author: "João Silva", 
        avatar: PROFILE_IMAGES['joao'], 
        viewed: false, 
        image: STORY_IMAGES['s1'],
        isProfileImage: true
    },
    { 
        id: "s2", 
        author: "Maria Oliveira", 
        avatar: PROFILE_IMAGES['maria'], 
        viewed: true, 
        image: STORY_IMAGES['s2'],
        isProfileImage: true
    },
    { 
        id: "s3", 
        author: "Carlos Santos", 
        avatar: PROFILE_IMAGES['carlos'], 
        viewed: false, 
        image: STORY_IMAGES['s3'],
        isProfileImage: true
    },
    { 
        id: "s4", 
        author: "Ana Costa", 
        avatar: PROFILE_IMAGES['ana'], 
        viewed: true, 
        image: STORY_IMAGES['s4'],
        isProfileImage: true
    }
];

let currentTheme = localStorage.getItem('theme' ) || 'dark-mode';
let currentStoryIndex = 0;
let selectedPostForComment = null;
let postImageData = null;

// DOM Elements
const postContainer = document.getElementById('post-container');
const postInput = document.getElementById('postInput');
const submitPostBtn = document.getElementById('submitPostBtn');
const cancelPostBtn = document.getElementById('cancelPostBtn');
const searchInput = document.getElementById('searchInput');
const settingsBtn = document.querySelector('.settings-btn');
const settingsModal = document.getElementById('settingsModal');
const commentModal = document.getElementById('commentModal');
const storyCreatorModal = document.getElementById('storyCreatorModal');
const storyViewerModal = document.getElementById('storyViewerModal');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const addStoryBtn = document.getElementById('addStoryBtn');
const storiesCarousel = document.getElementById('storiesCarousel');
const storyFileInput = document.getElementById('storyFileInput');
const storyUploadArea = document.getElementById('storyUploadArea');
const storyImagePreview = document.getElementById('storyImagePreview');
const previewImg = document.getElementById('previewImg');
const storyActions = document.getElementById('storyActions');
const changeImageBtn = document.getElementById('changeImageBtn');
const postStoryBtn = document.getElementById('postStoryBtn');
const commentInput = document.getElementById('commentInput');
const submitCommentBtn = document.getElementById('submitCommentBtn');
const closeStoryBtn = document.getElementById('closeStoryBtn');
const prevStoryBtn = document.getElementById('prevStoryBtn');
const nextStoryBtn = document.getElementById('nextStoryBtn');
const postFileInput = document.getElementById('postFileInput');
const postImagePreview = document.getElementById('postImagePreview');
const previewPostImg = document.getElementById('previewPostImg');
const saveNameBtn = document.getElementById('saveNameBtn');
const changeProfilePhotoBtn = document.getElementById('changeProfilePhotoBtn');
const profilePhotoInput = document.getElementById('profilePhotoInput');
const profilePreviewImage = document.getElementById('profilePreviewImage');
const aiChatToggle = document.getElementById('aiChatToggle');
const aiChatClose = document.getElementById('aiChatClose');
const aiChatPanel = document.getElementById('aiChatPanel');
const chatContacts = document.querySelectorAll('.chat-contact-chip');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatForm = document.getElementById('chatForm');

const chatConversations = {
    joao: [
        { sender: 'them', text: 'Ei, você viu a ideia que eu mandei?' },
        { sender: 'me', text: 'Sim, achei bem forte.' },
        { sender: 'them', text: 'Perfeito. Vamos fechar isso hoje?' }
    ],
    maria: [
        { sender: 'them', text: 'Tenho uma sugestão nova para o seu feed.' },
        { sender: 'me', text: 'Me manda, estou curioso.' },
        { sender: 'them', text: 'Vou te enviar um resumo em poucos minutos.' }
    ],
    carlos: [
        { sender: 'them', text: 'Podemos revisar a estratégia juntos?' },
        { sender: 'me', text: 'Claro, estou disponível.' },
        { sender: 'them', text: 'Ótimo, eu já organizei algumas ideias.' }
    ]
};

const chatAutoReplies = {
    joao: [
        'Boa! Estou pronto para seguir com isso.',
        'Perfeito, vamos deixar isso mais claro.',
        'Adorei essa ideia. Vou te ajudar a evoluir isso.',
        'Estou contigo. Vamos transformar isso em algo bem forte.'
    ],
    maria: [
        'Perfeito, vou te mandar algo mais claro.',
        'Isso tem ótimo potencial. Vamos explorar.',
        'Fico feliz com essa conversa. Tenho mais sugestões.',
        'Concordo. Vamos dar um passo mais estratégico.'
    ],
    carlos: [
        'Ótimo, vamos ajustar tudo com calma.',
        'Boa escolha. Eu vejo uma direção interessante.',
        'Vamos construir isso de forma mais objetiva.',
        'Entendi. Eu já tenho uma ideia melhor para isso.'
    ]
};

const friendCommentAuthors = ['João Silva', 'Maria Oliveira', 'Carlos Santos', 'Ana Costa'];
const friendCommentTexts = [
    'Gostei bastante dessa ideia!',
    'Isso ficou ótimo, continue assim.',
    'Muito bom, parabéns pelo post!',
    'Acho que isso vai chamar muita atenção.'
];

let activeChatContact = 'joao';
const chatReplyProgress = {
    joao: 0,
    maria: 0,
    carlos: 0
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (!ensureAuthSession()) return;

    initTheme();
    updateUserNameDisplay();
    const savedPhoto = localStorage.getItem('profilePhoto') || localStorage.getItem('skylancheUserProfile') || 'default-profile.svg';
    if (savedPhoto) {
        updateProfilePhotoPreview(savedPhoto);
    }
    renderPosts();
    renderStories();
    setupEventListeners();
});

// Theme Management
function initTheme() {
    document.body.className = currentTheme;
    updateThemeButton();
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    document.body.className = currentTheme;
    localStorage.setItem('theme', currentTheme);
    updateThemeButton();
}

function saveUserName() {
    const input = document.getElementById('nameInput');
    if (!input) return;

    const newName = input.value.trim() || 'Você';
    userDisplayName = newName;
    localStorage.setItem('userDisplayName', userDisplayName);

    const saved = localStorage.getItem('skylancheUser');
    if (saved) {
        const user = JSON.parse(saved);
        user.name = userDisplayName;
        localStorage.setItem('skylancheUser', JSON.stringify(user));
    }

    updateUserNameDisplay();
    renderPosts();
}

function updateProfilePhotoPreview(imageDataUrl) {
    const profileElements = document.querySelectorAll('.profile-pic-mini');
    profileElements.forEach(el => {
        const isUserProfile = el.classList.contains('user-profile-avatar') || el.id === 'profilePreviewImage' || el.classList.contains('settings-btn');
        const isContactAvatar = el.closest('.contact-item');

        if (!isContactAvatar && isUserProfile) {
            el.style.backgroundImage = `url('${imageDataUrl}')`;
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
        }
    });

    if (profilePreviewImage) {
        profilePreviewImage.style.backgroundImage = `url('${imageDataUrl}')`;
    }

    localStorage.setItem('profilePhoto', imageDataUrl);
    localStorage.setItem('skylancheUserProfile', imageDataUrl);
}

function handleProfilePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const imageDataUrl = event.target.result;
        updateProfilePhotoPreview(imageDataUrl);
    };
    reader.readAsDataURL(file);
}

function updateThemeButton() {
    const icon = themeToggleBtn.querySelector('i');
    const text = themeToggleBtn.querySelector('span');
    if (currentTheme === 'dark-mode') {
        icon.className = 'fas fa-sun';
        text.textContent = 'Modo Claro';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'Modo Escuro';
    }
}

// Post Management
function isOwnPost(post) {
    return post.author === userDisplayName || post.author === 'Você' || post.author === 'you';
}

function renderPosts(filter = '') {
    postContainer.innerHTML = '';
    
    const filteredPosts = posts.filter(post => 
        post.content.toLowerCase().includes(filter.toLowerCase()) ||
        post.author.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredPosts.length === 0) {
        postContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">Nenhum post encontrado</p>';
        return;
    }

    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        
        const deleteBtn = isOwnPost(post) ? 
            `<button class="post-delete-btn" onclick="deletePost('${post.id}')" title="Excluir post"><i class="fas fa-trash"></i></button>` : '';
        
        const imageHtml = post.image ? `<img src="${post.image}" alt="Post" class="post-image">` : '';
        
        let commentsPreview = '';
        if (post.commentsList.length > 0) {
            commentsPreview = `
                <div class="post-comments-preview">
                    <h6>Comentários (${post.comments})</h6>
                    ${post.commentsList.slice(0, 2).map(comment => `
                        <div class="comment-item">
                            <strong>${comment.author}:</strong> ${comment.content}
                            <div class="comment-time">${comment.time}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        const authorProfileImage = getProfileImageForAuthor(post.author);

        postElement.innerHTML = `
            <div class="post-header">
                <div class="post-header-left">
                    <div class="profile-pic-mini" style="background-image: url('${authorProfileImage}'); background-size: cover; background-position: center;"></div>
                    <div class="post-info">
                        <h5>${post.author}</h5>
                        <span>${post.time}</span>
                    </div>
                </div>
                ${deleteBtn}
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${imageHtml}
            </div>
            <div class="post-actions">
                <button class="action-item ${post.liked ? 'liked' : ''}" onclick="likePost('${post.id}')">
                    <i class="fas fa-thumbs-up"></i>
                    <span>Curtir (${post.likes})</span>
                </button>
                <button class="action-item" onclick="openCommentModal('${post.id}')">
                    <i class="fas fa-comment"></i>
                    <span>Comentar (${post.comments})</span>
                </button>
                <button class="action-item" onclick="sharePost('${post.id}')">
                    <i class="fas fa-share"></i>
                    <span>Compartilhar</span>
                </button>
            </div>
            ${commentsPreview}
        `;
        
        postContainer.appendChild(postElement);
    });
}

function createPost() {
    if (postInput.value.trim() === '') return;

    const newPost = {
        id: Date.now().toString(),
        author: userDisplayName || 'Você',
        time: 'Agora mesmo',
        content: postInput.value,
        likes: 0,
        comments: 0,
        liked: false,
        image: postImageData,
        commentsList: []
    };

    posts.unshift(newPost);
    postInput.value = '';
    postImageData = null;
    postImagePreview.style.display = 'none';
    renderPosts();
    addFriendComments(newPost.id);
}

function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    renderPosts();
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        renderPosts();
    }
}

function sharePost(postId) {
    alert(`Compartilhado! Post ${postId}`);
}

function handlePostImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        postImageData = event.target.result;
        previewPostImg.src = postImageData;
        postImagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function removePostImage() {
    postImageData = null;
    postImagePreview.style.display = 'none';
}

// Comment Management
function openCommentModal(postId) {
    selectedPostForComment = postId;
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;

    const postPreview = document.getElementById('postPreview');
    postPreview.innerHTML = `
        <div>
            <p class="author">${post.author}</p>
            <p>${post.content}</p>
        </div>
    `;

    const commentsList = document.getElementById('commentsList');
    if (post.commentsList.length === 0) {
        commentsList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">Nenhum comentário ainda</p>';
    } else {
        commentsList.innerHTML = post.commentsList.map(comment => `
            <div class="comment-item-full">
                <p class="author">${comment.author}</p>
                <p class="content">${comment.content}</p>
                <p class="time">${comment.time}</p>
            </div>
        `).join('');
    }

    commentInput.value = '';
    showModal(commentModal);
}

function addComment() {
    if (commentInput.value.trim() === '' || !selectedPostForComment) return;

    const post = posts.find(p => p.id === selectedPostForComment);
    if (!post) return;

    const newComment = {
        id: Date.now().toString(),
        author: userDisplayName,
        content: commentInput.value,
        time: 'Agora'
    };

    post.commentsList.push(newComment);
    post.comments++;
    
    commentInput.value = '';
    renderPosts();
    openCommentModal(selectedPostForComment);
}

// Story Management
function renderStories() {
    storiesCarousel.innerHTML = '';
    
    stories.forEach((story, index) => {
        const storyElement = document.createElement('button');
        storyElement.className = `story-item ${story.viewed ? 'viewed' : 'unviewed'}`;
        
        if (story.image) {
            // Se há imagem no story, exibir a imagem
            storyElement.innerHTML = `<img src="${story.image}" alt="${story.author}" style="width: 100%; height: 100%; object-fit: cover;">`;
        } else if (story.isProfileImage && story.avatar) {
            // Se não há imagem no story, mas há foto de perfil, exibir a foto de perfil
            storyElement.innerHTML = `
                <div style="text-align: center; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-image: url('${story.avatar}'); background-size: cover; background-position: center;">
                    <div class="story-item-name">${story.author}</div>
                </div>
            `;
        } else {
            // Fallback: mostrar ícone
            storyElement.innerHTML = `
                <div style="text-align: center; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div style="font-size: 32px;"><i class="fas fa-user"></i></div>
                    <div class="story-item-name">${story.author}</div>
                </div>
            `;
        }
        
        storyElement.onclick = () => openStoryViewer(index);
        storiesCarousel.appendChild(storyElement);
    });
}

function openStoryCreator() {
    storyImagePreview.classList.add('hidden');
    storyActions.classList.add('hidden');
    storyUploadArea.style.display = 'block';
    showModal(storyCreatorModal);
}

function handleStoryUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        previewImg.src = event.target.result;
        storyImagePreview.classList.remove('hidden');
        storyActions.classList.remove('hidden');
        storyUploadArea.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function changeStoryImage() {
    storyFileInput.click();
}

function postStory() {
    if (!previewImg.src) return;

    const newStory = {
        id: `s${Date.now()}`,
        author: userDisplayName,
        avatar: PROFILE_IMAGES['you'],
        viewed: false,
        image: previewImg.src,
        isProfileImage: false
    };

    stories.unshift(newStory);
    previewImg.src = '';
    storyImagePreview.classList.add('hidden');
    storyActions.classList.add('hidden');
    storyUploadArea.style.display = 'block';
    renderStories();
    hideModal(storyCreatorModal);
}

function openStoryViewer(index) {
    currentStoryIndex = index;
    updateStoryViewer();
    showModal(storyViewerModal);
}

function updateStoryViewer() {
    const story = stories[currentStoryIndex];
    if (!story) return;

    document.getElementById('storyAuthorName').textContent = story.author;
    const storyImage = document.getElementById('storyImage');
    const storyPlaceholder = document.getElementById('storyPlaceholder');
    const storyAuthorAvatar = document.getElementById('storyAuthorAvatar');

    if (story.image) {
        // Se há imagem no story, exibir a imagem
        storyImage.src = story.image;
        storyImage.style.display = 'block';
        storyPlaceholder.style.display = 'none';
    } else if (story.isProfileImage && story.avatar) {
        // Se não há imagem no story, mas há foto de perfil, exibir a foto de perfil como placeholder
        storyImage.style.display = 'none';
        storyPlaceholder.style.display = 'flex';
        document.getElementById('storyPlaceholderName').textContent = story.author;
        storyPlaceholder.querySelector('.placeholder-avatar').style.backgroundImage = `url('${story.avatar}')`;
        storyPlaceholder.querySelector('.placeholder-avatar').style.backgroundSize = 'cover';
        storyPlaceholder.querySelector('.placeholder-avatar').style.backgroundPosition = 'center';
        storyPlaceholder.querySelector('.placeholder-avatar').innerHTML = '';
    } else {
        storyImage.style.display = 'none';
        storyPlaceholder.style.display = 'flex';
        document.getElementById('storyPlaceholderName').textContent = story.author;
        storyPlaceholder.querySelector('.placeholder-avatar').innerHTML = '<i class="fas fa-user"></i>';
        storyPlaceholder.querySelector('.placeholder-avatar').style.backgroundImage = 'none';
    }

    // Atualizar avatar do autor no header do story
    if (story.avatar && story.isProfileImage) {
        storyAuthorAvatar.style.backgroundImage = `url('${story.avatar}')`;
        storyAuthorAvatar.style.backgroundSize = 'cover';
        storyAuthorAvatar.style.backgroundPosition = 'center';
    } else {
        storyAuthorAvatar.style.backgroundImage = 'none';
        storyAuthorAvatar.innerHTML = '<i class="fas fa-user"></i>';
    }

    const progress = ((currentStoryIndex + 1) / stories.length) * 100;
    document.getElementById('storyProgress').style.width = progress + '%';
}

function nextStory() {
    currentStoryIndex = (currentStoryIndex + 1) % stories.length;
    updateStoryViewer();
}

function prevStory() {
    currentStoryIndex = (currentStoryIndex - 1 + stories.length) % stories.length;
    updateStoryViewer();
}

// Modal Management
function showModal(modal) {
    modal.classList.remove('hidden');
}

function hideModal(modal) {
    modal.classList.add('hidden');
}

// Event Listeners
function renderChatMessages() {
    if (!chatMessages) return;

    const messages = chatConversations[activeChatContact] || [];
    chatMessages.innerHTML = messages.map(message => `
        <div class="message-bubble ${message.sender === 'me' ? 'mine' : ''}">${message.text}</div>
    `).join('');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function selectChatContact(contact) {
    activeChatContact = contact;
    chatContacts.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.contact === contact);
    });
    renderChatMessages();
}

function toggleAiChatPanel() {
    if (aiChatPanel) {
        aiChatPanel.classList.toggle('open');
    }
}

function handleChatSubmit(e) {
    e.preventDefault();
    if (!chatInput) return;

    const text = chatInput.value.trim();
    if (!text) return;

    const conversation = chatConversations[activeChatContact];
    conversation.push({ sender: 'me', text });
    chatInput.value = '';
    renderChatMessages();

    setTimeout(() => {
        const replyOptions = chatAutoReplies[activeChatContact] || ['Entendi, vou te responder em breve.'];
        const replyIndex = chatReplyProgress[activeChatContact] % replyOptions.length;
        chatReplyProgress[activeChatContact] = (chatReplyProgress[activeChatContact] + 1) % replyOptions.length;

        conversation.push({
            sender: 'them',
            text: replyOptions[replyIndex]
        });
        renderChatMessages();
    }, 700);
}

function addFriendComments(postId) {
    setTimeout(() => {
        const post = posts.find(item => item.id === postId);
        if (!post || !isOwnPost(post)) return;

        const shuffledFriends = [...friendCommentAuthors].sort(() => Math.random() - 0.5);
        const selectedFriends = shuffledFriends.slice(0, 2);

        selectedFriends.forEach((friend, index) => {
            const commentText = friendCommentTexts[(index + Math.floor(Math.random() * friendCommentTexts.length)) % friendCommentTexts.length];
            post.commentsList.push({
                id: `c-${Date.now()}-${index}`,
                author: friend,
                content: commentText,
                time: 'Agora'
            });
            post.comments += 1;
        });

        renderPosts();
    }, 5000);
}

function setupEventListeners() {
    // Theme
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Settings
    settingsBtn.addEventListener('click', () => showModal(settingsModal));
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) hideModal(modal);
        });
    });

    // Name edit
    saveNameBtn.addEventListener('click', saveUserName);
    document.getElementById('nameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveUserName();
    });

    // Profile photo
    changeProfilePhotoBtn.addEventListener('click', () => profilePhotoInput.click());
    profilePhotoInput.addEventListener('change', handleProfilePhotoChange);

    // Posts
    submitPostBtn.addEventListener('click', createPost);
    cancelPostBtn.addEventListener('click', () => {
        postInput.value = '';
        postImageData = null;
        postImagePreview.style.display = 'none';
    });
    postFileInput.addEventListener('change', handlePostImageUpload);

    // Search
    searchInput.addEventListener('input', (e) => {
        renderPosts(e.target.value);
    });

    // Comments
    submitCommentBtn.addEventListener('click', addComment);
    commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addComment();
    });

    // Stories
    addStoryBtn.addEventListener('click', openStoryCreator);
    storyFileInput.addEventListener('change', handleStoryUpload);
    storyUploadArea.addEventListener('click', () => storyFileInput.click());
    changeImageBtn.addEventListener('click', changeStoryImage);
    postStoryBtn.addEventListener('click', postStory);
    closeStoryBtn.addEventListener('click', () => hideModal(storyViewerModal));
    prevStoryBtn.addEventListener('click', prevStory);
    nextStoryBtn.addEventListener('click', nextStory);

    // Chat widget
    if (aiChatToggle) aiChatToggle.addEventListener('click', toggleAiChatPanel);
    if (aiChatClose) aiChatClose.addEventListener('click', toggleAiChatPanel);

    chatContacts.forEach(btn => {
        btn.addEventListener('click', () => selectChatContact(btn.dataset.contact));
    });

    if (chatForm) chatForm.addEventListener('submit', handleChatSubmit);
    renderChatMessages();

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('skylancheUser');
        localStorage.removeItem('skylancheUserProfile');
        localStorage.setItem('skylancheLogoutFlag', '1');
        window.location.replace('auth.html');
    });

    // Modal overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) hideModal(modal);
        });
    });
}
