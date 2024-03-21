#  Descripción 🇪🇸
### Este repositorio contiene una aplicación para configurar un pipeline de procesamiento de lenguaje natural (NLP) utilizando la biblioteca LangChain.

## Uso
La aplicación carga un archivo CSV, divide los documentos en fragmentos más pequeños, configura vectores de incrustación utilizando OpenAI, crea un almacén de vectores utilizando el algoritmo HNSWLib, configura un modelo de lenguaje de OpenAI y finalmente establece una cadena de procesamiento de preguntas y respuestas.

La función `setupCSVLangChain()` configura la cadena de procesamiento de lenguaje natural y devuelve la cadena configurada junto con el almacén de vectores. Puedes utilizar la función `askQuestion(chain, question)` para hacer preguntas a la cadena de procesamiento de preguntas y respuestas.

### Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).

---

# Description 🇬🇧
### This repository contains an application to set up a natural language processing (NLP) pipeline using the LangChain library.

## Usage
The application loads a CSV file, divides the documents into smaller fragments, sets up embedding vectors using OpenAI, creates a vector store using the HNSWLib algorithm, configures an OpenAI language model, and finally sets up a question-answering processing chain.
The `setupCSVLangChain()` function configures the natural language processing chain and returns the configured chain along with the vector store. You can use the `askQuestion(chain, question)` function to ask questions to the question-answering processing chain.

### License 
This project is licensed under the [MIT License](LICENSE).
