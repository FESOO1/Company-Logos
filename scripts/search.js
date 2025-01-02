const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const searchOutputThemselves = document.querySelector('.company-logos-output');
const logosSearchNameArray = [];
const logosNameArray = [];
const logosDomainArray = [];
const logosIconArray = [];
// https://api.api-ninjas.com/v1/logo?name=Microsoft

// SEARCH FOR A COMPANY

async function displayLogos(e) {
    e.preventDefault();
    const response = await fetch(`https://api.brandfetch.io/v2/search/${searchBar.value}?c=1idUXSK9JRPRbE6bhZn`);
    const logoData = await response.json();

    // 
    const searchBarItself = searchBar.value.toLowerCase();

    // CREATING AN ELEMENT
    if (!(logosSearchNameArray.includes(searchBarItself))) {
        const output = document.createElement('div');
        output.classList.add('company-logo-output-itself');
        output.innerHTML = `
            <button type="button" class="company-logo-output-itself-favorite-button">
                <svg class="company-logo-output-itself-favorite-button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <div class="company-logo-output-itself-image">
                <img src="${logoData[0].icon}" class="company-logo-output-itself-image-itself">
            </div>
            <div class="company-logo-output-itself-text">
                <h2 class="company-logo-output-itself-text-itself">${logoData[0].name}</h2>
                <a href="https://${logoData[0].domain}" target="_blank" class="company-logo-output-itself-text-itself-link">${logoData[0].domain}</a>
            </div>
        `;
        searchOutputThemselves.appendChild(output);

        // RESETTING THE INPUT
        searchBar.value = '';
    } else {
        console.log('It is in the array.');
    };


    // HANDLING THE SAVE AS FAVORITE BUTTON
    const favoriteButtons = document.querySelectorAll('.company-logo-output-itself-favorite-button');

    for (let i = 0; i < favoriteButtons.length; i++) {
        // FAVORITE BUTTONS
        favoriteButtons[i].addEventListener('click', () => {
            favoriteButtons[i].classList.add('company-logo-output-itself-favorite-button-saved');

            // PUSHING THE OUTPUTS INTO ARRAYS
            logosSearchNameArray.push(logoData[0].name.toLowerCase());
            logosNameArray.push(logoData[0].name);
            logosDomainArray.push(logoData[0].domain);
            logosIconArray.push(logoData[0].icon);

            // AND STORING THEM INTO LOCAL STORAGE
            localStorage.setItem('logosSearchNameArrayLS', JSON.stringify(logosSearchNameArray));
            localStorage.setItem('logosNameArrayLS', JSON.stringify(logosNameArray));
            localStorage.setItem('logosDomainArrayLS', JSON.stringify(logosDomainArray));
            localStorage.setItem('logosIconArrayLS', JSON.stringify(logosIconArray));
        });
    };
};

// SEARCH BUTTON
searchButton.addEventListener('click', displayLogos);

// DISPLAY SEARCHED LOGOS

function displaySearchedLogos() {
    const logosSearchNameArrayLS = JSON.parse(localStorage.getItem('logosSearchNameArrayLS'));
    const logosNameArrayLS = JSON.parse(localStorage.getItem('logosNameArrayLS'));
    const logosDomainArrayLS = JSON.parse(localStorage.getItem('logosDomainArrayLS'));
    const logosIconArrayLS = JSON.parse(localStorage.getItem('logosIconArrayLS'));

    if (logosNameArrayLS) {
        for (let i = 0; i < logosNameArrayLS.length; i++) {
            const output = document.createElement('div');
            output.classList.add('company-logo-output-itself');
            output.innerHTML = `
                <button type="button" class="company-logo-output-itself-favorite-button company-logo-output-itself-favorite-button-saved">
                    <svg class="company-logo-output-itself-favorite-button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                        <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <div class="company-logo-output-itself-image">
                    <img src="${logosIconArrayLS[i]}" class="company-logo-output-itself-image-itself">
                </div>
                <div class="company-logo-output-itself-text">
                    <h2 class="company-logo-output-itself-text-itself">${logosNameArrayLS[i]}</h2>
                    <a href="https://${logosDomainArrayLS[i]}" target="_blank" class="company-logo-output-itself-text-itself-link">${logosDomainArrayLS[i]}</a>
                </div>
                <button type="button" class="company-logo-output-itself-copy-icon-url">COPY ICON URL</button>
            `;
            searchOutputThemselves.appendChild(output);


            // PUSHING THE VALUES INTO THE ARRAY
            logosSearchNameArray.push(logosSearchNameArrayLS[i]);
            logosNameArray.push(logosNameArrayLS[i]);
            logosDomainArray.push(logosDomainArrayLS[i]);
            logosIconArray.push(logosIconArrayLS[i]);
            
            
            // HANDLING THE SAVE AS FAVORITE BUTTON
            const favoriteButtons = document.querySelectorAll('.company-logo-output-itself-favorite-button');
            const copyIconUrlButtons = document.querySelectorAll('.company-logo-output-itself-copy-icon-url');

            for (let i = 0; i < favoriteButtons.length; i++) {
                favoriteButtons[i].addEventListener('click', () => {
                    
                    output.parentNode.removeChild(output);
                    // REMOVING THE CLASS FROM THE CLICKED BUTTON
                    favoriteButtons[i].classList.remove('company-logo-output-itself-favorite-button-saved');

                    // REMOVING AN ELEMENT FROM ARRAYS
                    logosSearchNameArray.splice(i, 1);
                    logosNameArray.splice(i, 1);
                    logosDomainArray.splice(i, 1);
                    logosIconArray.splice(i, 1);

                    // UPDATING THE ARRAYS' VALUES
                    localStorage.setItem('logosSearchNameArrayLS', JSON.stringify(logosSearchNameArray));
                    localStorage.setItem('logosNameArrayLS', JSON.stringify(logosNameArray));
                    localStorage.setItem('logosDomainArrayLS', JSON.stringify(logosDomainArray));
                    localStorage.setItem('logosIconArrayLS', JSON.stringify(logosIconArray));
                });

                // COPY URL BUTTONS
                copyIconUrlButtons[i].addEventListener('click', () => {
                    navigator.clipboard.writeText(logosIconArray[i]);
                    copyIconUrlButtons[i].textContent = 'ICON URL COPIED';

                    // CHANGING THE TEXT BACK TO ITS FORM
                    setTimeout(() => {
                        copyIconUrlButtons[i].textContent = 'COPY ICON URL';
                    }, 3000);
                });
            };
        };
    };
};

displaySearchedLogos();