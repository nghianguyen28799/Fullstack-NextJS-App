export const revokeApiKey = async () => {
    const res = await fetch('/api/api-key/revoke', {
        method: "POSt",
        headers: {
            'Content-Type': 'application/json',

        }
    })

    const data = (await res.json()) as { error?: string }
    if (data.error) {
        throw new Error(data.error)
    }
}