import type { MarketResponse } from '../types/market'

//local backend address used during development.
const API_URL = 'http://localhost:3001/api/market'

//request the latest market prices from our backend.
export async function fetchMarketData(): Promise<MarketResponse> {
  //send HTTP request to the backend API
  const response = await fetch(API_URL)

  //stop if the server returns an unsuccessful HTTP status
  if (!response.ok) {
    throw new Error(`Failed to fetch market data: ${response.status}`)
  }

  //convert the JSON response into data and return it as a Promise of MarketResponse
  return response.json() as Promise<MarketResponse>
}
