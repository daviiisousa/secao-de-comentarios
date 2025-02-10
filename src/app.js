const campo = document.getElementById("comentarios");

async function getProduct() {
  try {
    const result = await fetch("../src/data/data.json");
    if (!result.ok) throw new Error("Erro ao carregar o arquivo JSON");

    const data = await result.json();
    console.log(data);

    campo.innerHTML = data.comments
      .map(
        (comment) => `
                <div class=divComentario>
                        <div class="perfilEScore">
                            <div class="divDoScore">
                                <button><img src="../images/icon-plus.svg" alt="icon de mais"/></button>
                                <p class="score">${comment.score}</p>
                                <button>
                                    <img src="../images/icon-minus.svg" alt="icon de menos"/>
                                </button>
                            
                            </div>
                            <div class="perfilEComentario">
                                <div class="perfilECompartilhamento">
                                    <div class="divDoPerfil">
                                        <img src=${comment.user.image.png} />
                                        <p class="nomeUsuario"><strong>${comment.user.username}</strong></p>
                                        <p class="dataDeCriaçao">${comment.createdAt}</p>
                                    </div>
                                    <button class="compartilhamento">
                                        <img src="../images/icon-reply.svg" alt="icon de compartilhamento" />
                                        Reply
                                    </button>
                                </div>
                                <article>
                                    <p class="comentario">${comment.content}</p>
                                </article>
                        </div>
                    </div>                 
                </div>
            `
      )
      .join("");
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    campo.innerHTML = "<p>Erro ao carregar os comentários.</p>";
  }
}

getProduct();
