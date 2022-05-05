const textClass = {
    // inner: ""
    input: "px-4 py-2 rounded border-solid border border-sky-500"
}

const buttonClass = {
    input: "py-2 px-4 my-4 rounded-md border border-green-600 bg-emerald-900 hover:bg-emerald-500 hover:text-white"
}

export default {
    global: {
        help: "text-xs text-gray-400"
    },
    text: textClass,
    password: textClass,
    button: buttonClass,
    submit: buttonClass
}