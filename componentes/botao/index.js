export default function Botao({
    type = 'button',
    texto,
    cor = 'primaria',
    desabilitado = false,
    onClick
}) {
    return (
        <button
            type={type}
            className={`btn ${cor}`}
            disabled={desabilitado}
            onClick={onClick}
        >
            {texto}
        </button>
    );
}