// app.ts
import {setupCSVLangChain, askQuestion} from "./csv-ai.js"
import { setupPDFLangChain } from './pdf-ai.js'

// Función principal para configurar LangChain y hacer la pregunta
async function csvChat() {
    const {chain, vectorStore} = await setupCSVLangChain()
    const question = "Cual es el nombre de los productos? "
    await askQuestion(chain, question)
}
// Ejecuta la función principal
csvChat()















// async function pdfChat() {

//     const {chain, vectorStore} = await setupPDFLangChain()
//     const question = "De que trata el libro?"
//     await askQuestion(chain, question)
    
// }

// pdfChat()