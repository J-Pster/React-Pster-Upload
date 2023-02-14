import React, { useState } from "react";
import Cropper from "./components/Cropper";

import "./Upload.scss";

// Definindo a interface das props

import { UploadProps } from "./Upload.types";
import { axiosPost, responseNormalizer } from "./Axios";

/**
 * Esse é um componente funcional que pode ser usado para fazer upload de arquivos de quase qualquer tipo, e suporta edição em arquivos de imagem.
 *
 * @param type - Escolha entre "image" ou "file", isso vai renderizar dois botões de diferentes.
 * @param iconSrc - O SRC do Icone que vai ser usado no botão.
 * @param callback - Essa função deve receber um File (file) e ela quem vai fazer o upload do arquivo.
 * @returns {JSX.Element} Retorna um componente react.
 */
const Upload = ({ type, iconSrc, callback, config }: UploadProps) => {
  // Refs

  const hiddenFileInput: any = React.useRef(null);
  const spanRef: any = React.useRef(null);

  // Global

  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [openImageCropper, setOpenImageCropper] = useState(false);

  const uploadImage = (event: any) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("[Upload] Arquivo não selecionado!");
      return;
    }

    setFile(file);

    if (type == "image") {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setSrc(reader.result as string);
        setOpenImageCropper(true);
      });

      reader.readAsDataURL(file);

      return;
    }

    spanRef.current.innerHTML =
      file.name.length > 10
        ? `${file.name.slice(0, 10)}(...) .${file.name.split(".").pop()}`
        : file.name;

    axiosPost(file, "/api/fileupload")
      .then((response) => {
        console.log("[Upload] Arquivo enviado com sucesso!", response);
        callback(responseNormalizer(response, null, file));
      })
      .catch((error) => {
        callback(responseNormalizer(null, error, file));

        console.error(
          "[Upload] Erro ao enviar arquivo para o servidor!",
          error
        );
        setFile(null);
        spanRef.current.innerHTML = "Tente novamente!";
        spanRef.current.style.color = "red";

        setTimeout(() => {
          spanRef.current.innerHTML = "Carregar Arquivo";
          spanRef.current.style.color = "black";
        }, 3000);
      });
  };

  // Tipo Imagem

  const onSaveCropped = (file: File) => {
    setFile(file);
    setOpenImageCropper(false);

    console.log("[Upload] Enviando arquivo para o servidor...", file);

    axiosPost(file, "/api/fileupload")
      .then((response) => {
        console.log("[Upload] Arquivo enviado com sucesso!", response);
        callback(responseNormalizer(response, null, file));
      })
      .catch((error) => {
        callback(responseNormalizer(null, error, file));

        console.error(
          "[Upload] Erro ao enviar arquivo para o servidor!",
          error
        );
        setFile(null);
      });
  };

  if (type == "image") {
    return (
      <div className="buttonImage flex">
        <input
          type="file"
          accept=".svg, .png, .jpeg, .jpg"
          style={{ display: "none" }}
          onChange={uploadImage}
          id="contained-button-file"
        />
        <label className="flex" htmlFor="contained-button-file">
          <img src={iconSrc} />
        </label>

        {openImageCropper && src && (
          <Cropper
            src={src}
            name={(file && file.name.split(".")[0]) || "image"}
            onSave={onSaveCropped}
            config={config}
          />
        )}
      </div>
    );
  }

  // Tipo File

  const handleClick = (_event: any) => {
    hiddenFileInput.current.click();
    spanRef.current.innerHTML = "Carregando...";
  };

  return (
    <div className="flex buttonFile" onClick={handleClick}>
      <input
        accept=".doc, .docx, .pdf, .ppt, .pptx, .xls, .xlsx, .txt, .svg, .png, .jpeg, .jpg"
        type="file"
        ref={hiddenFileInput}
        onChange={uploadImage}
        style={{ display: "none" }}
      />
      <span ref={spanRef}>Enviar Arquivo</span>
    </div>
  );
};

// Definindo os valores padrões para as props
Upload.defaultProps = {
  type: "file",
  iconSrc: "https://img.icons8.com/ios/256/camera--v3.png",
  strategy: (file: File) => {
    console.error("[Upload] Strategy não foi definido!", file);
  },
  config: {
    maxZoom: 10,
    aspectRatio: 4 / 3,
  },
};

export default Upload;
