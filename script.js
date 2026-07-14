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
        author: "Skylanche Team",
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
        content: "Skylanche é simplesmente perfeito! Amei a interface e a comunidade é muito legal.",
        likes: 156,
        comments: 0,
        liked: false,
        image: sampleImages[2],
        commentsList: []
    }
];

let stories = [
    { id: "s1", author: "João Silva", avatar: "👨", viewed: false, image: null },
    { id: "s2", author: "Maria Oliveira", avatar: "👩", viewed: true, image: null },
    { id: "s3", author: "Carlos Santos", avatar: "👨", viewed: false, image: null },
    { id: "s4", author: "Ana Costa", avatar: "👩", viewed: true, image: null }
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
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
        
        const deleteBtn = post.author === 'Você' ? 
            `<button class="post-delete-btn" onclick="deletePost('${post.id}')"><i class="fas fa-trash"></i></button>` : '';
        
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

        postElement.innerHTML = `
            <div class="post-header">
                <div class="post-header-left">
                    <div class="profile-pic-mini"><i class="fas fa-user"></i></div>
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
        author: 'Você',
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
        author: 'Você',
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
            storyElement.innerHTML = `<img src="${story.image}" alt="${story.author}">`;
        } else {
            storyElement.innerHTML = `
                <div style="text-align: center; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div style="font-size: 32px;">${story.avatar}</div>
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
    const newStory = {
        id: `s${Date.now()}`,
        author: 'Você',
        avatar: '🌟',
        viewed: false,
        image: previewImg.src
    };

    stories.unshift(newStory);
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

    if (story.image) {
        storyImage.src = story.image;
        storyImage.style.display = 'block';
        storyPlaceholder.style.display = 'none';
    } else {
        storyImage.style.display = 'none';
        storyPlaceholder.style.display = 'flex';
        document.getElementById('storyPlaceholderName').textContent = story.author;
        storyPlaceholder.querySelector('.placeholder-avatar').textContent = story.avatar;
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
function setupEventListeners() {
    submitPostBtn.addEventListener('click', createPost);
    cancelPostBtn.addEventListener('click', () => {
        postInput.value = '';
        postImageData = null;
        postImagePreview.style.display = 'none';
    });
    postInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') createPost();
    });

    searchInput.addEventListener('input', (e) => renderPosts(e.target.value));

    settingsBtn.addEventListener('click', () => showModal(settingsModal));
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            hideModal(modal);
        });
    });

    themeToggleBtn.addEventListener('click', toggleTheme);

    submitCommentBtn.addEventListener('click', addComment);
    commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addComment();
    });

    addStoryBtn.addEventListener('click', openStoryCreator);
    storyUploadArea.addEventListener('click', () => storyFileInput.click());
    storyFileInput.addEventListener('change', handleStoryUpload);
    changeImageBtn.addEventListener('click', changeStoryImage);
    postStoryBtn.addEventListener('click', postStory);
    closeStoryBtn.addEventListener('click', () => hideModal(storyViewerModal));
    prevStoryBtn.addEventListener('click', prevStory);
    nextStoryBtn.addEventListener('click', nextStory);

    postFileInput.addEventListener('change', handlePostImageUpload);

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            hideModal(modal);
        });
    });
}
