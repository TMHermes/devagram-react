import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Botao from "../../componentes/botao";
import UploadImagem from "../../componentes/uploadImagem";
import {validarEmail, validarSenha, validarNome, validarConfirmacaoSenha} from '../../utils/validadores';
import UsuarioService from "../../services/UsuarioService";

import imagemLogo from "../../public/images/logo.svg";
import imagemusuarioAtivo from "../../public/images/usuarioAtivo.svg";
import imagemEnvelope from "../../public/images/envelope.svg";
import imagemChave from "../../public/images/chave.svg";
import imagemAvatar from "../../public/images/avatar.svg";
import InputPublico from "../../componentes/inputPublico";

const usuarioService = new UsuarioService();

export default function Cadastro() {
    const [imagem, setImagem] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaosenha, setConfirmacaoSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);

    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validarSenha(senha)
            && validarConfirmacaoSenha(senha, confirmacaosenha)
            && validarEmail(email)
        )
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if(!validarFormulario()) {
            return;
        }

        setEstaSubmetendo(true);

        try {
            const corpoRequisicaoCadastro = new FormData();
            corpoRequisicaoCadastro.append("nome", nome);
            corpoRequisicaoCadastro.append("email", email);
            corpoRequisicaoCadastro.append("senha", senha);

            if (imagem?.arquivo) {
                corpoRequisicaoCadastro.append("file", imagem.arquivo);
            }

            await usuarioService.cadastro(corpoRequisicaoCadastro);
            alert("Sucesso!");
        }catch (error) {
            alert(
                "Erro ao cadastrar usuario. " + error?.reponse?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }

    return (
        <section className={`paginaCadastro paginaPublica`}>
            <div className="logoContainer desktop">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={imagem?.preview || imagemAvatar.src}
                        setImagem={setImagem}

                    /> 

                    <InputPublico
                        imagem={imagemusuarioAtivo}
                        texto="Nome Completo"
                        tipo="text"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao="Precisa ter pelo menos 2 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />

                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="E-mail informado é inválido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                        mensagemValidacao="Precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Confirmar Senha"
                        tipo="password"
                        aoAlterarValor={e => setConfirmacaoSenha(e.target.value)}
                        valor={confirmacaosenha}
                        mensagemValidacao="O nome precisa de no mínimo 2 caracteres"
                        exibirMensagemValidacao={confirmacaosenha && !validarConfirmacaoSenha(senha, confirmacaosenha)}
                    />

                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <Link href="/">Faça seu login agora!</Link>
                </div>
            </div>
        </section>
    );
}