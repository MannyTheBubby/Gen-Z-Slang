// --- DATA ---
const SLANG_DATA = [
    { id: '1', term: 'Yeet', definition: 'To throw something with force and lack of concern; also an exclamation of excitement.', year: 2014, example: 'He just yeeted that empty can into the trash.', tags: ['verb', 'exclamation', 'classic'], vibe: 'chaotic' },
    { id: '2', term: 'Ghosting', definition: 'Ending a relationship by cutting off all communication without explanation.', year: 2015, example: 'I thought we had a great date, but then she ghosted me.', tags: ['dating', 'toxic'], vibe: 'negative' },
    { id: '3', term: 'Bet', definition: 'Yes, okay, or "it\'s on". Used to confirm plans or agreement.', year: 2016, example: '"Want to go get tacos?" "Bet."', tags: ['agreement', 'common'], vibe: 'positive' },
    { id: '4', term: 'Simp', definition: 'Someone who does way too much for a person they like, usually with no reciprocation.', year: 2019, example: 'He bought her a car after one date? What a simp.', tags: ['insult', 'dating'], vibe: 'negative' },
    { id: '5', term: 'No Cap', definition: 'No lie; for real. "Cap" means lie.', year: 2019, example: 'That was the best burger I\'ve ever had, no cap.', tags: ['truth', 'phrase'], vibe: 'positive' },
    { id: '6', term: 'Sus', definition: 'Suspicious or shady. Popularized by the game Among Us.', year: 2020, example: 'Why are you being so quiet? That\'s kinda sus.', tags: ['gaming', 'adjective'], vibe: 'negative' },
    { id: '7', term: 'Rizz', definition: 'Charisma, specifically in attracting romantic partners. Short for "charisma".', year: 2022, example: 'He has unspoken rizz. Everyone falls for him.', tags: ['compliment', 'trait'], vibe: 'positive' },
    { id: '8', term: 'Delulu', definition: 'Delusional. Believing something unrealistic, usually about romance.', year: 2023, example: 'Thinking he\'s going to text you back after 3 months is pure delulu.', tags: ['state of mind', 'funny'], vibe: 'chaotic' },
    { id: '9', term: 'Skibidi', definition: 'A nonsense word often associated with chaos, bad vibes, or just random filler. Popularized by Skibidi Toilet.', year: 2023, example: 'That rizz is so skibidi.', tags: ['nonsense', 'brainrot'], vibe: 'chaotic' },
    { id: '10', term: 'Fanum Tax', definition: 'The act of stealing a portion of someone\'s food. Originates from streamer Kai Cenat\'s friend Fanum.', year: 2023, example: 'Hey, let me get a fry. Gotta pay the Fanum tax.', tags: ['action', 'twitch'], vibe: 'neutral' },
    { id: '11', term: 'Mewing', definition: 'A tongue exercise to define the jawline. Often used to signal "I can\'t talk, I\'m looking good".', year: 2024, example: 'Stop asking me questions, I\'m mewing.', tags: ['physical', 'meme'], vibe: 'neutral' },
    { id: '12', term: 'Brainrot', definition: 'The state of consuming so much nonsensical internet content that one loses the ability to think clearly.', year: 2024, example: 'Scrolling TikTok for 6 hours gave me severe brainrot.', tags: ['state of mind', 'meta'], vibe: 'negative' },
    { id: "13", term: "NPC", definition: "Someone who lacks original thought, acts predictably, or just follows the crowd like a background character in a video game.", year: 2016, example: "He's such a NPC", tags: ['negative'], vibe: 'negative'},
    { id: "14", term: "Cringe", definition: "Something that is highly awkward, embarassing, or silly.", year: 2025, example: "That joke he made at dinner was so cringe that everyone just went silent.", tags: ["brainrot"], vibe: "positive"},
    { id: "15", term: "6-7", definition: "A silly slang that carries no actual meaning. Popularized by the song Doot Doot (6 7).", year: 2025, example: "The kids went crazy went the teacher said '67' in the class.", tags: ["silly"], vibe: "neutral"},
    { id: "16", term: "Crash Out", definition: "Having a sudden emotional overload due to feeling overwhelmed.", year: 2025, example: "Little Timmy crashed out when his mom said that he couldn't have ice cream.", tags: ["negative", "silly"], vibe:"neutral"},
    { id: "17", term: "🥀", definition: "A symbol for heartbreak or a brainrot term used by Gen Z.", year: 2025, example: "Telling people how you feel in the big 25? 🥀🥀🥀", tags: ["phrase"], vibe: "positive"},
];

// --- STATE ---
let state = {
    sortOrder: 'asc', // 'asc' or 'desc'
    selectedTerm: null
};

// --- CONSTANTS ---
const vibeColors = {
    positive: 'border-neon-green shadow-neon-green/20 text-neon-green',
    negative: 'border-neon-pink shadow-neon-pink/20 text-neon-pink',
    neutral: 'border-neon-blue shadow-neon-blue/20 text-neon-blue',
    chaotic: 'border-neon-purple shadow-neon-purple/20 text-neon-purple',
};

const vibeBg = {
    positive: 'bg-neon-green/10',
    negative: 'bg-neon-pink/10',
    neutral: 'bg-neon-blue/10',
    chaotic: 'bg-neon-purple/10',
};

const vibeGradients = {
    positive: 'from-neon-green/20 to-transparent',
    negative: 'from-neon-pink/20 to-transparent',
    neutral: 'from-neon-blue/20 to-transparent',
    chaotic: 'from-neon-purple/20 to-transparent',
};

