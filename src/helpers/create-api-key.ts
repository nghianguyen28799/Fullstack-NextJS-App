import { CreateApiData } from "@/types/api"

export async function createApiKey() {
    const res = await fetch('/api/api-key/create')
    const data = (await res.json()) as CreateApiData
}