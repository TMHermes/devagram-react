import { useEffect, useState } from "react";
import FeedService from "../../services/FeedService";
import Postagem from "./Postagem";


const feedService = new FeedService();


export default function Feed({ usuarioLogado, idUsuario }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);

    useEffect(async () => {
        setListaDePostagens([]);
        const { data } = await feedService.carregarPostagens(idUsuario);

        const postagensFormatadas = data.map((postagem) => (
            {
                id: postagem._id,
                usuario: {
                    id: postagem.userId,
                    nome: postagem.usuario.nome,
                    avatar: postagem.usuario.avatar
                },
                fotoDoPost: postagem.foto,
                descricao: postagem.descricao,
                curtidas: postagem.likes,
                comentario: postagem.comentarios.map(c => ({
                    nome: c.nome,
                    mensagem: c.comentario
                }))

            }
        ));

        setListaDePostagens(postagensFormatadas);
    }, [usuarioLogado, idUsuario]);


    if (!listaDePostagens.length) {
        return null;
    }

    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagens.map(dadosPostagem => (
                <Postagem
                    key={dadosPostagem.id}
                    {...dadosPostagem}
                    usuarioLogado={usuarioLogado}
                />
            ))
            }
        </div>

    );
}