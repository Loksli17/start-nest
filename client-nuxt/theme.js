//! https://formkit.com/guides/create-a-tailwind-theme

const textClass = {
    // inner: ""
    input: "px-4 py-2 rounded border border-green-600",
}

const buttonClass = {
    input: "py-2 px-4 my-4 rounded-md border border-green-600 bg-emerald-900 hover:bg-emerald-500 hover:text-white"
}

export default {
    global: {
        help: "text-sm text-gray-100",
    },
    text: textClass,
    password: textClass,
    button: buttonClass,
    submit: buttonClass
}