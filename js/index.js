// loading news category
const loadNewsCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
        .catch(error => console.log(error));
}

// displaying news category
const displayNewsCategory = catagorys => {
    const catagoryContainer = document.getElementById('news-category');
    catagorys.forEach(catagory => {

        const creatDiv = document.createElement('div');
        creatDiv.innerHTML = `
        <a onclick="loadNewsDetails('${catagory.category_id}')" href="#news-category" class="text-decoration-none">${catagory.category_name}</a>
        `;
        catagoryContainer.appendChild(creatDiv);
    })
}

// loading news
const loadNewsDetails = (category_id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => displayNewsDetails(data.data))
    }
    catch (error) {
        alert('Error Occured');
    }
}

// displaying news
const displayNewsDetails = ids => {

    // sorting
    ids.sort((previous, next) => {
        return next.total_view - previous.total_view;
    })

    const cardContainer = document.getElementById('news-container');
    cardContainer.innerHTML = '';

    // displaying news found in category
    const numbersOfNews = document.getElementById('numbers-of-data');
    numbersOfNews.innerText = `${ids.length}`;

    // displaying no news found
    const noNewsFound = document.getElementById('news-found');
    if (ids.length === 0) {
        noNewsFound.classList.remove('d-none');
        const numbersOfNews = document.getElementById('numbers-of-data');
        numbersOfNews.innerText = 'No';
        toggleSpinner(false);
    }
    else {
        noNewsFound.classList.add('d-none');
    };

    ids.forEach(id => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('row');
        cardDiv.classList.add('g-0');
        cardDiv.innerHTML = `
        <div class="col-md-3 px-3 py-3">
            <img src="${id.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9 px-2">
            <div class="card-body">
                <h5 class="news-title">${id.title}</h5>
                <p class="news-text mb-5">${id.details.slice(0, 700)} ...</p>

             <div class="d-lg-flex justify-content-between d-sm-grid mt-5 pt-5 pe-5">
                 <div class="d-flex gap-2">
                     <img class="rounded-circle" src="${id.author.img}" alt="" width="30" height="30">
                     <p id="journalist">${id.author.name ? id.author.name : 'No author name found'}</p>
                 </div>

             <div class="d-flex gap-1">
                 <i class="fa-solid fa-eye mt-1"></i>
                 <p id="views" class="fw-bold">${id.total_view ? id.total_view : 'no view'}</p>
             </div>

             <div>
                 <button onclick="detailsModal('${id._id}')" data-bs-toggle="modal" data-bs-target="#showNewsDetailsModal" class="border border-none bg-light"><i class="fa-solid fa-arrow-right" id="showDetails"></i></button>
             </div>
             </div>
            </div>
        </div>
        <hr>
        `;
        cardContainer.appendChild(cardDiv);
        toggleSpinner(false);
    })
}

// spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinjner');
    if (isLoading === true) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
};

// loading for modal of news details
const detailsModal = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayDetailsModal(data.data)
    }
    catch (error) {
        alert('Error Occured');
    }
}

// display modal of news details
const displayDetailsModal = id => {
    id.forEach(modalId => {
        const modalTitle = document.getElementById('showNewsDetailsModalLabel');
        modalTitle.innerText = modalId.title;
        const modalBody = document.getElementById('news-details-modal-body');
        modalBody.innerHTML = `
        <img class="img" width="50" height="50" src="${modalId.author.img}" alt="">
        <p><span class="fw-bold">Author Name: </span> ${modalId.author.name ? modalId.author.name : "No Name"}</p>
       <div class="d-flex gap-1">
          <i class="fa-solid fa-eye mt-1"></i>       
          <p id="views" class="fw-bold">${modalId.total_view ? modalId.total_view : 'no view'} </p>        
        </div>
        <p><span class="fw-bold">Rating: </span>${modalId.rating.number ? modalId.rating.number : "No review"} <i class="fa-solid fa-star"></i></p>
        <p><span class="fw-bold">Published Date: </span> ${modalId.author.published_date ? modalId.author.published_date : "Published Date Not Found"}</p>
        <h5><span class="fw-bold">Review: </span>${modalId.rating.badge ? modalId.rating.badge : "No Review Given"}</h5>
        `
    })
};

// navbar news eventhandler
document.getElementById('news-nav').addEventListener('click', function () {
    loadNewsDetails('08');
});

// displaying blog modal
document.getElementById('blog-nav').addEventListener('click', function () {
    const blogModalTitle = document.getElementById('FaQModalLabel');
    blogModalTitle.innerText = "Frequently Asked Questions!!!";
    const blogModalBody = document.getElementById('FaQModal-body');
    blogModalBody.innerHTML = `<h3>Question-01: What Are The Differences Between VAR,LET,CONST?</h3>
     <h5>The Differences Betwenn VAR,LET and CONST are given below:</h5>
            <p>1. Var declarations are globally scoped or function scoped while let and const are block scoped.<br>
                2. Var variables can be updated and re-declared within its scope, let variables can be updated but not
                re-declared, const
                variables can neither be updated nor re-declared.<br>
                3. They are all hoisted to the top of their scope but while var variables are initialized with
                undefined, let and const variables are not initialized.<br>
                4. While var and let can be declared without being initialized, const must be initialized during
                declaration.</p>
                <h3>Question-02: What Are The Differences Between Arrow and Regular Function?</h3>
            <h5>The Differences Between Arrow and Regular Function are given below</h5>
            <p>1. Unlike regular functions, arrow functions do not have their own this. The value of this inside an
                arrow function remains
                the same throughout the lifecycle of the function and is always bound to the value of this in the
                closest non-arrow
                parent function.</p>
            <p>2. Regular functions created using function declarations or expressions are constructible and callable.
                Since regular
                functions are constructible, they can be called using the new keyword.<br>
                However, the arrow functions are only callable and not constructible, i.e arrow functions can never be
                used as
                constructor functions. Hence, they can never be invoked with the new keyword.</p>
            <h3>Question-03: What Are The Differences Between MAP,FOREACH,FILTER,FIND?</h3>
              <h5>The Differences Between MAP,FOREACH,FILTER,FIND are given Blow:</h5>
                <p>1. All of them are used in array.Map,foreach,filter,find will not modify the original array but without foreach all of them can return something.Foreach returns undefined.</p>
                <p>2. Filter has a condition wheather rest of them has none.</p>
                <h3>Question-04: Why Should You Use Template-String?</h3>
            <h5>Here are the reasons of using template-string:</h5>
            <p>Template strings are a powerful feature of modern JavaScript released in ES6. It lets us
                insert/interpolate variables and expressions into strings without needing to concatenate like in older
                versions of JavaScript.It allows us to create strings that are complex and contain dynamic elements.
                Another great thing that comes with template strings are tags.Tags are functions that take a string and
                the decomposed parts of the string as parameters and are great for converting strings to different
                entities.</p>
            <p>
                Another great feature of template strings is that we can have strings with multiple lines for better
                code readability.
                This cannot be done in an easy way with the old style of strings. With the old style of strings, we had
                to concatenate
                each line of the string to put long strings in multiple lines.
            </p>
            <p>
                Template strings can be nested in each other. This is a great feature because many people want to create
                dynamic
                strings. Template strings allow us to nest regular strings or template strings within template strings.
            </p>
            `;
})

loadNewsCategory();