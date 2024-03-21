# langchain-setup

Este repositorio contiene una aplicación para configurar una cadena de procesamiento de lenguaje natural (NLP) utilizando la biblioteca LangChain.

## Descripción

La aplicación carga un archivo CSV, divide los documentos en fragmentos más pequeños, configura vectores de incrustación utilizando OpenAI, crea un almacén de vectores utilizando el algoritmo HNSWLib y configura un modelo de lenguaje de OpenAI. Finalmente, crea una cadena de procesamiento de preguntas y respuestas utilizando el modelo de lenguaje y el almacén de vectores configurados.

## Uso

La función `setupCSVLangChain()` configura la cadena de procesamiento de lenguaje natural y devuelve la cadena junto con el almacén de vectores configurados. Puedes utilizar la función `askQuestion(chain, question)` para realizar preguntas a la cadena de procesamiento de preguntas y respuestas.

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios al repositorio (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).
