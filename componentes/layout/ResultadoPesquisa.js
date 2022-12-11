import Avatar from '../avatar/index';


export default function ResultadoPesquisa({ nome, email, avatar, onClick, id }) {
    return (
        <div className="resultadoPesquisa" onClick={() => onClick(id)}>
            <Avatar src={avatar}/>
            <div className='informacoes usuario'>
                <strong>{nome}</strong>
                <span>{email}</span>
            </div>
        </div>
    );
}