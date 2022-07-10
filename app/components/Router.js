import api from '../helpers/wp_api.js';
import { ajax } from '../helpers/ajax.js';
import { PostCard } from './PostCard.js';
import { Post } from './Post.js';
import { SearchCard } from './SearchCard.js';
import { ContactForm } from './ContactForm.js';

export async function Router(){
    
    const d = document;
    const $main = d.getElementById('main');
    const w = window;
    let { hash } = location;

    $main.innerHTML = null;

    if( !hash || hash === '#/' ){
        await ajax({
            url: api.POSTS,
            cbSucess: (posts) => {
                let html = '';
                posts.forEach( post => html+= PostCard(post) );
                $main.innerHTML = html;
            }
        });
    }else if( hash.includes('#/search') ){

        let query = localStorage.getItem('wpSearch');
        console.log(`${api.SEARCH}${query}`)
        if(!query){
            d.querySelector('.loader').style.display = "none";
            return false;
        } 

        await ajax({
            url: `${api.SEARCH}${query}`,
            cbSucess: (search) => {
                console.log(search);

                let html ="";

                if(search.length === 0){
                    html = `
                        <p class="error">
                            No existen resultados de busqueda para el termino <i >"${query}"</i>
                        </p>
                    `;

                }else{
                    search.forEach( post => html += SearchCard(post) )
                }
                $main.innerHTML = html;
            }
        });

    }else if( hash === '#/contacto' ){
        $main.appendChild(ContactForm());

    }else {
        $main.innerHTML = '<h2>Aqui cargara el contenido de el Post previamente seleccionado</h2>';

        console.log(`${api.POST}/${localStorage.getItem('wpPostId')}`);

        await ajax({
            url: `${api.POST}/${localStorage.getItem('wpPostId')}`,
            cbSucess: (post) => {
                console.log(post);
                $main.innerHTML = Post(post);
            }
        });
        
    }

    d.querySelector('.loader').style.display = 'none';
    
}





    document.addEventListener('click', (e)=>{
        // console.log(e.target);
            if(e.target.matches('.dropdown-toggle.nav-link.nav')){
                let $navHolder = document.querySelector('.nav-holder');
                if($navHolder){
                    $navHolder.classList.add('active');
                }
            }
        
    });
