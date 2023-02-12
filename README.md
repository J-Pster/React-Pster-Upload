# React Pster Upload

Esse componente foi feito em [ReactJS](https://reactjs.org/) ^18.0.0, e tem como dependência o [react-easy-crop](https://www.npmjs.com/package/react-easy-crop).

## Como utilizar o componente `Upload`?

Basta importar o componente `Upload` e passar as propriedades necessárias para ele.

### Propriedades

| Propriedade | Tipo                           | Descrição                                                                                                                                                                 | Obrigatório |
| ----------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| type        | `image` ou `file`              | Define o tipo de upload que será feito.                                                                                                                                   | Sim         |
| iconSrc     | `string`                       | Define o ícone que será exibido no botão de upload.                                                                                                                       | Sim         |
| strategy    | `(file: File) => Promise<any>` | Define a estratégia de upload que será utilizada, precisa ser um função que retorna uma Promisse, pois, caso dê erro, o Upload vai dar um feedback visual para o usuário. | Sim         |
| config      | `Config`                       | Define as configurações do componente.                                                                                                                                    | Sim         |

### Config

| Propriedade | Tipo     | Descrição                                                                                                | Obrigatório |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------- | ----------- |
| maxZoom     | `number` | Define o zoom máximo que será permitido.                                                                 | Não         |
| aspectRatio | `number` | Define a proporção da imagem que será editada, precisa ser enviado no formato de uma divisão, 4/3, 16/9. | Não         |

Exemplo de utilização:

```tsx
import React from "react";

import Upload from "./components/Upload";

function App() {
  const enviarArquivo = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const random = Math.random();

      if (random < 0.5) {
        resolve("Arquivo enviado com sucesso!");
        console.log("[App] Arquivo enviado com sucesso!", file);
      } else {
        reject("Houve um erro ao enviar o arquivo!");
      }
    });
  };

  return (
    <div className="App">
      <Upload
        type="image"
        iconSrc="https://i.imgur.com/FAh0OcY.png"
        strategy={enviarArquivo}
        config={{
          maxZoom: 10,
          aspectRatio: 4 / 3,
        }}
      />
    </div>
  );
}
```

## Visualização do editor de imagem

![Preview](https://i.imgur.com/FAh0OcY.png)

## Visualização dos botões de upload

![Preview](https://i.imgur.com/l1ZgLmB.png)