// --- DOM ELEMENTS ---
const cardsList = document.getElementById('cardsList');
const searchInput = document.getElementById('searchInput');
const sortButton = document.getElementById('sortButton');
const sortIcon = document.getElementById('sortIcon');
const introSection = document.getElementById('introSection');

const modalOverlay = document.getElementById('modalOverlay');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalGradient = document.getElementById('modalGradient');

const modalTerm = document.getElementById('modalTerm');
const modalYear = document.getElementById('modalYear');
const modalVibe = document.getElementById('modalVibe');
const modalDef = document.getElementById('modalDef');
const modalExample = document.getElementById('modalExample');
const modalTags = document.getElementById('modalTags');

// --- LOGIC ---

function render() {
// Filter
let data = SLANG_DATA.filter(item => {
    if (!state.search) return true;
    const s = state.search.toLowerCase();
    return item.term.toLowerCase().includes(s) || 
            item.definition.toLowerCase().includes(s) || 
            item.year.toString().includes(s);
});

// Sort
data.sort((a, b) => state.sortOrder === 'asc' ? a.year - b.year : b.year - a.year);

// Toggle Intro
introSection.style.display = state.search ? 'none' : 'block';

// Render Cards
cardsList.innerHTML = '';

if (data.length === 0) {
    cardsList.innerHTML = `<div class="text-center py-20 text-gray-500"><p class="text-xl">No slang found. That's kinda sus.</p></div>`;
    return;
}

data.forEach((term, index) => {
    const isLeft = (index % 2 === 0);
    const sideClass = isLeft ? 'flex-row-reverse' : '';
    const paddingClass = isLeft ? 'md:pr-12' : 'md:pl-12';
    
    const cardHTML = `
    <div class="relative flex items-center justify-between w-full mb-8 ${sideClass}">
        <!-- Spacer -->
        <div class="hidden md:block w-5/12"></div>
        
        <!-- Node -->
        <div class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex flex-col items-center justify-center w-10 z-10">
        <div class="w-4 h-4 rounded-full border-2 bg-dark-bg ${vibeColors[term.vibe].split(' ')[0]} z-20"></div>
        </div>

        <!-- Card -->
        <div class="w-full md:w-5/12 pl-12 md:pl-0 ${paddingClass}">
        <div 
            class="slang-card group cursor-pointer relative p-6 rounded-xl border border-gray-800 bg-card-bg/80 backdrop-blur-md hover:border-opacity-100 hover:scale-[1.02] transition-all duration-300 ease-out shadow-lg hover:shadow-xl animate-slide-up"
            style="animation-delay: ${index * 0.1}s"
            data-id="${term.id}"
        >
            <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border ${vibeColors[term.vibe].split(' ')[0]} shadow-[0_0_15px_rgba(0,0,0,0.3)]"></div>
            
            <div class="relative z-10">
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-3xl font-display font-bold text-white tracking-tight">${term.term}</h3>
                <span class="px-2 py-1 rounded text-xs font-mono font-bold uppercase tracking-widest ${vibeBg[term.vibe]} ${vibeColors[term.vibe].split(' ')[2]}">
                ${term.year}
                </span>
            </div>
            
            <p class="text-gray-400 text-sm line-clamp-2 mb-4 font-light">
                ${term.definition}
            </p>

            <div class="flex items-center gap-3 text-xs text-gray-500 font-mono">
                <div class="flex items-center gap-1">
                <i data-lucide="hash" class="w-3 h-3"></i>
                <span>${term.tags[0]}</span>
                </div>
                <div class="flex items-center gap-1">
                <i data-lucide="calendar" class="w-3 h-3"></i>
                <span>${term.year}</span>
                </div>
                <div class="ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity text-white flex items-center gap-1">

            </div>
            </div>
        </div>
        </div>
    </div>
    `;
    cardsList.insertAdjacentHTML('beforeend', cardHTML);
});

// Re-init icons for new content
lucide.createIcons();

// Attach click listeners
document.querySelectorAll('.slang-card').forEach(card => {
    card.addEventListener('click', () => {
    const id = card.getAttribute('data-id');
    const term = SLANG_DATA.find(t => t.id === id);
    openModal(term);
    });
});
}

function openModal(term) {
    state.selectedTerm = term;

    // Populate Data
    modalTerm.textContent = term.term;
    modalDef.textContent = term.definition;
    modalExample.textContent = `"${term.example}"`;
    modalYear.textContent = term.year;
    modalYear.className = `px-3 py-1 rounded-full border bg-black/30 text-xs font-mono uppercase tracking-widest ${vibeColors[term.vibe]}`;

    modalVibe.textContent = `Vibe: ${term.vibe}`;

    // Tags
    modalTags.innerHTML = term.tags.map(tag => 
        `<span class="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400 font-mono">#${tag}</span>`
    ).join('');

    // Gradient
    modalGradient.className = `absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${vibeGradients[term.vibe]} pointer-events-none`;

    // Show
    modalOverlay.classList.remove('hidden');
}

    function closeModal() {
        modalOverlay.classList.add('hidden');
        state.selectedTerm = null;
    }

// --- EVENTS ---
    searchInput.addEventListener('input', (e) => {
    state.search = e.target.value;
    render();
});

sortButton.addEventListener('click', () => {
state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
// Update icon
sortButton.innerHTML = state.sortOrder === 'asc' 
    ? `<i data-lucide="arrow-down" class="w-5 h-5"></i>` 
    : `<i data-lucide="arrow-up" class="w-5 h-5"></i>`;
render();
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// --- INIT ---
lucide.createIcons();
render();
