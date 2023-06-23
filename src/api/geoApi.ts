import axios from "axios"

const BASE_URL = 'http://127.0.0.1:8000/api'

export async function getCountryList() {
    const url = `${BASE_URL}/countries/`
    return axios.get<{title: string}[]>(url)
}

export async function getCityList(countryName: string) {
    const url = `${BASE_URL}/country/${countryName}/cities/`
    return axios.get<{title: string}[]>(url)
}