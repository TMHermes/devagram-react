import imgSetaEsquerda from '../../public/images/setaEsquerda.svg';
import CabecalhoComAcoes from '../componentes/cabecalhoComAcoes';
import Botao from '../botao';
import Avatar from '../avatar';


export default function CabecalhoPerfil({
    usuario
}) {
    return (
        <div className='cabecalhoPerfil largura30pctDesktop'>
            <CabecalhoComAcoes
                iconeEsquerda={imgSetaEsquerda}
                titulo={usuario.nome}
            />
            <div className='statusPerfil'>
                <Avatar src={usuario.avatar} />
                <div className='informacoesPerfil'>
                    <div className='statusContainer'>
                        <div className='status'>
                            <strong>15</strong>
                            <span>Publicacoes</span>
                        </div>

                        <div className='status'>
                            <strong>120</strong>
                            <span>Seguidores</span>
                        </div>

                        <div className='status'>
                            <strong>135</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>

                    <Botao
                        texto={'Seguir'}
                        cor='primaria' 
                    />
                </div>
            </div>
        </div>
    )
}