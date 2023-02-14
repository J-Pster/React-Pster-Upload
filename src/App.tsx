import "./App.css";
import Upload from "./components/Upload/Upload";

function App() {
  const enviarArquivo = (response: any) => {
    console.log("Resposta do Upload", response);
  };

  return (
    <div className="App">
      <h2>Upload de Imagem</h2>
      <Upload type="image" callback={enviarArquivo} />

      <h2>Upload de Arquivos</h2>
      <Upload type="file" callback={enviarArquivo} />
    </div>
  );
}

export default App;
