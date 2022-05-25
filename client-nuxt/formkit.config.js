import { generateClasses } from "@formkit/themes";
import theme from "./theme";

export default {
    config: {
        classes: generateClasses(theme)
    }
}