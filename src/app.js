const campo = document.getElementById("comentarios");
const respostas = document.getElementById("respostas");

async function getComments() {
  try {
    const result = await fetch("../src/data/data.json");
    if (!result.ok) throw new Error("Erro ao carregar o arquivo JSON");

    const data = await result.json();
    console.log(data);

    campo.innerHTML = data.comments
      .map(
        (comment) => `
                <div class="divComentario">
                        <div class="perfilEScore">
                            <div class="divDoScore">
                                <button><img src="../images/icon-plus.svg" alt="icon de mais"/></button>
                                <p class="score">${comment.score}</p>
                                <button>
                                    <img src="../images/icon-minus.svg" alt="icon de menos"/>
                                </button>
                            
                            </div>
                            <div class="perfilEComentario">
                                <div class="perfilEResponder">
                                    <div class="divDoPerfil">
                                        <img src=${comment.user.image.png} />
                                        <p class="nomeUsuario"><strong>${comment.user.username}</strong></p>
                                        <p class="dataDeCriaçao">${comment.createdAt}</p>
                                    </div>
                                    <button class="responder">
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

    respostas.innerHTML = data.comments[1].replies
      .map(
        (resposta) => `              
                    <div class="divComentario respostas">
                        <div class="perfilEScore">
                            <div class="divDoScore">
                                <button><img src="../images/icon-plus.svg" alt="icon de mais"/></button>
                                <p class="score">${resposta.score}</p>
                                <button>
                                    <img src="../images/icon-minus.svg" alt="icon de menos"/>
                                </button>
                            
                            </div>
                            <div class="perfilEComentario">
                                <div class="perfilEResponder">
                                    <div class="divDoPerfil">
                                        <img src=${resposta.user.image.png} />
                                        <p class="nomeUsuario"><strong>${resposta.user.username}</strong></p>
                                        <p class="dataDeCriaçao">${resposta.createdAt}</p>
                                    </div>
                                    <button class="responder">
                                        <img src="../images/icon-reply.svg" alt="icon de compartilhamento" />
                                        Reply
                                    </button>
                                </div>
                                <article>
                                    <p class="comentario"><span class="arrobaUsuario">@${resposta.replyingTo}</span>${resposta.content}</p>
                                </article>
                        </div>
                    </div>                 
                </div>`
      )
      .join("");
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    campo.innerHTML = "<p>Erro ao carregar os comentários.</p>";
  }
}

getComments();
