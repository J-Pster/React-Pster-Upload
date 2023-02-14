# React Pster Upload

Esse componente foi feito em [ReactJS](https://reactjs.org/) ^18.0.0, e tem como dependência o [react-easy-crop](https://www.npmjs.com/package/react-easy-crop).

## Como utilizar o componente `Upload`?

Basta importar o componente `Upload` e passar as propriedades necessárias para ele.

### Propriedades

| Propriedade | Tipo                      | Descrição                                                                                                                                       | Obrigatório |
| ----------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| type        | `image` ou `file`         | Define o tipo de upload que será feito.                                                                                                         | Sim         |
| iconSrc     | `string`                  | Define o ícone que será exibido no botão de upload.                                                                                             | Sim         |
| callback    | `(response: any) => void` | É a função que será executada pelo Upload assim que ele enviar para a API o arquivo, o retorno tem o seguinte formato: {file, error, response}; | Sim         |
| config      | `Config`                  | Define as configurações do componente.                                                                                                          | Sim         |

### Formato de retorno

| Propriedade | Tipo   | Descrição                                |
| ----------- | ------ | ---------------------------------------- |
| file        | `File` | É o arquivo que foi enviado para a API.  |
| error       | `any`  | É o erro que foi retornado pela API.     |
| response    | `any`  | É a resposta que foi retornada pela API. |

**Quando Error tiver valor o Response será null, e vice-versa, file é sempre retornado!**

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
  const enviarArquivo = (response: any) => {
    console.log("Resposta do Upload", response);
  };

  return (
    <div className="App">
      <Upload
        type="image"
        iconSrc="https://i.imgur.com/FAh0OcY.png"
        callback={enviarArquivo}
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
