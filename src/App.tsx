import "./App.css";
import Upload from "./components/Upload/Upload";

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
      <h2>Upload de Imagem</h2>
      <Upload type="image" strategy={enviarArquivo} />

      <h2>Upload de Arquivos</h2>
      <Upload type="file" strategy={enviarArquivo} />
    </div>
  );
}

export default App;
