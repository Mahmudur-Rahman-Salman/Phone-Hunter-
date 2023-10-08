// load phones

const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phonesContainer");
  phonesContainer.textContent = "";
  //   Show more button
  const seeMore = document.getElementById("seeMoreBtn");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    seeMore.classList.remove("d-none");
  } else {
    seeMore.classList.add("d-none");
  }
  // not found error message
  const notFound = document.getElementById("not-found-message");
  if (phones.length === 0) {
    notFound.classList.remove("d-none");
    //stop the spinner
    toggleLoaderSpinner(false);
  } else {
    notFound.classList.add("d-none");
  }
  // display phone
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = ` 
        <div class="card text-center">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto m-2" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6 class="card-text">
                    Brand: ${phone.brand}
                </h6>
                <p class="card-text">
                    ${phone.slug}
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-outline-primary">Show more details</button>
            </div>
       </div>
        `;
    phonesContainer.appendChild(phoneDiv);
    //stop the spinner
    toggleLoaderSpinner(false);
  });
};

// load More data
const processMoreData = (dataLimit) => {
  toggleLoaderSpinner(true);
  const searchBox = document.getElementById("search-box");
  const searchText = searchBox.value;
  loadPhones(searchText, dataLimit);
};

// search functionality

document.getElementById("btn-search").addEventListener("click", function () {
  // start the spinner
  //   toggleLoaderSpinner(true);
  //   const searchBox = document.getElementById("search-box");
  //   const searchText = searchBox.value;
  //   loadPhones(searchText);
  processMoreData(10);
});

// Spinner loader showing while data loading

const toggleLoaderSpinner = (isLoading) => {
  const spinnerLoading = document.getElementById("spinner-loader");
  if (isLoading) {
    spinnerLoading.classList.remove("d-none");
  } else {
    spinnerLoading.classList.add("d-none");
  }
};

// load more data

document.getElementById("btn-see-more").addEventListener("click", function () {
  processMoreData();
});



// single load phone details 

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url); 
    const data = await res.json(); 
    console.log(data.data); 
}


// show daya on keypress 

document.getElementById("search-box").addEventListener("keypress", function(e){
    // console.log(e.key); 
    if(e.key === 'Enter'){
        processMoreData(10); 
    }
} )