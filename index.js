
let postsEl = document.getElementById('posts')

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {           
        const postsArr = data.slice(0,2)    
        console.log(postsArr);
        
        for (const post of postsArr) {
          let postTitleEl = document.createElement('h3')
          let postBodyEl = document.createElement('p')
          
          postTitleEl.className = 'post-title'
          postTitleEl.textContent = post.title
          postBodyEl.textContent = post.body
          postsEl.appendChild(postTitleEl)
          postsEl.appendChild(postBodyEl)
        }
        
    })

    document.getElementById('post-form').addEventListener('submit', e => {
      e.preventDefault();
      postTitle = document.getElementById('blog-title').value;
      postBody = document.getElementById('blog-body').value;
  
      const postData = { title: postTitle, body: postBody };
  
      fetch('https://apis.scrimba.com/jsonplaceholder/posts', {
          method: "POST",
          body: JSON.stringify(postData),
          headers: { "Content-Type": "application/json" }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          let postTitleEl = document.createElement('h3');
          let postBodyEl = document.createElement('p');
          postTitleEl.className = 'post-title';
          postTitleEl.textContent = data.title;
          postBodyEl.textContent = data.body;  
          
          let postsEl = document.getElementById('posts');
          if (postsEl.firstChild) {
              postsEl.insertBefore(postBodyEl, postsEl.firstChild);
              postsEl.insertBefore(postTitleEl, postsEl.firstChild);
          } else {
              postsEl.appendChild(postTitleEl);
              postsEl.appendChild(postBodyEl);
          }
      })
      .catch(error => {
          console.error('Error posting blog:', error);
      });
  });
