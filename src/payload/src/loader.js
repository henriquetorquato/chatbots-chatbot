loader = () => {
    // Inject a raw js from the GitHub repo
    // this is temporary
    fileUrl = "https://rawgit.com/henriquetorquato/chatbots-chatbot/master/src/payload/pack/payload.pack.js"
    script = document.createElement("script")
    script.src = fileUrl
    document.head.appendChild(script)
}