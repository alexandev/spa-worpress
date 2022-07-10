export function PostCard (props) {
    let {id, date,slug,title, _embedded} = props;
    let dateFormat = new Date(date).toLocaleString();
    let urlPoster = _embedded['wp:featuredmedia'] 
        ? _embedded['wp:featuredmedia'][0].source_url
        : "app/assets/React.png";

    document.addEventListener('click', e => {
        if( !e.target.matches('.post-card a') ) return false;
        localStorage.setItem('wpPostId', e.target.dataset.id);
    });
    return `
        <article class="post-card">
            <img src="${urlPoster}" alt="${title.rendered}" />
            <h2>${title.rendered}</h2>
            <p>
                <time datatime=''> ${dateFormat} </time>
                <a data-id='${id}' href="#/${slug}" target=''> Ver publicacion </a>
            </p>
        </article>
    `;
}