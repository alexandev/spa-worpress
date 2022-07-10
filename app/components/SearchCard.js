export function SearchCard(props){
    let {id, title, _embedded} = props;
    let {slug, featured_media_src_url, date} = _embedded.self[0];
    let dateFormat = new Date(date).toLocaleString();
    
    return `
        <article class='post-card'>
            <img src="${featured_media_src_url}" alt="${title}" />
            <h2>${title}</h2>
            <p>
                <time datatime=''> ${dateFormat} </time>
                <a href="#/${slug}" data-id="${id}">Ver publicacion</a>
            </p>
        </article>
    `;
}

