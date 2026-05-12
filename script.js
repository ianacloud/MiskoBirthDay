const questions = [
    {
        q: "Ideálne ráno začínaš...",
        a: { text: "Kávou v prírode", img: "kava.png" },
        b: { text: "Výšľapom na bicykli", img: "bike.png" }
    },
    {
        q: "Na ceste stretneš zvieratko:",
        a: { text: "Zajko alebo nutria", img: "zajko.png" },
        b: { text: "Lama alebo diviačik", img: "lama.png" }
    },
    {
        q: "Vyhladol si, čo si dáme?",
        a: { text: "Pizzu", img: "pizza.png" },
        b: { text: "Bohatý brunch", img: "brunch.png" }
    },
    {
        q: "Aký typ relaxu preferuješ?",
        a: { text: "Piknik na luke", img: "luka.png" },
        b: { text: "Potulky po lúkach", img: "potulky.png" }
    },
    {
        q: "Ideálny deň?",
        a: { text: "Zvieratka a jedlo", img: "jedlo.png" },
        b: { text: "Zvieratká a prechádzka", img: "priroda.png" }
    }
];

let currentQuestion = 0;
let scoreA = 0;
let scoreB = 0;

function startQuiz() {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('question-box').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('current-number').innerText = currentQuestion + 1;
    document.getElementById('question-text').innerText = q.q;
    
    // Nastavenie obsahu tlačidiel s obrázkami
    document.getElementById('btnA').innerHTML = `<img src="${q.a.img}" alt="A"> <span>${q.a.text}</span>`;
    document.getElementById('btnB').innerHTML = `<img src="${q.b.img}" alt="B"> <span>${q.b.text}</span>`;
}

function handleAnswer(choice) {
    if (choice === 'A') scoreA++;
    else scoreB++;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function fireConfetti() {
    var count = 200;
    var defaults = { origin: { y: 0.7 }, zIndex: 1000 };
    function fire(particleRatio, opts) {
        confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}

function showResult() {
    // Skryjeme box s otázkami, nie celý kontajner
    document.getElementById("question-box").classList.add("hidden");
    
    const resultDiv = document.getElementById("result-container");
    resultDiv.classList.remove("hidden");

    let finalTitle = "";
    let finalDesc = "";
    let prizeImgUrl = "";
    let bookingUrl = "";

    if (scoreA >= scoreB) {
        finalTitle = "Pohoda a Brunch! 🥐";
        finalDesc = "Michal, tvojím darčekom je kľudné do/popoludnie s výborným jedlom v prírode.";
        prizeImgUrl = "brunch-lamy.png";
        bookingUrl = "https://www.alpacafarm.org/kava-s-alpakami-v-petrzalke/"; 
    } else {
        finalTitle = "Aktívny výlet s lamami! 🦙";
        finalDesc = "Priprav sa na poriadne dobrodružstvo a čerstvý vzduch v rakúskych horách.";
        prizeImgUrl = "prechadzka-lamy.png";
        bookingUrl = "https://www.booking.com/attractions/at/prswtmioaqfz-alpaca-and-llama-hike-moedling-near-vienna.sk.html?source=city-product-card&ufi=-1983146&aid=356980&label=mkt123sc-707f2ff5-b9de-4af2-8ea1-965cf88077a4&date=2026-05-11&timeslot=ATS-PRSWTmIOAqFZ-202605111200-nullnull&ticket_type=OFZ7TFwnYNHu";
    }

    document.getElementById("result-title").innerText = finalTitle;
    document.getElementById("result-desc").innerText = finalDesc;
    document.getElementById("prize-img").src = prizeImgUrl;
    document.getElementById("booking-link").href = bookingUrl;

    // Spustíme konfety pre Michala!
    fireConfetti();
}

// Funkcia na vygenerovanie náhodnej koláže
function generateCollage() {
    const collageContainer = document.getElementById('photo-collage');
    if (!collageContainer) return;

    collageContainer.innerHTML = ''; 
    const totalPhotos = 100; 
    const slots = 80; // Pri rôznych veľkostiach stačí menej slotov, aby sa neprekrývali
    
    let usedNumbers = new Set();

    while (usedNumbers.size < slots) {
        let randomNum = Math.floor(Math.random() * totalPhotos) + 1;
        usedNumbers.add(randomNum);
    }

    usedNumbers.forEach(num => {
        const img = document.createElement('img');
        img.src = `foto/${num}.webp`; 

        // Náhodne priradíme veľkosť niektorým fotkám
        const rand = Math.random();
        if (rand > 0.9) {
            img.classList.add('large'); // 10% šanca na veľký štvorec
        } else if (rand > 0.8) {
            img.classList.add('wide');  // 10% šanca na široký obdĺžnik
        }

        collageContainer.appendChild(img);
    });
}

// UPRAVENÉ EXISTUJÚCE FUNKCIE:

function startQuiz() {
    generateCollage(); // Zmena pozadia pri štarte
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('question-box').classList.remove('hidden');
    showQuestion();
}

function handleAnswer(choice) {
    if (choice === 'A') scoreA++;
    else scoreB++;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        generateCollage(); // Zmena pozadia pri každej novej otázke
        showQuestion();
    } else {
        generateCollage(); // Zmena pozadia pri výsledku
        showResult();
    }
}

// Zavoláme raz aj pri úplnom načítaní stránky
window.onload = generateCollage;
 
