

export default async (searchData: string) => {

    const { data, error } = await useFetch<Array<Record<string, any>>>("http://localhost:3000/article/search", {
        method: "POST",
        body: {
            searchData: searchData,
        },
        credentials: "include"
    })

    return data
}