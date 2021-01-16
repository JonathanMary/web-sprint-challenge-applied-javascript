import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const card = document.createElement("div");
  const headlineDiv = document.createElement("div");
  const author = document.createElement("div");
  const imgContainer = document.createElement("div");
  const image = document.createElement("img");
  const spanName = document.createElement("span");

  card.classList.add("card");
  headlineDiv.classList.add("headline");
  headlineDiv.textContent = `${article.headline}`;
  author.classList.add("author");
  imgContainer.classList.add("img-container");
  image.src = `${article.authorPhoto}`;
  spanName.textContent = `By ${article.authorName}`;

  card.appendChild(headlineDiv);
  card.appendChild(author);
  author.appendChild(imgContainer);
  imgContainer.appendChild(image);
  author.appendChild(spanName);

  card.addEventListener("click", event => console.log(event.target.parentNode.querySelector(".headline").textContent));
  
  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get(`https://lambda-times-api.herokuapp.com/articles`)
       .then(data => {
         //get the articles by topic, parse articles into each topic then append it.
         const query = data.data.articles;
         Object.keys(query).forEach(key => {
           query[key].forEach(article => {
             let newCard = Card(article);
             newCard.classList.add(key);
             document.querySelector(selector).appendChild(newCard);

           });
        });
      })
       .catch(err => console.log(err))
}

window.addEventListener("load", event => document.querySelectorAll(".tab").forEach(div => {
  div.addEventListener("click", event => {
    let select = event.target.textContent;
    
    document.querySelectorAll(".card").forEach(x => {
      if(select === "node.js"){ select = "node"}

      if(x.className.includes(select)){
        x.style.display = "block";
      }else{
        x.style.display = "none";
      }
    })
  });
}));

export { Card, cardAppender }


