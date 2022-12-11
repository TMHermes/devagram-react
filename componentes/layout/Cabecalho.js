import Image from 'next/image';
import { useState } from 'react';
import logoHorizontalImg from '../../public/images/logoHorizontal.svg';
import imagemLupa from '../../public/images/lupa.svg';
import Navegacao from './Navegacao';
import ResultadoPesquisa from './ResultadoPesquisa';



export default function Cabecalho() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState([]);

    const aoPesquisar = () => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);
    }

    const aoClicarResultadoPesquisa = (id) => {
        console.log('aoClicarResultadoPesquisa', {id});
    }

    if(termoPesquisado.length < 3) {
        return;
    }

    setResultadoPesquisa([
        {
            avatar: '',
            nome: 'Tiago',
            email: 'tiasg@dev.com',
            _id: '12345'
        }
    ])

    return (
        <header className='cabecalhoPrincipal'>
            <div className='conteudoCabecalho'>
                <div className='logoCabecalhoPrincipal'>
                    <Image
                        src={logoHorizontalImg}
                        alt='logo devagram'
                        layout='fill'
                    />
                </div>

                <div className='barraPesquisa'>
                    <div className='containerImagemLupa'>

                        <Image
                            src={imagemLupa}
                            alt='Icone lupa'
                            layout='fill'
                        />
                    </div>


                    <input
                        type='text'
                        placeholder='Pesquisar'
                        value={''}
                        onChange={aoPesquisar}
                    />
                </div>

                <Navegacao className='desktop' />
            </div>

            {resultadoPesquisa.length > 0 && (
                <div className='resultadoPesquisaContainer'>
                    {resultadoPesquisa.map(r => (
                        <ResultadoPesquisa
                                avatar={r.avatar}
                                nome={r.nome}
                                email={r.email}
                                key={r._id}
                                id={r._id}
                                onClick={aoClicarResultadoPesquisa}
                        />
                        ))}
                </div>
            )}
        </header>
    );
}