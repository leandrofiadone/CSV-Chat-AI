// langchain-setup.ts
import {CSVLoader} from "langchain/document_loaders/fs/csv"
import {HNSWLib} from "langchain/vectorstores/hnswlib"
import {OpenAIEmbeddings} from "langchain/embeddings/openai"
import {RetrievalQAChain} from "langchain/chains"
import {OpenAI} from "langchain/llms/openai"
import * as dotenv from "dotenv"
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"

dotenv.config()

// Configura y prepara la cadena de procesamiento de lenguaje natural (NLP) para trabajar con un archivo CSV
export async function setupCSVLangChain() {
  // Carga el archivo CSV desde el directorio src/documents/prueba1.csv
  // Carga los documentos del archivo CSV
    const loader = new CSVLoader("src/documents/TiendaPrueba.csv")
    const docsCSV = await loader.load()

    // Configura el separador de texto para dividir los documentos en fragmentos más pequeños
    // Divide los documentos en fragmentos más pequeños
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200
    })
    
    const splittedDocs = await splitter.splitDocuments(docsCSV)

    // Configura los vectores de incrustación utilizando el servicio de OpenAI
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY
    })

    // Crea un almacén de vectores utilizando el algoritmo HNSWLib y los documentos divididos
    const vectorStore = await HNSWLib.fromDocuments(splittedDocs, embeddings)
    //Hierarchical Navigable Small World, Mundo Pequeño Navegable Jerárquico
    // un algoritmo que crea una estructura jerárquica
    //que permite la navegación eficiente en un espacio de datos, manteniendo conexiones cortas entre los elementos.
    // Configura el modelo de lenguaje de OpenAI

    // Convierte el almacén de vectores en un recuperador de vectores.. herramienta de busqueda dentro del vectorstore creo
    //  Este objeto nos permite buscar vectores en el almacén que creamos anteriormente. Es como tener una llave que nos permite abrir una caja y sacar lo que necesitamos.
    const vectorStoreRetriever = vectorStore.asRetriever()



    const model = new OpenAI({
        modelName: "gpt-3.5-turbo"
    })


    // Crea una cadena de procesamiento de preguntas y respuestas utilizando el modelo de lenguaje y el recuperador de vectores
    const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever)

    // Devuelve la cadena de procesamiento de preguntas y respuestas y el almacén de vectores configurados
    return {chain, vectorStore}
}

    // Realiza una pregunta a la cadena de procesamiento de preguntas y respuestas y muestra la pregunta y la respuesta
    export async function askQuestion(chain: any, question: string) {
    // Realiza la consulta y obtiene la respuesta
    const answer = await chain.call({query: question})

    // Muestra la pregunta y la respuesta
    console.log({
        question,
        answer
    })
}
