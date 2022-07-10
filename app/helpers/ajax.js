
export async function ajax(props){
    let {url, cbSucess} = props;

    await fetch(url)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => cbSucess(json))
        .catch(err => {
            let message = err.statusText || "Ocurrio un error al acceder a la API";

            document.getElementById("main").innerHTML=`
                <div class='error'>
                    <p>Error ${err.status}: ${message}</p>
                </div>
            `;

            document.querySelector('.loader').style.display = 'none';
            console.log(err);
        })

}
