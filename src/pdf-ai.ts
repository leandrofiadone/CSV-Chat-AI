// langchain-setup.ts
import {PDFLoader} from "langchain/document_loaders/fs/pdf"
import {HNSWLib} from "langchain/vectorstores/hnswlib"
import {OpenAIEmbeddings} from "langchain/embeddings/openai"
import {RetrievalQAChain} from "langchain/chains"
import {OpenAI} from "langchain/llms/openai"
import * as dotenv from "dotenv"
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"

dotenv.config()

export async function setupPDFLangChain() {

    const loader = new PDFLoader(
        "src/documents/MasculinidadSagrada.pdf",
        {
            splitPages: false
        }
    )
    
    const docs = await loader.load()

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200
    })
    const splittedDocs = await splitter.splitDocuments(docs)

    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY
    })

    const vectorStore = await HNSWLib.fromDocuments(splittedDocs, embeddings)

    const model = new OpenAI({
        modelName: "gpt-3.5-turbo"
    })

    const vectorStoreRetriever = vectorStore.asRetriever()
    const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever)

  return {chain, vectorStore}
}


export async function askQuestionPDF(chain: any, question: string) {
  // Realiza la consulta y obtiene la respuesta
    const answer = await chain.call({query: question})

    // Muestra la pregunta y la respuesta
    console.log({
        question,
        answer
    })
}