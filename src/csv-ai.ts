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
    const loader = new CSVLoader("src/documents/prueba1.csv")

    // Carga los documentos del archivo CSV
    const docs = await loader.load()

    // Configura el separador de texto para dividir los documentos en fragmentos más pequeños
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200
    })

    // Divide los documentos en fragmentos más pequeños
    const splittedDocs = await splitter.splitDocuments(docs)

    // Configura los vectores de incrustación utilizando el servicio de OpenAI
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY
    })

    // Crea un almacén de vectores utilizando el algoritmo HNSWLib y los documentos divididos
    const vectorStore = await HNSWLib.fromDocuments(splittedDocs, embeddings)

    // Configura el modelo de lenguaje de OpenAI
    const model = new OpenAI({
        modelName: "gpt-3.5-turbo"
    })

    // Convierte el almacén de vectores en un recuperador de vectores
    const vectorStoreRetriever = vectorStore.asRetriever()

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
